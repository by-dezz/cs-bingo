import React from "react";

import {CircularProgress, Stack} from "@mui/material";

import {getRoom} from "../../services/room";
import {serviceInterface} from "../../services/core";

import {Weapons} from "../../weapons";
import UserContext from "../../context/UserContext";
import withNavigate from "../../decorators/withNavigate";

import CenterBox from "../../components/CenterBox";
import Header from "./Header";
import WeaponsGrid from "./WeaponsGrid";


class Room extends React.Component {
    state = {data: null}
    ws = null
    pingInterval = null

    componentDidMount() {
        getRoom(this.props.locationParams.id).then(serviceInterface({
            success: data => {
                this.initWebSocket()
                this.setState({data: this.processData(data)})
            }
        }))
    }

    initWebSocket() {
        this.ws = new WebSocket(`ws://${document.location.host}/api/room/ws/${this.props.locationParams.id}/`)
        this.ws.onmessage = event => {
            let data = JSON.parse(event.data)
            if (data.type === 'check') return this.handleCheck(data.data)
            if (data.type === 'join') return this.handleJoin(data.data)
        }

        this.pingInterval = setInterval(() => {
            this.ws.send(JSON.stringify({type: 'ping'}))
        }, 10000)
    }

    handleCheck = (data) => {
        let weaponData = this.state.data.weapons.find(item => item.name === data.weapon)

        if (data.status) weaponData.checked.add(data.user)
        else weaponData.checked.delete(data.user)

        this.state.data.stats[data.user] += 1 * (data.status ? 1 : -1)
        this.setState({data: this.state.data})
    }

    handleJoin = (data) => {
        this.state.data.users.push(data)
        this.state.data.usersObject[data.id] = data
        this.state.data.stats[data.id] = 0
        this.setState({data: this.state.data})
    }

    checkWeapon = (weapon) => {
        this.ws.send(JSON.stringify({
            type: 'check',
            data: weapon
        }))
    }

    processData(rawData) {
        let weapons = []
        Weapons.map(item => {
            weapons.push({
                name: item.name,
                checked: new Set(rawData.weapons[item.name]),
                image: item.image
            })
        })

        let usersObject = {}
        rawData.users.map(item => {
            usersObject[item.id] = item
        })

        const data = {
            weapons,
            users: rawData.users,
            usersObject,
            stats: rawData.stats
        }

        return data
    }

    render() {
        if (this.state.data === null) {
            return (
                <CenterBox>
                    <CircularProgress/>
                </CenterBox>
            )
        }

        return (
            <>
                <UserContext.Consumer>
                    {({user}) => (
                        <Stack spacing={2}>
                            <Header data={this.state.data} user={user}/>
                            <WeaponsGrid checkWeapon={this.checkWeapon} user={user} weapons={this.state.data.weapons}/>
                        </Stack>
                    )}
                </UserContext.Consumer>
            </>
        )
    }
}


Room = withNavigate(Room)
export default Room

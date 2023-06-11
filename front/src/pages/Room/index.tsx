import React from 'react'

import { CircularProgress, Stack } from '@mui/material'

import { getRoom } from '../../services/room'
import { serviceInterface } from '../../services/core'

import { Weapons } from '../../weapons'
import UserContext from '../../context/UserContext'
import withNavigate from '../../decorators/withNavigate'

import CenterBox from '../../components/CenterBox'
import Header from './Header'
import WeaponsGrid from './WeaponsGrid'
import withStats from '../../decorators/withStats'


class Room extends React.Component<any, any> {
    state: {data: any} = { data: null }
    ws: WebSocket | null = null
    pingInterval: any = null

    componentDidMount() {
        getRoom(this.props.locationParams.id).then(serviceInterface({
            success: (data: any) => {
                this.initWebSocket()
                this.setState({ data: this.processData(data) })
            }
        }))
    }

    componentWillUnmount() {
        if (this.ws) this.ws.close()
        if (this.pingInterval) clearInterval(this.pingInterval)
    }

    initWebSocket() {
        const protocol = document.location.protocol === 'https:' ? 'wss:' : 'ws:'
        this.ws = new WebSocket(`${protocol}//${document.location.host}/api/room/ws/${this.props.locationParams.id}/`)
        this.ws.onmessage = event => {
            const data = JSON.parse(event.data)
            if (data.type === 'check') return this.handleCheck(data.data)
            if (data.type === 'join') return this.handleJoin(data.data)
            if (data.type === 'close') {
                this.props.updateStats()
                this.props.navigate('/rooms')
                return
            }
        }

        this.pingInterval = setInterval(() => {
            this.ws?.send(JSON.stringify({ type: 'ping' }))
        }, 5000)
    }

    handleCheck = (data: any) => {
        const weaponData = this.state.data.weapons.find((item: any) => item.name === data.weapon)

        if (data.status) weaponData.checked.add(data.user)
        else weaponData.checked.delete(data.user)

        this.state.data.stats[data.user] += 1 * (data.status ? 1 : -1)
        this.setState({ data: this.state.data })
    }

    handleJoin = (data: any) => {
        this.state.data.users.push(data)
        this.state.data.usersObject[data.id] = data
        this.state.data.stats[data.id] = 0
        this.setState({ data: this.state.data })
    }

    checkWeapon = (weapon: any) => {
        this.ws?.send(JSON.stringify({
            type: 'check',
            data: weapon
        }))
    }

    processData(rawData: any) {
        const weapons: any[] = []
        Weapons.map(item => {
            weapons.push({
                name: item.name,
                checked: new Set(rawData.weapons[item.name]),
                image: item.image
            })
        })

        const usersObject: any = {}
        rawData.users.map((item: any) => {
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
        console.log(this.props)
        if (this.state.data === null) {
            return (
                <CenterBox>
                    <CircularProgress />
                </CenterBox>
            )
        }

        return (
            <>
                <UserContext.Consumer>
                    {({ user }: any) => (
                        <Stack spacing={2}>
                            <Header data={this.state.data} user={user} />
                            <WeaponsGrid checkWeapon={this.checkWeapon} user={user} weapons={this.state.data.weapons} />
                        </Stack>
                    )}
                </UserContext.Consumer>
            </>
        )
    }
}


export default withNavigate(withStats(Room))

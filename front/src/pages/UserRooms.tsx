import React from 'react'

import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CircularProgress, Divider,
    List,
    ListItem,
    ListItemButton,
    Typography
} from '@mui/material'

import { create, list } from '../services/room'
import { serviceInterface } from '../services/core'
import withNavigate from '../decorators/withNavigate'

import CenterBox from '../components/CenterBox'


class UserRooms extends React.Component<any, any> {
    state: any = { rooms: null }

    componentDidMount() {
        list().then(serviceInterface({
            success: (data: any) => this.setState({ rooms: data.rooms })
        }))
    }

    createRoom = () => {
        create().then(serviceInterface({
            success: (data: any) => this.props.navigate(`/room/${data.room}`)
        }))
    }

    renderContent() {
        if (this.state.rooms === null) return (
            <CardContent>
                <CenterBox>
                    <CircularProgress />
                </CenterBox>
            </CardContent>
        )

        if (this.state.rooms.length === 0) return (
            <CardContent>
                <Typography sx={{ textAlign: 'center' }}>You don't have any rooms yet</Typography>
            </CardContent>
        )

        return (
            <List>
                {this.state.rooms.map((room: any, index: number) => <Room key={index} uuid={room} />)}
            </List>
        )
    }

    render() {
        return (
            <CenterBox sx={{ flexDirection: 'column' }}>
                <Card sx={{ minWidth: '50%', display: 'flex', justifyContent: 'center' }}>
                    <CardActions>
                        <Button onClick={this.createRoom}>Create new room</Button>
                    </CardActions>
                </Card>
                <Card sx={{ minWidth: '50%' }}>
                    {this.renderContent()}
                </Card>
            </CenterBox>
        )
    }
}


export default withNavigate(UserRooms)


class RoomClass extends React.Component<any, any> {
    render() {
        return (
            <ListItem>
                <ListItemButton onClick={() => this.props.navigate(`/room/${this.props.uuid}`)} sx={{ justifyContent: 'center' }}>
                    {this.props.uuid}
                </ListItemButton>
                <Divider />
            </ListItem>
        )
    }
}


const Room = withNavigate(RoomClass)

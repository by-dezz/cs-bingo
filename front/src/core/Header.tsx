import React from 'react'

import {
    AppBar,
    Avatar,
    Box,
    Button,
    IconButton,
    Menu,
    Stack,
    MenuItem,
    Toolbar,
    Typography
} from '@mui/material'
import StarIcon from '@mui/icons-material/Star'

import { logout } from '../services/user'
import { serviceInterface } from '../services/core'

import UserContext from '../context/UserContext'
import withNavigate from '../decorators/withNavigate'
import withStats from '../decorators/withStats'


class Header extends React.Component<any, any> {
    render() {
        return (
            <Box sx={{ flexGrow: 1, paddingBottom: '20px' }}>
                <AppBar position='static'>
                    <Toolbar sx={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}
                    >
                        <Box>
                            <Typography
                                variant='h6'
                                component='div'
                                sx={{ flexGrow: 1, cursor: 'pointer' }}
                                onClick={() => this.props.navigate('/')}
                            >
                                CS Bingo
                            </Typography>
                        </Box>

                        <Box>
                            <UserContext.Consumer>
                                {({ user, setUser }: any) => (
                                    user
                                        ? <UserIcon user={user} setUser={setUser} />
                                        : <Button
                                            onClick={
                                                () => this.props.navigate('/login?redirect=' + document.location.pathname)
                                            }
                                            color='inherit'
                                          >
                                            Login
                                        </Button>
                                )}
                            </UserContext.Consumer>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>
        )
    }
}

export default withNavigate(Header)


class UserIconClass extends React.Component<any, any> {
    state = {
        anchor: null
    }

    logout = () => {
        this.setState({ anchor: null })
        logout().then(serviceInterface({
            success: () => this.props.setUser(undefined)
        }))
    }

    render() {
        return (
            <Stack direction={'row'} spacing={3} sx={{ alignItems: 'center' }}>
                {this.props.stats &&
                    <Stack spacing={0.5} direction={'row'}>
                        <Typography>
                            {this.props.stats}
                        </Typography>
                        <StarIcon />
                    </Stack>
                }

                <IconButton
                    onClick={event => this.setState({ anchor: event.target })}
                >
                    <Avatar>{this.props.user.name.slice(0, 2)}</Avatar>
                </IconButton>
                <Menu
                    sx={{ mt: '45px' }}
                    id='menu-appbar'
                    anchorEl={this.state.anchor}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    keepMounted
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    open={Boolean(this.state.anchor)}
                    onClose={() => this.setState({ anchor: null })}
                >
                    <MenuItem onClick={this.logout}>
                        <Typography textAlign='center'>Logout</Typography>
                    </MenuItem>
                </Menu>
            </Stack>
        )
    }
}


const UserIcon = withStats(UserIconClass)

import React from 'react'

import { RouterProvider } from 'react-router-dom'
import router from './core/router'

import {
    Box,
    Container,
    createTheme,
    CssBaseline,
    ThemeProvider
} from '@mui/material'

import UserContext from './context/UserContext'
import StatsContext from './context/StatsContext'
import { serviceInterface } from './services/core'
import { getLogin } from './services/user'

import Login from './pages/Login'
import LoadPage from './components/LoadPage'
import Register from './pages/Register'
import FullPage from './components/FullPage'
import { getStats } from './services/stats'


const darkTheme = createTheme({
    palette: {
        mode: 'dark'
    }
})


export default class App extends React.Component {
    state: any = {
        user: undefined,
        stats: undefined,
        loading: true
    }

    componentDidMount() {
        getLogin().then(serviceInterface({
            success: (user: any) => {
                this.setState({ user, loading: false })
                this.updateStats()
            },
            error: () => this.setState({ loading: false })
        }))
    }

    updateStats = () => {
        getStats().then(serviceInterface({
            success: (data: any) => this.setState({ stats: data.stats })
        }))
    }

    renderContent() {
        if (this.state.loading) return <LoadPage />

        if (this.state.user === undefined) {
            const formData = {
                changeForm: (form: any) => this.setState({ form }),
                setUser: (user: any) => this.setState({ user })
            }

            if (this.state.form === 'register') return <FormBox><Register {...formData} /></FormBox>
            else return <FormBox><Login {...formData} /></FormBox>
        }

        return (
            <Container sx={{
                width: '100%',
                height: '100%'
            }}
            >
                <RouterProvider router={router} />
            </Container>
        )
    }

    render() {
        return (
            <UserContext.Provider value={{ user: this.state.user, setUser: (user: any) => this.setState({ user }) }}>
                <StatsContext.Provider value={{ stats: this.state.stats, updateStats: this.updateStats }}>
                    <ThemeProvider theme={darkTheme}>
                        <CssBaseline />

                        {this.state.loading
                            ? <FullPage><LoadPage /></FullPage>
                            : <RouterProvider router={router} />
                        }
                    </ThemeProvider>
                </StatsContext.Provider>
            </UserContext.Provider>
        )
    }
}


class FormBox extends React.Component<any, any> {
    render() {
        return (
            <Box sx={{ position: '' }}>

                <Box
                    sx={{
                        top: '50%',
                        height: '100%',
                        width: '100%',
                        position: 'absolute'
                    }}
                >
                    {this.props.children}
                </Box>
            </Box>
        )
    }
}

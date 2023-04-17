import React from 'react';

import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader, Container,
    LinearProgress,
    Stack,
    TextField,
    Typography
} from "@mui/material";

import {serviceInterface} from "../services/core";
import {login} from "../services/user";

import CenterBox from "../components/CenterBox";
import FullPage from "../components/FullPage";
import withUser from "../decorators/withUser";
import withNavigate from "../decorators/withNavigate";
import {Navigate} from "react-router-dom";


class Login extends React.Component {
    state = {
        username: '',
        password: '',
        loading: false,
        error: null,
        redirect: '/'
    }

    componentDidMount() {
        this.setState({redirect: new URLSearchParams(document.location.search).get('redirect')})
    }

    login = () => {
        this.setState({loading: true})
        login(this.state.username, this.state.password).then(serviceInterface({
            success: user => {
                this.props.setUser(user)
            },
            error: () => {
                this.setState({error: 'Invalid username or password'})
                this.setState({loading: false})
            }
        }))
    }

    render() {
        if (this.props.user) return <Navigate to={this.state.redirect}/>

        return (
            <FullPage>
                <Container sx={{height: '100%'}} maxWidth={"xs"}>
                    <CenterBox sx={{flexDirection: 'column'}}>
                        <Card sx={{width: "100%"}}>
                            <CardHeader title={'Login'}/>
                            <CardContent>
                                <Stack spacing={2}>
                                    <TextField
                                        variant={"standard"}
                                        label={'Username'}
                                        value={this.state.username}
                                        disabled={this.state.loading}
                                        onChange={event => this.setState({username: event.target.value})}
                                    />
                                    <TextField
                                        variant={"standard"}
                                        label={'Password'}
                                        value={this.state.password}
                                        disabled={this.state.loading}
                                        onChange={event => this.setState({password: event.target.value})}
                                    />

                                    {this.state.error && <Typography color={'error'}>{this.state.error}</Typography>}
                                </Stack>
                            </CardContent>

                            <CardActions sx={{display: 'flex'}}>
                                <Button
                                    onClick={this.login}
                                >Login</Button>

                            </CardActions>

                            {this.state.loading && <LinearProgress/>}
                        </Card>

                        <Card sx={{width: "100%"}}>
                            <CardActions sx={{justifyContent: 'space-between'}}>
                                <Button
                                    onClick={() => this.props.navigate(`/register?redirect=${this.state.redirect}`)}
                                >
                                    Create new account
                                </Button>

                                <Button
                                    onClick={() => {
                                        this.props.setUser(null)
                                        this.props.navigate(this.state.redirect)
                                    }}
                                    color={'warning'}
                                >
                                    Stay anonymous
                                </Button>
                            </CardActions>
                        </Card>
                    </CenterBox>
                </Container>
            </FullPage>
        );
    }
}


export default withNavigate(withUser(Login));

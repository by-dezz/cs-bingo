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

import CenterBox from "../components/CenterBox";

import {serviceInterface} from "../services/core";
import {register} from "../services/user";
import withUser from "../decorators/withUser";
import withNavigate from "../decorators/withNavigate";
import FullPage from "../components/FullPage";
import {Navigate} from "react-router-dom";


class Register extends React.Component {
    state = {
        username: '',
        password: '',
        confirm_password: '',
        loading: false,
        errors: {},
        redirect: '/',
        requireLogin: false
    }

    componentDidMount() {
        let search = new URLSearchParams(document.location.search)
        this.setState({redirect: search.get('redirect'), requireLogin: search.get('require') ?? false})
    }

    register = () => {
        this.setState({loading: true})
        register(
            this.state.username,
            this.state.password,
            this.state.confirm_password
        ).then(serviceInterface({
            success: user => {
                this.props.setUser(user)
            },
            error: errors => {
                this.setState({errors: errors})
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
                            <CardHeader title={'Register'}/>
                            <CardContent>
                                <Stack spacing={2}>
                                    <TextField
                                        variant={"standard"}
                                        label={'Username'}
                                        value={this.state.username}
                                        disabled={this.state.loading}
                                        onChange={event => this.setState({username: event.target.value})}
                                        error={Boolean(this.state.errors.username)}
                                        helperText={this.state.errors.username}
                                    />

                                    <TextField
                                        variant={"standard"}
                                        label={'Password'}
                                        value={this.state.password}
                                        disabled={this.state.loading}
                                        onChange={event => this.setState({password: event.target.value})}
                                        error={Boolean(this.state.errors.password)}
                                        helperText={this.state.errors.password}
                                    />

                                    <TextField
                                        variant={"standard"}
                                        label={'Confirm Password'}
                                        value={this.state.confirm_password}
                                        disabled={this.state.loading}
                                        onChange={event => this.setState({confirm_password: event.target.value})}
                                        error={Boolean(this.state.errors.confirm_password)}
                                        helperText={this.state.errors.confirm_password}
                                    />

                                    {this.state.errors.global &&
                                        <Typography color={'error'}>{this.state.errors.global}</Typography>}
                                </Stack>
                            </CardContent>

                            <CardActions sx={{display: 'flex', justifyContent: 'space-between'}}>
                                <Button onClick={this.register}>Register</Button>
                            </CardActions>
                            {this.state.loading && <LinearProgress/>}
                        </Card>

                        <Card sx={{width: "100%"}}>
                            <CardActions sx={{justifyContent: 'space-between'}}>
                                <Button
                                    onClick={() => this.props.navigate(`/login?redirect=${this.state.redirect}&require=${this.state.requireLogin}`)}
                                >
                                    Use existed account
                                </Button>
                                <Button
                                    onClick={() => {
                                        this.props.setUser(null)
                                        this.props.navigate(this.state.requireLogin ? '/' : this.state.redirect)
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
        )
    }
}


export default withNavigate(withUser(Register))

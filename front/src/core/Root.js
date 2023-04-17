import React from "react";
import {Outlet} from "react-router-dom";
import Header from "./Header";
import {Container} from "@mui/material";
import withNavigate from "../decorators/withNavigate";
import withUser from "../decorators/withUser";


class Root extends React.Component {
    render() {
        if (this.props.user === undefined) {
            this.props.navigate('/login?redirect=' + document.location.pathname)
            return null
        }

        return (
            <>
                <Header/>
                <Container sx={{
                    width: '100%',
                    height: '100%',
                }}>

                    <Outlet/>
                </Container>
            </>
        )
    }
}

export default withNavigate(withUser(Root))

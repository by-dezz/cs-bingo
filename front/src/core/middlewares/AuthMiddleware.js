import React from 'react';
import {Navigate, Outlet} from "react-router-dom";
import withUser from "../../decorators/withUser";


class AuthMiddleware extends React.Component {
    render() {
        if (!this.props.user) return <Navigate to={`/login?redirect=${document.location.pathname}&require=true`}/>
        return <Outlet/>
    }
}


export default withUser(AuthMiddleware)

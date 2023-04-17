import React from "react";
import UserContext from "../context/UserContext";


export default function withUser(Component) {
    return (props) => {
        return (
            <UserContext.Consumer>
                {userProps => <Component {...props} {...userProps}/>}
            </UserContext.Consumer>
        )
    }
}

import React from 'react'
import UserContext from '../context/UserContext'


export default function withUser(Component: any) {
    return (props: any) => {
        return (
            <UserContext.Consumer>
                {userProps => <Component {...props} {...userProps} />}
            </UserContext.Consumer>
        )
    }
}

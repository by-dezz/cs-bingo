import React from 'react'
import StatsContext from '../context/StatsContext'

export default function withStats(Component: any) {
    return (props: any) => {
        return (
            <StatsContext.Consumer>
                {statsProps => <Component {...props} {...statsProps} />}
            </StatsContext.Consumer>
        )
    }
}

import React from "react";
import StatsContext from "../context/StatsContext";

export default function withStats(Component) {
    return (props) => {
        return (
            <StatsContext.Consumer>
                {statsProps => <Component {...props} {...statsProps}/>}
            </StatsContext.Consumer>
        )
    }
}

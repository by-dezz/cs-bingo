import React from "react";
import {useNavigate, useParams} from "react-router-dom";

export default function withNavigate(Component) {
    return (props) => {
        const navigate = useNavigate()
        const locationParams = useParams();
        return <Component navigate={navigate} {...props} locationParams={locationParams}/>
    }
}

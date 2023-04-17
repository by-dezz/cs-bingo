import React from "react";
import {Stack} from "@mui/material";

import Progress from "./Progress";
import CloseRoom from "./CloseRoom";


export default class Header extends React.Component {
    render() {
        return (
            <Stack spacing={2} direction={'row'}>
                <Progress data={this.props.data} user={this.props.user}/>
                <CloseRoom/>
            </Stack>
        );
    }
}

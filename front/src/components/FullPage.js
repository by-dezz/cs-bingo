import React from "react";
import {Box} from "@mui/material";


export default class FullPage extends React.Component {
    render() {
        return (
            <Box
                sx={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                }}
            >
                {this.props.children}
            </Box>
        )
    }
}
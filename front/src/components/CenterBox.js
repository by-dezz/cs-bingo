import React from "react";
import {Box} from "@mui/material";


export default class CenterBox extends React.Component {
    render() {
        return (
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
                gap: '1rem',
                ...this.props.sx
            }}>
                {this.props.children}
            </Box>
        )
    }
}

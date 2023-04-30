import React from 'react';
import {Button, Stack} from "@mui/material";
import Progress from "./Progress";


export default class Header extends React.Component {
    render() {
        return (
            <Stack direction={'row'} spacing={2}>
                <Progress all={this.props.all} current={this.props.current}/>
                <Button
                    onClick={this.props.reset}
                    color={'error'}
                    variant={'contained'}
                >
                    Reset
                </Button>
            </Stack>
        )
    }
}
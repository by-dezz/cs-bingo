import React from "react";

import {Button, IconButton} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import withNavigate from "../../decorators/withNavigate";

import {close} from "../../services/room";
import {serviceInterface} from "../../services/core";


class CloseRoom extends React.Component {
    state = {confirm: false}
    render() {
        if (this.state.confirm) return (
            <>
                <Button
                    variant={'contained'}
                    color={'error'}
                    onClick={() => {
                        close(this.props.locationParams.id).then(serviceInterface({
                            success: () => this.props.navigate('/rooms')
                        }))
                    }}
                >
                    Confirm
                </Button>

                <IconButton
                    onClick={() => this.setState({confirm: false})}
                    variant={'outlined'}
                >
                    <CloseIcon/>
                </IconButton>
            </>
        )
        return (
            <Button
                color={'error'}
                variant={'contained'}
                sx={{whiteSpace: 'nowrap'}}
                onClick={() => this.setState({confirm: true})}
            >
                Close room
            </Button>
        );
    }
}


export default withNavigate(CloseRoom);

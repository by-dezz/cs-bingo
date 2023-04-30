import React from "react";

import {Button, IconButton} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import {close} from "../../services/room";
import withNavigate from "../../decorators/withNavigate";


class CloseRoom extends React.Component {
    state = {confirm: false}
    render() {
        if (this.state.confirm) return (
            <>
                <Button
                    variant={'contained'}
                    color={'error'}
                    onClick={() => close(this.props.locationParams.id)}
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

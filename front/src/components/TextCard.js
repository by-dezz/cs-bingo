import React from "react";

import {
    Card,
    CardContent,
    Typography
} from "@mui/material";

import withNavigate from "../decorators/withNavigate";


class TextCard extends React.Component {
    render() {
        return (
            <Card
                sx={{cursor: 'pointer'}}
                onClick={() => this.props.navigate(this.props.link)}
            >
                <CardContent>
                    <Typography variant={'h3'}>{this.props.title}</Typography>
                </CardContent>
            </Card>
        );
    }
}


export default withNavigate(TextCard)

import React from "react";
import {Card, CardActions, CardContent, Paper, Stack, Typography} from "@mui/material";
import ProgressBar from "../../components/ProgressBar";


export default class Progress extends React.Component {
    render() {
        return (
            <Card
                sx={{
                    width: '100%',
                    height: '100%',
                }}
            >
                <CardActions>
                    <Stack sx={{width: '100%', alignItems: 'center'}} spacing={2} direction={'row'}>
                        <Typography whiteSpace={'nowrap'}>
                            {this.props.current} / {this.props.all}
                        </Typography>

                        <ProgressBar value={this.props.current / this.props.all * 100} primary/>

                        <Typography  whiteSpace={'nowrap'}>
                            {Math.round(this.props.current / this.props.all * 100)} %
                        </Typography>
                    </Stack>
                </CardActions>
            </Card>
        )
    }
}
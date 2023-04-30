import React from 'react';

import {
    Box,
    Card,
    CardActions,
    Stack,
    Typography
} from "@mui/material";
import {Weapons} from "../../weapons";


export default class WeaponsGrid extends React.Component {
    render() {
        return (
            <Box sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '1rem',
                paddingBottom: '1rem',
            }}>
                {Weapons.map((weapon, index) =>
                    <WeaponCard
                        key={index}
                        checked={this.props.checked.has(weapon.name)}
                        handleClick={() => this.props.checkWeapon(weapon.name)}
                        {...weapon}
                    />)}
            </Box>
        )
    }
}


class WeaponCard extends React.Component {
    render() {
        return (
            <Card
                style={this.props.checked ? {filter: 'brightness(0.5) blur(1px)'} : undefined}
                onClick={this.props.handleClick}
                sx={{cursor: 'pointer', userSelect: 'none'}}
            >
                <CardActions sx={{display: 'flex', justifyContent: 'center'}}>
                    <Typography textAlign={'center'}>
                        {this.props.name}
                    </Typography>
                </CardActions>
                <CardActions>
                    <img width='130px' src={this.props.image} style={{pointerEvents: 'none'}}/>
                </CardActions>
            </Card>
        )
    }
}

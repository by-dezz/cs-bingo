import React from 'react';

import {
    Box,
    Card,
    CardActions,
    Stack,
    Typography
} from "@mui/material";


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
                {this.props.weapons.map((weapon, index) =>
                    <WeaponCard
                        key={index}
                        user={this.props.user}
                        handleClick={() => this.props.checkWeapon(weapon.name)}
                        {...weapon}
                    />)}
            </Box>
        )
    }
}


class WeaponCard extends React.Component {
    render() {
        let matesChecked = Array.from(this.props.checked).filter(userId => userId != this.props.user.id)

        return (
            <Card
                style={this.props.checked.has(this.props.user.id) ? {filter: 'brightness(0.5) blur(1px)'} : undefined}
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


                <Stack sx={{height: '3px'}}>
                    {matesChecked.map((userId, index) => <Box
                        key={index}
                        sx={{
                            height: '100%',
                            width: '100%',
                            backgroundColor: 'red',
                        }}
                    />)}
                </Stack>
            </Card>
        )
    }
}

import React from 'react'
import { Stack, Typography } from '@mui/material'

import { Weapons } from '../../../weapons'
import ProgressBar from '../../../components/ProgressBar'


export default class Summary extends React.Component<any, any> {
    render() {
        return (

            <Stack
                direction={'row'}
                spacing={2}
                sx={{ width: '100%', alignItems: 'center' }}
            >
                <Typography sx={{ whiteSpace: 'nowrap' }}>
                    {`${this.props.data.stats[this.props.user.id]} / ${Weapons.length}`}
                </Typography>

                <Stack sx={{ width: '100%' }} direction={'column'} spacing={2}>
                    <ProgressBar value={this.props.data.stats[this.props.user.id] / Weapons.length * 100} primary />

                    {this.props.data.users.length > 1 &&
                        <Stack sx={{ width: '100%' }} direction={'column'} spacing={0.5}>
                            {Object.entries(this.props.data.stats).map(([userId, value], index) => (
                                userId != this.props.user.id &&
                                <ProgressBar
                                    small
                                    key={index}
                                    value={this.props.data.stats[userId] / Weapons.length * 100}
                                    index={index}
                                />
                            ))}
                        </Stack>
                    }
                </Stack>

                <Typography sx={{ whiteSpace: 'nowrap' }}>
                    {Math.round(this.props.data.stats[this.props.user.id] / Weapons.length * 100)} %
                </Typography>
            </Stack>
        )
    }
}

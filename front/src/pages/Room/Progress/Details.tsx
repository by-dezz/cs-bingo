import React from 'react'

import {
    Divider,
    List,
    ListItem,
    Stack,
    Typography
} from '@mui/material'

import ProgressBar from '../../../components/ProgressBar'
import { Weapons } from '../../../weapons'


export default class Details extends React.Component<any, any> {
    render() {
        const usersStats = Object.entries(this.props.data.stats).sort(
            ([userId, value]) => {
                return userId !== this.props.user.id ? 1 : -1
            })

        return (
            <List>
                {usersStats.map(([userId, value]: [string, any], index: number) => (
                    <React.Fragment key={index}>
                        <ListItem>
                            <Stack spacing={1} sx={{ width: '100%' }}>
                                <Typography sx={{ whiteSpace: 'nowrap' }} variant={'h5'}>
                                    {this.props.data.usersObject[userId].name}
                                </Typography>


                                <Stack sx={{ width: '100%', alignItems: 'center' }} direction={'row'} spacing={2}>
                                    <Typography sx={{ whiteSpace: 'nowrap' }}>
                                        {`${value} / ${Weapons.length}`}
                                    </Typography>

                                    <ProgressBar value={value} index={index} />
                                    <Typography sx={{ whiteSpace: 'nowrap' }}>
                                        {Math.round(value / Weapons.length * 100)} %
                                    </Typography>
                                </Stack>
                            </Stack>
                        </ListItem>
                        {index < usersStats.length - 1 && <Divider />}
                    </React.Fragment>
                ))}
            </List>
        )
    }
}

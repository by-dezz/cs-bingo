import React from 'react'
import Cookies from 'js-cookie'
import { Stack } from '@mui/material'
import Header from './Header'
import WeaponsGrid from './WeaponsGrid'
import { Weapons } from '../../weapons'


export default class SoloRoom extends React.Component {
    state = { checked: new Set() }

    componentDidMount() {
        const cookies = Cookies.get('checked')
        let checked

        if (cookies) {
            checked = new Set(cookies.split(','))
            this.setState({ checked })
        }
    }

    checkWeapon = (weapon: any) => {
        const checked = this.state.checked

        if (checked.has(weapon)) checked.delete(weapon)
        else checked.add(weapon)

        Cookies.set('checked', Array.from(checked).join(','))
        this.setState({ checked })
    }

    reset = () => {
        Cookies.remove('checked')
        this.setState({ checked: new Set() })
    }

    render() {
        return (
            <Stack spacing={2}>
                <Header all={Weapons.length} current={this.state.checked.size} reset={this.reset} />
                <WeaponsGrid checkWeapon={this.checkWeapon} checked={this.state.checked} />
            </Stack>
        )
    }
}

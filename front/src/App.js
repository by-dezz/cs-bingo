import './App.css';
import React from 'react';
import {Weapons} from "./weapons";
import Cookies from 'js-cookie'


export default class App extends React.Component {
    state = {checked: new Set()}

    componentDidMount() {
        let cookies = Cookies.get('checked')
        let checked

        if (cookies) {
            checked = new Set(cookies.split(','))
            this.setState({checked})
        }
    }

    check = (name) => {
        let checked = this.state.checked

        if (checked.has(name)) checked.delete(name)
        else checked.add(name)

        Cookies.set('checked', Array.from(checked).join(','))
        this.setState({checked})
    }

    reset = () => {
        Cookies.remove('checked')
        this.setState({checked: new Set()})
    }

    render() {
        return (
            <div className={'app'}>
                <Header length={this.state.checked.size} reset={this.reset}/>
                <div className={'app-body'}>
                {Object.entries(Weapons).map(([name, items], index) =>
                    <Group
                        key={index}
                        name={name}
                        items={items}
                        checked={this.state.checked}
                        check={this.check}
                    />
                )}
                  </div>
            </div>
        );
    }
}


class Group extends React.Component {
    render() {
        return (
            <div style={{background: '#222127', padding: '10px'}}>
                <div style={{color: '#efeff5', textAlign: "center", paddingBottom: '10px'}}>
                    {this.props.name}
                </div>

                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '10px',
                    justifyContent: 'start'
                    // display: 'flex',
                    // flexWrap: 'wrap',
                    // gap: '2%'
                }}>
                    {this.props.items.map((weapon, index) =>
                        <WeaponCard
                        key={index}
                        checked={this.props.checked.has(weapon.name)}
                        handleClick={() => this.props.check(weapon.name)}
                        {...weapon}
                    />)}
                </div>
            </div>
        )
    }
}


class Header extends React.Component {
    render() {
        return (
            <div className={'app-header'}>
                <Progress value={this.props.length}/>
                <button
                    onClick={this.props.reset}
                    style={{color: 'white', backgroundColor: 'transparent', border: 'none', cursor: 'pointer'}}
                >
                    Reset
                </button>
            </div>
        )
    }
}


class Progress extends React.Component {
    render() {
        return (
            <div style={{display: "flex", gap: '2%', width: '100%', color: 'white', alignItems: 'center'}}>
                <div style={{minWidth: '50px', textAlign: 'center'}}>
                    {this.props.value + ' / ' + Weapons.length}
                </div>

                <div className={'progress'}>
                    <div className={'progress-bar'} style={{width: this.props.value / Weapons.length * 100 + '%'}}/>
                </div>
                <div style={{minWidth: '50px', textAlign: 'center'}}>
                    {Math.round(this.props.value / Weapons.length * 100) + ' %'}
                </div>
            </div>
        )
    }
}


class WeaponCard extends React.Component {
    render() {
        return (
            <div
                style={this.props.checked ? {filter: 'brightness(0.5) blur(1px)'} : undefined}
                onClick={this.props.handleClick}
            >
                <div className={'weapon-card'}>
                    <div style={{color: '#efeff5', textAlign: "center"}}>
                        {this.props.name}
                    </div>
                    <img width='160px' src={this.props.image}/>
                </div>
            </div>
        )
    }
}

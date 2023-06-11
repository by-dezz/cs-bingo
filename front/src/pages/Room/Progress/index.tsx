import React from 'react'

import {
    Accordion,
    AccordionDetails,
    AccordionSummary
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import Summary from './Summary'
import Details from './Details'


export default class Progress extends React.Component<any, any> {
    state = {
        expanded: false
    }

    render() {
        return (
            <Accordion
                sx={{ width: '100%' }}
                expanded={this.state.expanded}
                onChange={() => this.setState({ expanded: !this.state.expanded })}
            >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    {!this.state.expanded && <Summary data={this.props.data} user={this.props.user} />}
                </AccordionSummary>

                <AccordionDetails>
                    <Details data={this.props.data} user={this.props.user} />
                </AccordionDetails>
            </Accordion>
        )
    }
}

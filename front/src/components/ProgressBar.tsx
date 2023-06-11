import React from 'react'
import { Box, Paper } from '@mui/material'


export default class ProgressBar extends React.Component<any, any> {
    PRIMARY_COLOR = '#90caf9'
    COLORS = [
        '#66bb6a',
        '#f44336',
        '#ff9800',
        '#ffeb3b',
        '#2196f3',
        '#9c27b0',
        '#795548',
        '#607d8b'
    ]

    render() {
        return (
            <Paper
                sx={{
                    width: '100%',
                    height: this.props.small ? '5px' : '10px',
                    borderRadius: 'unset',
                    border: 'unset'
                }}
                variant={'outlined'}
            >
                <Box
                    sx={{
                        width: `${this.props.value}%`,
                        height: '100%',
                        transition: 'width 0.5s',
                        backgroundColor: this.props.primary
                            ? this.PRIMARY_COLOR
                            : this.COLORS[this.props.index]
                    }}
                />
            </Paper>
        )
    }
}

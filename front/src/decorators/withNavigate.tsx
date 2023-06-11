import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function withNavigate(Component: any) {
    return (props: any) => {
        const navigate = useNavigate()
        const locationParams = useParams()
        return <Component navigate={navigate} {...props} locationParams={locationParams} />
    }
}

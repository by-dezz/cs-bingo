import React from 'react';

import TextCard from "../components/TextCard";
import CenterBox from "../components/CenterBox";


export default class Home extends React.Component {
    render() {
        return (
            <CenterBox>
                <TextCard title={'Solo'} link={'/solo'}/>
                <TextCard title={'Room'} link={'/rooms'}/>
            </CenterBox>
        );
    }
}

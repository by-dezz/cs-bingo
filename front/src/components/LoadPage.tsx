import React from "react";
import CenterBox from "./CenterBox";
import {CircularProgress} from "@mui/material";


export default class LoadPage extends React.Component {
    render() {
        return (
            <CenterBox>
                <CircularProgress/>
            </CenterBox>
        );
    }
}

import * as React from 'react';
import { Container } from 'reactstrap';
import NavMenu from './NavMenu';
import {NavBar} from "./NavBar";
import {ThemeProvider} from "@fluentui/react-theme-provider";
import { createTheme, loadTheme } from '@fluentui/react';
import {DarkTheme} from "../themes/DarkTheme.json";

export default (props: { children?: React.ReactNode }) => {
    loadTheme({palette:DarkTheme});
    return(
    <React.Fragment>


        <NavMenu/>
        <Container>
            {props.children}
        </Container>

    </React.Fragment>
)};

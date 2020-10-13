import * as React from 'react';
import { Container } from 'reactstrap';
import NavMenu from './NavMenu';
import {NavBar} from "./NavBar";
import {ThemeProvider} from "@fluentui/react-theme-provider";
import { createTheme } from '@fluentui/react';
import {DarkTheme} from "../themes/DarkTheme.json";

export default (props: { children?: React.ReactNode }) => {
    const mytheme=createTheme({palette:DarkTheme});
    
    return(
        <React.Fragment>
        <ThemeProvider theme={mytheme}>
        <NavMenu/>
        <Container>
                {props.children}
        </Container>
    </ThemeProvider>
    </React.Fragment>
)};

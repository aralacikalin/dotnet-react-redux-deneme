import * as React from 'react';
import { Container } from 'reactstrap';
import NavMenu from './NavMenu';
import {NavBar} from "./NavBar";
import {ThemeProvider} from "@fluentui/react-theme-provider";
import { createTheme, loadTheme, Toggle } from '@fluentui/react';
import {DarkTheme} from "../themes/DarkTheme.json";
import {LightTheme} from "../themes/LightTheme.json";

export default (props: { children?: React.ReactNode }) => {
    const [isDarkMode,setisDarkMode] =React.useState(false);
    //
    
    
    const myDarktheme=createTheme({palette:DarkTheme});
    const mylighttheme=createTheme({palette:LightTheme});
    const [mytheme,setmytheme]=React.useState(mylighttheme)
    
    
    const handleOnChange=()=>{
        setisDarkMode(!isDarkMode);
        if(isDarkMode){
            setmytheme(mylighttheme);
            loadTheme(mylighttheme);
        }
        else{
            setmytheme(myDarktheme);
            loadTheme(myDarktheme);
        }
    }

    return(
    <React.Fragment>
        <ThemeProvider theme={mytheme}>
            <Toggle label="Dark Mode" onText="On" offText="Off" onChange={handleOnChange}></Toggle>
            <NavMenu/>
            <Container>
                {props.children}
            </Container>
        </ThemeProvider>
    </React.Fragment>
)};

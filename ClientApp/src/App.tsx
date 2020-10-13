import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Counter from './components/Counter';
import FetchData from './components/FetchData';
import {DarkTheme} from "./themes/DarkTheme.json";
import {ThemeProvider} from "@fluentui/react-theme-provider";

import './custom.css'
import { createTheme } from '@fluentui/react';

export default () => {
    const mytheme=createTheme({palette:DarkTheme});
    return(
        <ThemeProvider theme={mytheme}>
    <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data/:startDateIndex?' component={FetchData} />
    </Layout>
    </ThemeProvider>
)};

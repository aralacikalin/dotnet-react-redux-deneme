import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Counter from './components/Counter';
import FetchData from './components/FetchData';


import './custom.css'
import { createTheme } from '@fluentui/react';
import Adventureworks from './components/Adventureworks';

export default () => {

    return(
        
    <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data/:startDateIndex?' component={FetchData} />
        <Route path="/adventurework" component={Adventureworks}/>
    </Layout>
    
)};

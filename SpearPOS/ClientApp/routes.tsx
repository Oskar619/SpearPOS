import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './components/Home';
import FetchData from './components/FetchData';
import Counter from './components/Counter';
import OpenTickets from './components/OpenTickets';
import Retail from './components/Retail';
import Category from './components/Category';

export const routes = <Layout>
    <Route exact path='/' component={ Home } />
    <Route path='/OpenTickets' component={ OpenTickets } />
    <Route path='/Retail' component={ Retail } />
    <Route path='/Categories' component={ Category }/>
</Layout>;

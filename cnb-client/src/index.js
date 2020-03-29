import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import { Route } from 'react-router';
import { HashRouter } from 'react-router-dom';
import './index.css';

import Login from './components/login/Login';
import Register from './components/register/Register';
import Home from './components/home/Home';
import Blockchain from "./components/blockchains/blockchain/Blockchain";
import Directoryblock from "./components/blockchains/directoryblock/Directoryblock";
import Depositdetails from "./components/blockchains/depositdetails/Depositdetails";
import Center from "./components/apply/Center";

ReactDOM.render((
    <HashRouter>
        <Route path="/" exact component={Login} />
        <Route path="/Login" component={Login} />
        <Route path="/Register" component={Register} />
        <Route path="/Home" component={Home} />
        <Route path="/BlockChain" component={Blockchain} />
        <Route path="/Directoryblock" component={Directoryblock} />
        <Route path="/Depositdetails" component={Depositdetails} />
        <Route path="/center" component={Center} />
    </HashRouter>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

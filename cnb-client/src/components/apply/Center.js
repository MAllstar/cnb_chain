import React, { Component } from 'react';
import { Layout } from 'antd';
import { Route, Switch, Redirect } from "react-router-dom";

import Header from "../headerfooter/Header";
import Footer from "../headerfooter/Footer";

import Problem from "./problem/Problem";
import Apply from "./apply/Apply";
import History from "./history/History";

import Material from './material/Material';

import Approval from './approval/Approval';

import { axios_get } from '../../services/axios';

export default class Center extends Component {
  state = {
    scope: 1
  }

  async componentDidMount() {
    let data = await axios_get('/verify');
    this.setState({ scope: data.scope });
  }

  render() {
    return (
      <Layout>
        <Header />
        <div style={{ minHeight: '560px' }}>
          <Route render={() => {
            switch (this.state.scope) {
              case 1: return (
                <Switch>
                  <Route exact path="/center/problem" component={Problem} />
                  <Route exact path="/center/apply" component={Apply} />
                  <Route exact path="/center/history" component={History} />
                  <Redirect to="/center/problem" />
                </Switch>
              )
              case 2: return (
                <Switch>
                  <Route exact path="/center/material" component={Material} />
                  <Redirect to="/center/material" />
                </Switch>
              )
              case 3: return (
                <Switch>
                  <Route exact path="/center/approval" component={Approval} />
                  <Redirect to="/center/approval" />
                </Switch>
              )
              default: return null
            }
          }} />
        </div>
        <Footer />
      </Layout>
    )
  }
}

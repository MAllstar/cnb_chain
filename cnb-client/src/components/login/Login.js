import React, { Component } from 'react';
import { Route } from 'react-router';
import './Login.css';

import Head from "../headerfooter/Header";
import Footer from "../headerfooter/Footer";
import OwnerLoginForm from './OwnerLoginForm';
import InsurerLoginForm from './InsurerLoginForm';
import RepairerLoginForm from './RepairerLoginForm';

class Login extends Component {
    state = {
        scope: 1,
    }

    handleChangeIDType = (e) => {
        this.setState({ scope: e.target.value });
    }

    render() {
        return (
            <>
                <div className={"contentLogin"}>
                    <Head />
                    <Route render={() => {
                        switch (this.state.scope) {
                            case 1:
                                return (
                                    <OwnerLoginForm handleChangeIDType={this.handleChangeIDType} />
                                )
                            case 2:
                                return (
                                    <RepairerLoginForm handleChangeIDType={this.handleChangeIDType} />
                                )
                            case 3:
                                return (
                                    <InsurerLoginForm handleChangeIDType={this.handleChangeIDType} />
                                )
                            default: return null
                        }
                    }} />
                </div>
                <Footer />
            </>
        );
    }
}

export default Login;

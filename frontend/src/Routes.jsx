import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import Home from './Pages/Home';
import MainLayout from './Pages/MainLayout';
import Signup from './Components/Signup';
import ForgotPassword from './Components/ForgotPassword';
import ConfirmResetPass from './Components/ConfirmResetPass';
import NewPassword from './Components/NewPassword';
import ConfirmActivationEmail from './Components/ConfirmActivationEmail';
import ActivateEmail from './Components/ActivateEmail';


import { createBrowserHistory } from "history";

const customHistory = createBrowserHistory()

export default class Routes extends React.Component {
    render() {
        return (
            <div>
                <Router>
                    <MainLayout>
                        <Route exact path='/' component={Home} />
                        <Route path='/signup' component={Signup} />
                        <Route path='/forgot-password' component={ForgotPassword} />
                        <Route path='/reset/password/confirm/' component={ConfirmResetPass} />
                        <Route path='/reset/password/new/:uid/:token/' component={NewPassword} />
                        <Route path='/activation/send/email' component={ConfirmActivationEmail} />
                        <Route path='/activate/user/:uid/:token' component={ActivateEmail} />


                    </MainLayout>


                </Router>
            </div>
        );
    }
};

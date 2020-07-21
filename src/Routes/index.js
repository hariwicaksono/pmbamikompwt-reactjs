import React from 'react';
import {BrowserRouter,Route, Switch} from 'react-router-dom'
import Home from '../Component/Home';
import Ujianonline from '../Component/User/Ujianonline';
import Login from '../Component/Login';
import Register from '../Component/Register';
import User from '../Component/User/Index';
import Page from '../Component/Page'; 
import Akun from '../Component/User/Akun/Edit';
import AkunPassword from '../Component/User/Akun/Password';
import PageU from '../Component/User/PageU';
import { NotificationContainer } from 'react-notifications';
import ScrollToTop from 'react-router-scroll-top';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const MyRouter = () => {
    return(
    <Switch>
    <ScrollToTop>
        <Route path="/" component={Home} exact />
        <Route path="/ujianonline" component={Ujianonline} />
        <PublicRoute restricted={true} component={Login} path="/login" exact />
        <Route path="/register" component={Register} />
        <PrivateRoute path="/user" component={User} exact />
        <Route path="/akun/edit/:id" component={Akun} />
        <Route path="/akun/password/:id" component={AkunPassword} />
        <PrivateRoute path="/page/:id" component={Page} exact />
        <Route path="/pageU/:id" component={PageU} />

        <NotificationContainer />
    </ScrollToTop>
    </Switch>
    )

}

export default MyRouter
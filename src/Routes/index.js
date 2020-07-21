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

const MyRouter = () => {
    return(
    <Switch>
    <ScrollToTop>
        <Route path="/" exact component={Home} />
        <Route path="/ujianonline" component={Ujianonline} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/user" component={User} />
        <Route path="/akun/edit/:id" component={Akun} />
        <Route path="/akun/password/:id" component={AkunPassword} />
        <Route path="/page/:id" exact component={Page} />
        <Route path="/pageU/:id" component={PageU} />

        <NotificationContainer />
    </ScrollToTop>
    </Switch>
    )

}

export default MyRouter
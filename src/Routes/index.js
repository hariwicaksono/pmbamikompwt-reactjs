import React from 'react';
import {Route, Switch} from 'react-router-dom'
import Home from '../Pages/Home';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import Page from '../Pages/Page'; 
import Akreditasi from '../Pages/Page/Akreditasi'; 
import User from '../Pages/User';
import Pendaftaran from '../Pages/User/PendaftaranU';
import Dokumen from '../Pages/User/DokumenU';
import Akun from '../Pages/User/Akun/Edit';
import AkunPassword from '../Pages/User/Akun/Password';
import { NotificationContainer } from 'react-notifications';
import ScrollToTop from 'react-router-scroll-top';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const MyRouter = () => {
    return(
    <Switch>
    <ScrollToTop>
        <Route path="/" component={Home} exact />
        <PublicRoute restricted={true} component={Login} path="/login" exact />
        <Route path="/register" component={Register} />
        <Route path="/user" component={User} exact />
        <PrivateRoute path="/user/pendaftaran" component={Pendaftaran} />
        <PrivateRoute path="/user/dokumen" component={Dokumen} />
        <PrivateRoute path="/akun/edit/:id" component={Akun} exact />
        <PrivateRoute path="/akun/password/:id" component={AkunPassword} exact />
        <Route path="/page/:id" component={Page} exact />
        <Route path="/akreditasi" component={Akreditasi} />

        <NotificationContainer />
    </ScrollToTop>
    </Switch>
    )

}

export default MyRouter
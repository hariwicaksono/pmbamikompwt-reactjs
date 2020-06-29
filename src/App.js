import React from 'react';
import {BrowserRouter,Route} from 'react-router-dom'
import Home from './Component/Home';
import Ujianonline from './Component/User/Ujianonline';
import Login from './Component/Login';
import Register from './Component/Register';
import User from './Component/User/Index';
import Page from './Component/Page';
import AkunU from './Component/User/AkunU';
import EditAkunU from './Component/User/EditUser';
import PageU from './Component/User/PageU';
import { NotificationContainer } from 'react-notifications';
import ScrollToTop from 'react-router-scroll-top';
 
function App() {
  return (
    <BrowserRouter>
    <ScrollToTop>
        <Route path="/" exact component={Home} />
        <Route path="/ujianonline" component={Ujianonline} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/user" component={User} />
        <Route path="/akunU" component={AkunU} />
        <Route path="/editakunU" component={EditAkunU} />
        <Route path="/page/:id" exact component={Page} />
        <Route path="/pageU/:id" component={PageU} />
        <NotificationContainer />
    </ScrollToTop>
    </BrowserRouter>
  );
}

export default App;

import React from 'react';
import {BrowserRouter,Route} from 'react-router-dom'
import Home from './Component/Home';
import Ujianonline from './Component/User/Ujianonline';
import Login from './Component/Login';
import Register from './Component/Register';
import User from './Component/User/Index';
import Page from './Component/Page';
import AkunU from './Component/User/AkunU';
import PageU from './Component/User/PageU';
import { NotificationContainer } from 'react-notifications';
 
function App() {
  return (
    <BrowserRouter>
        <Route path="/" exact component={Home} />
        <Route path="/ujianonline" component={Ujianonline} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/user" component={User} />
        <Route path="/akunU" component={AkunU} />
        <Route path="/page/:id" exact component={Page} />
        <Route path="/pageU/:id" component={PageU} />
        <NotificationContainer />

    </BrowserRouter>
  );
}

export default App;

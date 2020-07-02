import React, { Component } from 'react'
import {Redirect,Link} from 'react-router-dom'
import API from '../../ServiceApi/Index'
import { NotificationManager } from 'react-notifications'
import { FormGroup, Spinner } from 'react-bootstrap'
import {BoxArrowInRight} from 'react-bootstrap-icons'
import Form from 'react-formal'
import * as yup from 'yup'
 
const schema = yup.object({
    username: yup.string().required(),
    password: yup.string().required(),
  }); 
class LoginForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            level: "USER",
            isLogin:false,
            idLogin:"",
            loading: false
        }
        this.handlerChange = this.handlerChange.bind(this)
        this.handlerSubmit = this.handlerSubmit.bind(this)
        
    }


    handlerChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handlerSubmit = () => {
        this.setState({ loading: true });
        API.PostLogin(this.state).then(res=>{
            setTimeout(() => {
            if (res.id === "1" ) {
                sessionStorage.setItem('isLogin',JSON.stringify(res.data))
                this.setState({
                    isLogin:true,
                    loading: false,
                    idLogin:"1"
                })
                NotificationManager.success('Berhasil masuk sistem');
            } else if (res.id === "2" ) {
                sessionStorage.setItem('isAdmin',JSON.stringify(res.data))
                this.setState({
                    isLogin:true,
                    loading: false,
                    idLogin:"2"
                })
                NotificationManager.success('Berhasil masuk sistem');
            } else {
                NotificationManager.warning('Login gagal, periksa username dan password anda');
            }
            }, 100);
        })
        
    }

    

    render() {
       

        if(this.state.isLogin){
            if (this.state.idLogin === "1") {
                return( <Redirect to="/user" /> )
            } else {
                return(<Redirect to="admin" />)
            }
        }

        return (
            <div>
        
                <Form onSubmit={this.handlerSubmit} schema={schema}>
                    <input type="hidden" name="level" value="USER" />
                    <FormGroup>
                        <Form.Field type="text" name="username" placeholder="Username" className="form-control" onChange={this.handlerChange} />
                        <Form.Message for="username" className="error" />
                    </FormGroup>
                    <FormGroup>
                        <Form.Field type="password" name="password" placeholder="Password" className="form-control" onChange={this.handlerChange} />
                        <Form.Message for="password" className="error" />
                    </FormGroup>
                    <Form.Submit type="submit" className="btn btn-primary">
                        {
                        this.state.loading
                        ?
                        <><Spinner as="span" animation="border" size="sm"  role="status" aria-hidden="true" /> Memuat...</>
                        :  <><BoxArrowInRight size="16"/> Login</> }</Form.Submit>
                </Form>                              
  
            </div>
        )
    }

}

export default LoginForm
import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import API from '../../ServiceApi/Index'
import { NotificationManager } from 'react-notifications'
import {Container, FormLabel, FormGroup, Row, Col, Card} from 'react-bootstrap'
import {Check2} from 'react-bootstrap-icons'
import Form from 'react-formal'
import * as yup from 'yup'

const TITLE = ' Daftar - PMB Universitas Amikom Purwokerto'
const schema = yup.object({
    nama: yup.string().required(),
    telp: yup.number().required(),
    email: yup.string().required(),
    username: yup.string().required(),
    password: yup.string().required(),
  });

class RegisterForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            nama:"",
            telp:"",
            email:"",
            username:"",
            password:"",
            level:"USER",
            err:""
        }
        this.handlerChange = this.handlerChange.bind(this)
        this.handlerSubmit = this.handlerSubmit.bind(this)
    }

    handlerChange = (event) => {
       this.setState({
           [event.target.name] : event.target.value
       })
    }

    handlerSubmit = (event) => {
        event.preventDefault()
        //console.log(event)
        API.PostUser(this.state).then(res=>{
            console.log(res)
            if (res.status === 1 ) {
                this.props.history.push('/login')
            } else {
                this.setState({
                    err:"GAGAL REGISTER"
                })
            }
        })
    }


    render() {

    return (
    <>
   
                
    <Form onSubmit={this.handlerSubmit} schema={schema} >

        <FormGroup>
        
        <FormLabel>Nama Lengkap*</FormLabel>
            
                <Form.Field className="form-control" placeholder="Nama Lengkap"
                name="nama"
                onChange={this.handlerChange} />
                <Form.Message for="nama" className="error" />
                
        </FormGroup>

        <Row>
        <FormGroup as={Col}>
            <FormLabel>Email*</FormLabel>
            <Form.Field type="text" placeholder="Email" name="email" className="form-control" onChange={this.handlerChange}/>
            <Form.Message for="email" className="error" />
        </FormGroup>
        
        
        <FormGroup as={Col}>
            <FormLabel>Telp/HP*</FormLabel>
            <Form.Field type="text" placeholder="Telp/No.HP" name="telp" className="form-control" onChange={this.handlerChange} />
            <Form.Message for="telp" className="error" />
        </FormGroup>
        </Row>

        <FormGroup>
            <FormLabel>Username*</FormLabel>
            <Form.Field type="text" placeholder="Username" name="username" className="form-control" onChange={this.handlerChange} />
            <Form.Message for="username" className="error" />
        </FormGroup>
        <FormGroup>
            <FormLabel>Password*</FormLabel>
            <Form.Field type="password" placeholder="Password" name="password" className="form-control" onChange={this.handlerChange} />
            <Form.Message for="password" className="error" />
        </FormGroup>

        <Form.Submit type="submit" className="btn btn-info btn-block"><Check2 size="16"/> Daftar</Form.Submit>
    </Form>            

    </>
    )
    }
}


export default RegisterForm
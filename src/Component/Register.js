import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import Appbar from './Appbar'
import LoginForm from './Form/LoginForm'
import API from '../ServiceApi/Index'
import { Helmet } from 'react-helmet'
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
const schemaLog = yup.object({
    username: yup.string().required(),
    password: yup.string().required(),
    level: yup.string().required(),
  }); 
class Register extends Component {
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
    <div>
    <Helmet>
    <title>{ TITLE }</title>
    </Helmet>

    
    <Container className="py-4" fluid>
        <Row>
        <Col md={12}>
        <Card className="bg-white shadow border-0">
               
            <Card.Body>
                <h4 className="mb-3"><strong>Daftar Akun</strong> <small>PMB Universitas AMIKOM Purwokerto</small></h4>
                
                <Form onSubmit={this.handlerSubmit} schema={schema} >

                    <FormGroup>
                    
                    <FormLabel>Nama Lengkap*</FormLabel>
                        
                            <Form.Field className="form-control" placeholder="Username"
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

                    <Form.Submit type="submit" className="btn btn-primary"><Check2 size="16"/> Daftar</Form.Submit>
                </Form>
                
                
            </Card.Body>
               
            </Card>
        </Col>

        

        </Row>
    </Container>

    </div>
    )
    }
}


export default Register
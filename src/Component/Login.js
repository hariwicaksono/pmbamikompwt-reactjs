import React, { Component } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import Appbar from './Appbar'
import {Redirect,Link} from 'react-router-dom'
import API from '../ServiceApi/Index'
import { Helmet } from 'react-helmet'
import Parser from 'html-react-parser'
import { NotificationManager } from 'react-notifications'
import {Container, FormLabel, FormGroup, Card, Row, Col} from 'react-bootstrap'
import Form from 'react-formal'
import * as yup from 'yup'

const TITLE = ' Masuk - PMB Universitas Amikom Purwokerto'
const schema = yup.object({
    username: yup.string().required(),
    password: yup.string().required(),
    level: yup.string().required(),
  }); 
class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            level: "",
            isLogin:false,
            idLogin:""
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
        //event.preventDefault()
        API.PostLogin(this.state).then(res=>{
            if (res.id === "1" ) {
                sessionStorage.setItem('isLogin',JSON.stringify(res.data))
                this.setState({
                    isLogin:true,
                    idLogin:"1"
                })
                NotificationManager.success('Berhasil masuk sistem');
            } else if (res.id === "2" ) {
                sessionStorage.setItem('isAdmin',JSON.stringify(res.data))
                this.setState({
                    isLogin:true,
                    idLogin:"2"
                })
                NotificationManager.success('Berhasil masuk sistem');
            } else {
                NotificationManager.warning('Login gagal, periksa username dan password anda');
            }
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
                <Helmet>
                <title>{ TITLE }</title>
                </Helmet>
                <Navbar />
               
                <Container>
                    
                <Row className="justify-content-center my-4">
                <Col lg="5">
                    <Card className="bg-white shadow border-0">
                      
                            <Card.Body>
                            <h4 className="mb-3"><strong>Masuk</strong></h4>
                                <Form onSubmit={this.handlerSubmit} schema={schema}>
                                    <FormGroup>
                                        <FormLabel>Username</FormLabel>
                                        <Form.Field type="text" name="username" placeholder="Username" className="form-control" onChange={this.handlerChange} />
                                        <Form.Message for="username" className="error" />
                                    </FormGroup>
                                    <FormGroup>
                                        <FormLabel>Password</FormLabel>
                                        <Form.Field type="password" name="password" placeholder="Password" className="form-control" onChange={this.handlerChange} />
                                        <Form.Message for="password" className="error" />
                                    </FormGroup>
                                    <FormGroup>
                                    <Form.Field as="select" name="level" className="form-control" onChange={this.handlerChange} >
                                            <option value={null}>Pilih</option>
                                            <option>USER</option>
                                            <option>ADMIN</option>
                                    </Form.Field>
                                    <Form.Message for="level" className="error" />
                                    </FormGroup>
                                    <Form.Submit type="submit" className="btn btn-primary">Login</Form.Submit>
                                </Form>                              
  
                               
                            </Card.Body>
                            <Card.Footer className="text-muted"> Belum punya akun PMB? <Link to={'/register'}>Daftar Akun</Link></Card.Footer>
                        </Card>
                        </Col>
                    </Row>
                </Container>

                <Footer />
                <Appbar />
            </div>
        )
    }

}

export default Login
import React, { Component } from 'react'
import {Link,Redirect} from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import Appbar from './Appbar'
import TabsProdi from './TabsProdi'
import SideButton from './SideButton'
import LoginForm from './Form/LoginForm'
import PeriksaForm from './Form/PeriksaForm'
import API from '../ServiceApi/Index'
import {Container, Form, Row, Col, Carousel, Button, Card} from 'react-bootstrap'
import {PersonPlus, Search, BoxArrowRight} from 'react-bootstrap-icons'
import { Helmet } from 'react-helmet'
import { NotificationManager } from 'react-notifications'

const TITLE = 'PMB Universitas Amikom Purwokerto'

class Home extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            level: "USER",
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

    handlerSubmit = (event) => {
        event.preventDefault()
        API.PostLogin(this.state).then(res=>{
            if (res.id === "1" ) {
                sessionStorage.setItem('isLogin',JSON.stringify(res.data))
                this.setState({
                    isLogin:true,
                    idLogin:"1"
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
            } 
        }

        return (
            
            <div>
                <Helmet>
                <title>{ TITLE }</title>
                <style type="text/css">{`
                body {
                    background-color: #653E91;
                }
                `}
                </style>
                </Helmet>

                <Navbar />
                
                <Container fluid>

                <Row>
                <Col sm={5} md={4} lg={3} className="py-3" style={{backgroundColor: "#482373"}}>
                        
                <SideButton />
                   
                </Col>

                <Col sm={7} md={8} lg={9}>

                    <Carousel className="mb-3">
                        <Carousel.Item>
                            <img
                            className="d-block w-100"
                            src="http://pmb.amikompurwokerto.ac.id/files/cover.jpg"
                            alt="First slide"
                            />
                            
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                            className="d-block w-100"
                            src="http://pmb.amikompurwokerto.ac.id/files/3.jpeg"
                            alt="Third slide"
                            />

                           
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                            className="d-block w-100"
                            src="http://pmb.amikompurwokerto.ac.id/files/2.png"
                            alt="Third slide"
                            />

                            
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                            className="d-block w-100"
                            src="http://pmb.amikompurwokerto.ac.id/files/4.png"
                            alt="Third slide"
                            />

                            
                        </Carousel.Item>
                    </Carousel>
                    
                    <Row className="pt-1 pb-3">
                    <Col md={7}>
                    <Card className="card-lift--hover shadow border-0 py-1">
                    <Card.Body>
                    <Card.Title><h4>Periksa Status Pendaftaran</h4></Card.Title>
                   
                    <PeriksaForm />
                    
                    </Card.Body>
                    </Card>
                    
                    </Col>

                    <Col md={5}>

                    <Card className="bg-light card-lift--hover shadow border-0 py-0">
                    <Card.Body>
                    <Card.Title>Masuk</Card.Title>

                    <LoginForm />

                    </Card.Body>
                    </Card>
                   
                    
                    </Col>
                    </Row>
                  

                </Col>
                    
                </Row>

            <section className="section section-sm">

            <TabsProdi />      

            </section>
            </Container>    
               
            <Footer />   
            <Appbar />
            </div>
        )
    }
}

export default Home
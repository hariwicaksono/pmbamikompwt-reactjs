import React, { Component } from 'react'
import {NavLink, Link} from 'react-router-dom'
import FormLogin from '../Login/LoginForm'
import TabProdi from '../../Components/TabProdi'
//import { Helmet } from 'react-helmet'
import {Container, Row, Col, Carousel, Card, Button, CardDeck} from 'react-bootstrap'
import { Award,CalendarWeek,ChevronRight,UiChecks } from 'react-bootstrap-icons'

class Home extends Component {

    render() {
        return (
            
            <>
            <Container className="my-2" fluid>

            <Row className="shadow mb-2" noGutters>
            <Col md={12}>
            <Carousel>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src="http://pmb.amikompurwokerto.ac.id/files/Slider_.png"
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

            </Col>
            

            </Row>
            
            
            
            <Row className="mb-2">
            <Col md={12}>
            <Card className="shadow">
            <Card.Body>
           
            <CardDeck className="text-center">

                <NavLink to={'/gelombang'} className="text-decoration-none" title="Gelombang" alt="Gelombang" style={{color: "#2E4F60"}}>
                <Card>
                <Card.Body>
                <CalendarWeek size={40} />
                </Card.Body>
                </Card>
                <small>Gelombang</small>
                </NavLink>
                
                <NavLink to={'/page/14'} className="text-decoration-none" title="Jenis Pendaftaran" alt="Jenis Pendaftaran" style={{color: "#2E4F60"}}>
                <Card>
                    
                    <Card.Body>
                    <UiChecks size={40} />
                    </Card.Body>
                
                </Card>
                <small>Jenis Pendaftaran</small>
                </NavLink>

                <NavLink to={'/akreditasi'} className="text-decoration-none" title="Akreditasi" alt="Akreditasi" >
                <Card>
                    
                    <Card.Body>
                    <Award size={40} style={{color: "#E15D1E"}}/>
                    </Card.Body>
                
                </Card>
                <small style={{color: "#2E4F60"}}>Akreditasi B</small>
                </NavLink>
                
            </CardDeck>
          

            </Card.Body>
            </Card>

            </Col>
            </Row>

            <Row className="mb-2">
            <Col md={12}>
            <Card className="shadow">
            <Card.Body>

            <TabProdi/>

            </Card.Body>
            </Card>

            </Col>
            </Row>

            <Row className="mb-2">
            <Col md={12}>
            <Card className="shadow px-3 py-3" bg="danger" text="light" >
            <Card.Body>
            <Card.Title style={{fontSize: "2.4rem", fontWeight: "700"}}>Daftar Sekarang</Card.Title>
            <Card.Text>
            Buruan gabung yuk sob, di kampus dengan tenaga pengajar yang kompeten di bidangnya. <span>🥳</span>
            <br/>JOIN AMIKOM PURWOKERTO NOW!
            </Card.Text>
            <Button as={Link} variant="outline-light" to='/register' className="rounded-pill" style={{fontWeight: '600',paddingTop:'10px',paddingBottom:'10px'}}>Daftar Sekarang <ChevronRight/></Button>
            </Card.Body>
            </Card>
            </Col>
            </Row>

            </Container>
            </>
        )
    }
}

export default Home
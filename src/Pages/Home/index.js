import React, { Component } from 'react'
import {NavLink, Link} from 'react-router-dom'
import FormLogin from '../Login/LoginForm'
import TabProdi from '../../Components/TabProdi'
//import { Helmet } from 'react-helmet'
import {Container, Row, Col, Carousel, Card, Button} from 'react-bootstrap'
import { ChevronRight } from 'react-bootstrap-icons'

class Home extends Component {

    render() {
        return (
            
            <>
            <Container className="my-3" fluid>

            <Row className="shadow mb-3" noGutters>
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
            

            <Row className="mb-3">
            <Col md={8}>
            <Card className="h-100 shadow">
            <Card.Body>
           
            <Row className="text-center mb-3 row-cols-3 px-4" noGutters>
                <Col>
                <NavLink to={'/page/31'} className="text-decoration-none" title="Alur Pendaftaran" alt="Alur Pendaftaran">
                <Card>
                
                <Card.Body className="p-2">
                    <img src="/images/iconpack/directions_216453.png" alt="" width="60" />
                    </Card.Body>
                </Card>
                <small style={{color: "#2E4F60",fontWeight: "600"}}>Alur Pendaftaran</small>
                </NavLink>
                </Col>
                <Col>
                <NavLink to={'/page/14'} className="text-decoration-none" title="Jenis Pendaftaran" alt="Jenis Pendaftaran">
                <Card>
                    
                    <Card.Body className="p-2">
                    <img src="/images/iconpack/list_240279.png" alt="" width="60" />
                    </Card.Body>
                
                </Card>
                <small style={{color: "#2E4F60",fontWeight: "600"}}>Jenis Pendaftaran</small>
                </NavLink>
                </Col>
                <Col>
                <NavLink to={'/page/34'} className="text-decoration-none" title="Akreditasi" alt="Akreditasi" >
                <Card>
                    
                    <Card.Body className="p-2">
                   <img src="/images/iconpack/smartphone.png" alt="" width="60" />
                    </Card.Body>
                
                </Card>
                <small style={{color: "#2E4F60",fontWeight: "600"}}>Syarat Pendaftaran</small>
                </NavLink>
                </Col>
                
            </Row>

            <Row className="text-center row-cols-3 px-4" noGutters>
            <Col>
                <NavLink to={'/gelombang'} className="text-decoration-none" title="Gelombang" alt="Gelombang">
                <Card>
               
                <Card.Body className="p-2">
                    <img src="/images/iconpack/calendar_243925.png" alt="" width="60" />
                    </Card.Body>
                </Card>
                <small style={{color: "#2E4F60",fontWeight: "600"}}>Gelombang</small>
                </NavLink>
                </Col>
                
                <Col>
                <NavLink to={'/perlengkapan-psu'} className="text-decoration-none" title="Perlengkapan PSU" alt="Perlengkapan PSU">
                <Card>
                    
                    <Card.Body className="p-2">
                    <img src="/images/iconpack/agenda-1.png" alt="" width="60" />
                    </Card.Body>
                
                </Card>
                <small style={{color: "#2E4F60",fontWeight: "600"}}>Perlengkapan PSU</small>
                </NavLink>
                </Col>
                <Col>
                <NavLink to={'/akreditasi'} className="text-decoration-none" title="Akreditasi" alt="Akreditasi" >
                <Card>
                    
                    <Card.Body className="p-2">
                   <img src="/images/iconpack/trophy_210728.png" alt="" width="60" />
                    </Card.Body>
                
                </Card>
                <small style={{color: "#2E4F60",fontWeight: "600"}}>Akreditasi</small>
                </NavLink>
                </Col>
            </Row>
          

            </Card.Body>
            </Card>

            </Col>

            <Col md={4}>

                <Card className="shadow h-100">
                    
                    <Card.Body>
                    <Card.Title>Masuk</Card.Title>
                    <hr className="my-2"/>
                    <FormLogin />
        
                    </Card.Body>
                    </Card>
            </Col>
            </Row>

            <Row className="mb-3">
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
            Buruan gabung yuk sob, di kampus dengan tenaga pengajar yang kompeten di bidangnya.
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
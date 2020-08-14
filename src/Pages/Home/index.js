import React, { Component } from 'react'
//import {Redirect} from 'react-router-dom'
import FormLogin from '../Login/LoginForm'
//import { Helmet } from 'react-helmet'
import {Container, Row, Col, Carousel, Card} from 'react-bootstrap'

class Home extends Component {

    render() {
        return (
            
            <>
            <Container className="my-3" fluid>

            <Row className="mx-auto mb-3">
            <Col md={8}>
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
            <Col md={4} className="bg-white">

            <Card>
            <Card.Body>
            <Card.Title>Masuk</Card.Title>

            <FormLogin />

            </Card.Body>
            </Card>

            </Col>

            </Row>
            
            
            
            <Row className="mx-auto">
            <Col md={12}>
            <Card className="bg-white border-0 py-0">
            <Card.Body>
           

          

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
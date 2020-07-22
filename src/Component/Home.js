import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import FormLogin from './Form/LoginForm'
import {Container, Row, Col, Carousel, Card} from 'react-bootstrap'

class Home extends Component {

    render() {
        if (sessionStorage.getItem('isLogin')) {
            return(<Redirect to="/user" />)
        }
        if (sessionStorage.getItem('isAdmin')) {
            return(<Redirect to="/admin" />)
        }
        return (
            
            <>
            <Container>
            <Carousel className="mb-3">
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src="http://pmb.amikompurwokerto.ac.id/files/slide_new.jpeg"
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
            <Col md={8}>
            
            
            </Col>

            <Col md={4}>

            <Card className="bg-white card-lift--hover shadow border-0 py-0">
            <Card.Body>
            <Card.Title>Masuk</Card.Title>

            <FormLogin />

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
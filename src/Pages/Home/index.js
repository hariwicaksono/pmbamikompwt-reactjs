import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'
import FormLogin from '../Login/LoginForm'
//import { Helmet } from 'react-helmet'
import {Container, Row, Col, Carousel, Card, CardDeck} from 'react-bootstrap'
import { Award,CalendarWeek } from 'react-bootstrap-icons'

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
            
            
            
            <Row>
        
            <Col md={12}>
            <Card className="shadow">
            <Card.Body>
           
            <CardDeck className="text-center">
            <NavLink to={'/page/33'} className="text-decoration-none" title="Gelombang" alt="Gelombang">
                <Card>
                    
                    <Card.Body>
                    <CalendarWeek size={45} /><br/><span>Gelombang</span>
                    
                    </Card.Body>
                
                </Card>
                </NavLink>
                <NavLink to={'/akreditasi'} className="text-decoration-none" title="Akreditasi" alt="Akreditasi">
                <Card>
                    
                    <Card.Body>
                    <Award size={45} /><br/><span>Akreditasi</span>
                    
                    </Card.Body>
                
                </Card>
                </NavLink>
                
                <Card>
                
                    <Card.Body>
                    <Card.Title>Card title</Card.Title>
                    
                    </Card.Body>
                
                </Card>
                <Card>
                
                    <Card.Body>
                    <Card.Title>Card title</Card.Title>
                    
                    </Card.Body>
                
                </Card>
                <Card>
                
                    <Card.Body>
                    <Card.Title>Card title</Card.Title>
                    
                    </Card.Body>
                
                </Card>
            </CardDeck>
          

            </Card.Body>
            </Card>

            </Col>

            <Col md={3} className="bg-white">

<Card className="border-light">
    
<Card.Body>
<Card.Title style={{fontSize:"1.5rem"}}>Masuk</Card.Title>
<hr/>
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
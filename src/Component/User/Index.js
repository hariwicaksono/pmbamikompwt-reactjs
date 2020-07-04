import React, { Component } from 'react'
import NavbarU from './NavbarU'
import API from '../../ServiceApi/Index'
import { Helmet } from 'react-helmet'
import AppbarU from './AppbarU'
import { Container, Row, Col, Card, CardDeck } from 'react-bootstrap'
import { NotificationManager } from 'react-notifications'

const TITLE = ' User - PMB Universitas Amikom Purwokerto'
class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            mhs: []
        }
    }

    componentDidMount = () => {
        
    }

    render() {
        
        return (
            <div>
                <Helmet>
                <title>{ TITLE }</title>
                </Helmet>
                <NavbarU />
                <div className="my-3">
                <Container fluid>
                <Card className="bg-white py-4 px-4 shadow">
                    <Row>
                        
                        <Col md="12">
                        <CardDeck>
                        <Card>
                            
                            <Card.Body>
                            <Card.Title>Card title</Card.Title>
                            <Card.Text>
                                This is a wider card with supporting text below as a natural lead-in to
                                additional content. This content is a little bit longer.
                            </Card.Text>
                            </Card.Body>
                            
                        </Card>
                        <Card>
                            
                            <Card.Body>
                            <Card.Title>Card title</Card.Title>
                            <Card.Text>
                                This card has supporting text below as a natural lead-in to additional
                                content.{' '}
                            </Card.Text>
                            </Card.Body>
                            
                        </Card>
                        <Card>
                            
                            <Card.Body>
                            <Card.Title>Card title</Card.Title>
                            <Card.Text>
                                This is a wider card with supporting text below as a natural lead-in to
                                additional content. This card has even longer content than the first to
                                show that equal height action.
                            </Card.Text>
                            </Card.Body>
                           
                        </Card>
                        </CardDeck>
                        </Col>
                    </Row>
                </Card>
                </Container>
                </div>
                <AppbarU />
            </div>
        )
    }
}


export default Index
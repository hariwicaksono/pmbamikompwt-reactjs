import React, { Component } from 'react'
import {Redirect,NavLink,Link} from 'react-router-dom'
import API from '../../ServiceApi/Index'
import { Helmet } from 'react-helmet'
import AppbarU from './AppbarU'
import MainnavU from './MainnavU'
import { Container, Row, Col, Card, CardDeck } from 'react-bootstrap'
import { NotificationManager } from 'react-notifications'
import Steps from 'awesome-steps'
import 'awesome-steps/dist/style.css'

const TITLE = ' User - PMB Universitas Amikom Purwokerto'
class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            login:false,
            mhs: [],
            current: 0
        }
    }

    componentDidMount = () => {
        if (sessionStorage.getItem('isLogin')) {
           // console.log('Ok')
           
        } else {
            this.setState({
                login:true
            })
        }
        
    }

    handleStepClick = (stepNumber) => {
        this.setState({current: stepNumber})
    };

    render() {
        if (this.state.login) {
            return( <Redirect to="/login" /> )
        }

        return (
            <>
                <Helmet>
                <title>{ TITLE }</title>
                
                </Helmet>


                <MainnavU />

                <div className="my-3 mx-3">
                <Container fluid>
                    
                <Steps  current={this.state.current}
                    labelPlacement={"vertical"}
                    direction={"horizontal"} >
              <Steps.Step title="Formulir" onClick={() => this.handleStepClick(0)}  />
              <Steps.Step title="Dokumen" onClick={() => this.handleStepClick(1)} />          
              <Steps.Step title="Informasi" onClick={() => this.handleStepClick(2)} />
            </Steps>
              
                    <Row>
                        <Col md="12">
                    
                        <CardDeck>
                        <Card bg="primary" text="white" className="shadow">
                            <Card.Body>
                            <Card.Title className="text-white">Card title</Card.Title>
                            <Card.Text>
                                This is a wider card with supporting text below as a natural lead-in to
                                additional content. This content is a little bit longer.
                            </Card.Text>
                            </Card.Body>
                            
                        </Card>
                        <Card className="shadow">
                            
                            <Card.Body>
                            <Card.Title>Card title</Card.Title>
                            <Card.Text>
                                This card has supporting text below as a natural lead-in to additional
                                content.{' '}
                            </Card.Text>
                            </Card.Body>
                            
                        </Card>
                        <Card className="shadow">
                            
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
              
                </Container>
                </div>
    
            </>
        )
    }
}


export default Index
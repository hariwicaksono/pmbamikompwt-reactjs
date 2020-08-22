import React, { Component } from 'react'
//import {Redirect,NavLink,Link} from 'react-router-dom'
//import API from '../../ServiceApi/Index'
import { Helmet } from 'react-helmet'
import { Card, Container } from 'react-bootstrap'
import Form from './Form'

const TITLE = ' User - PMB Universitas Amikom Purwokerto'
class Pendaftaran extends Component {
    constructor(props) {
        super(props)
        this.state = {
            //mhs: []
        }
    }

    render() {
        
        return (
            <>
                <Helmet>
                <title>{ TITLE }</title>
                
                </Helmet>
               
                <Container fluid>

                <Card className="shadow my-3">
                <Card.Body>

                <Form />

                </Card.Body>
                </Card>
                </Container>
             
    
            </>
        )
    }
}


export default Pendaftaran
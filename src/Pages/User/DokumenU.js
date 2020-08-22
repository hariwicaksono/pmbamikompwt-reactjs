import React, { Component } from 'react'
//import {Redirect,NavLink,Link} from 'react-router-dom'
//import API from '../../ServiceApi/Index'
import { Helmet } from 'react-helmet'

import { Card, Container } from 'react-bootstrap'
import Dokumen from './Dokumen'

const TITLE = ' User - PMB Universitas Amikom Purwokerto'
class DokumenU extends Component {
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

               <Dokumen />

                </Card.Body>
                </Card>
                </Container>
             
    
            </>
        )
    }
}


export default DokumenU
import React, { Component } from 'react'
//import {Redirect,NavLink,Link} from 'react-router-dom'
//import API from '../../ServiceApi/Index'
import { Helmet } from 'react-helmet'
import MainnavU from './MainnavU'
import { Container, Row, Col } from 'react-bootstrap'
import Form from './Form'

const TITLE = ' User - PMB Universitas Amikom Purwokerto'
class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            //login:false,
            mhs: []
        }
    }

    //componentDidMount = () => {
        //if (sessionStorage.getItem('isLogin')) {
           // console.log('Ok')
           
        //} else {
            //this.setState({
               // login:true
           // })
        //}
        
    //}
    result = (values) => {
        console.log('result is', values);
      }

    render() {
        //if (this.state.login) {
            //return( <Redirect to="/login" /> )
        //}
        
        return (
            <>
                <Helmet>
                <title>{ TITLE }</title>
                
                </Helmet>


                <MainnavU />

                <div className="my-3 mx-3">
                <Container fluid>

                    <Row>
                        <Col md={12}>

                        <Form onSubmit={this.result}/>
                         
                        </Col>
                    </Row>
              
                </Container>
                </div>
    
            </>
        )
    }
}


export default Index
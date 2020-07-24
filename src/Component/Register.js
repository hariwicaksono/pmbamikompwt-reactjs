import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'
import RegisterForm from '../Component/Form/RegisterForm'
import { Helmet } from 'react-helmet'
import {Container, Card, Row, Col} from 'react-bootstrap'

const TITLE = ' Masuk - PMB Universitas Amikom Purwokerto'

class Login extends Component {

    render() {
        
         {/*if (sessionStorage.getItem('isLogin')) {
            return(<Redirect to="/user" />)
        }
        if (sessionStorage.getItem('isAdmin')) {
            return(<Redirect to="/admin" />)
        */}
        

        return (
            <div>
                <Helmet>
                <title>{ TITLE }</title>
                <style type="text/css">{`
                body {
                    background: #653E92 url('') no-repeat center center fixed;-webkit-background-size: cover;
                    -moz-background-size: cover;
                    -o-background-size: cover;
                    background-size: cover;
                }
                `}
                </style>
                </Helmet>
                
                <Container>
                <Row className="justify-content-center my-3 pt-3">
                <Col lg="8">
                <ul className="nav nav-tabs nav-fill bg-white" style={{fontSize: '1.125rem', fontWeight: '600'}}>
                <li className="nav-item">
                    <NavLink className="nav-link" to='/login'>Masuk</NavLink>
                </li>
                <li className="nav-item">
                <NavLink className="nav-link active" to='/register'>Daftar</NavLink>
                </li>

                </ul>

            
                <Card className="bg-white border-0"> 
                <Card.Body>
                <h4 className="mb-3">Daftar Akun <small>PMB Univ. Amikom Purwokerto</small></h4>
                <RegisterForm />
                </Card.Body>
                </Card>

                </Col>
                    </Row>
                </Container>

            </div>
        )
    }

}

export default Login
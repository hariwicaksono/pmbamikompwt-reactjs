import React,{Component} from 'react'
import {Link,Redirect,NavLink } from 'react-router-dom'
import { Container, Row, Col, Navbar, Nav, Button} from 'react-bootstrap'

class Footer extends Component{
    render(){
     
        return(  
            <section className="section section-lg bg-gradient-default">
                
            <div>
            <Container>
            <Row className="text-center justify-content-center mb-5">
                <Col lg="10">
                  <h1 className="text-white"><strong>UNIVERSITAS AMIKOM PURWOKERTO</strong></h1>
                  <h4 className="text-white">
                    "SUCCESS, SPIRIT &amp; CREATIVE"
                  </h4>
                </Col>
              </Row>
            <Row>
                <Col sm={6} md={6}>
                <div>
                <h3 className="text-white">Contact<br/>
                <small className="text-white">Jl. Let. Jend. Pol. Soemarto (depan SPN) Purwokerto<br/>
                Telp: (0281) 623321 / (fax) (0281) 623196<br/>
                Email: amikom@amikompurwokerto.ac.id<br/>
                Whatsapp: 085848888445</small></h3>
                </div>
                </Col>

                <Col sm={6} md={6}>

                </Col>
            </Row>

            <div className="text-white mt-3">© 2020. Universitas Amikom Purwokerto</div>

            </Container>
              
        </div>
        </section>
        )
    }
}

export default Footer
import React,{Component} from 'react'
//import {Link,Redirect } from 'react-router-dom'
import { Container, Row, Col} from 'react-bootstrap'
 
class Footer extends Component{
    render(){
     
        return(  
               
            <div className="text-white border-0 py-5" style={{backgroundColor:'#2C0E4C'}}>
              <Container>
            <Row>
            <Col md={3}>
                <img src="/images/amikom-map.png" className="img-fluid py-3" width="350" alt="" />
                </Col>
                <Col md={6}>
                <h4>Info Kontak</h4>
                <h5>Universitas Amikom Purwokerto<br/>
                <small>Jl. Letjen Pol Soemarto Watumas<br/>
                Purwanegara, Purwokerto, Banyumas 53127<br/>
                Telp: (0281) 623321<br/>
                Whatsapp: 085848888445</small></h5>
                </Col>

                <Col md={3}>
                <h4>Scan Lokasi</h4>
                <img src="/images/amikom-qr.png" className="img-fluid" width="120" alt="" />
                </Col>
            </Row>
           
            <div className="text-white mt-3">© 2020. Universitas Amikom Purwokerto - www.amikompurwokerto.ac.id</div>
            </Container>
            </div>


        )
    }
}

export default Footer
import React,{Component} from 'react'
//import {Link } from 'react-router-dom'
import { Badge, Tabs, Tab, Card, Row, Nav, Col, CardGroup, CardColumns} from 'react-bootstrap'

class TabProdi extends Component{
    render(){
     
        return(   
          <>

          <h3>Program Studi</h3>
          <hr className="mt-2"/>
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
      <Row>
        <Col md={2}>
            <Nav variant="pills" className="flex-column pl-2">
              <Nav.Item>
                <Nav.Link eventKey="first" style={{fontWeight: "600"}}>FIK<br/><small>Fakultas Ilmu Komputer</small></Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second" style={{fontWeight: "600"}}>FBIS<br/><small>Fakultas Bisnis &amp; Ilmu Sosial</small></Nav.Link>
              </Nav.Item>
            </Nav>
        </Col>
        <Col md={10}>
     
        <Tab.Content>
        <Tab.Pane eventKey="first">
        <CardColumns>
            <Card>
              
              <Card.Body>
              <Badge color="danger" variant="danger">FIK</Badge>
                <Card.Title>INFORMATIKA (S1)</Card.Title>
              
                <ul className="pl-3">
                  <li>Robotika</li>
                  <li>Pemrograman Web/Mobile</li>
                  <li>Multimetida/Visualisasi</li>
                </ul>
           
              </Card.Body>

            </Card>
            <Card>
              
              <Card.Body>
              <Badge color="danger" variant="danger">FIK</Badge>
                <Card.Title>SISTEM INFORMASI (S1)</Card.Title>
           
                <ul className="pl-3">
                  <li>E-Business</li>
                  <li>Manajemen Sistem Informasi</li>
                </ul>
             
              </Card.Body>

            </Card>
          
            <Card>
            
              <Card.Body>
              <Badge color="danger" variant="danger">FIK</Badge>
                <Card.Title>TEKNOLOGI INFORMASI</Card.Title>
      
                  <ul className="pl-3">
                    <li>Cyber Security/Forensik</li>
                    <li>Interent of Things (IoT)</li>
                    <li>Animasi dan Game</li>
                  </ul>
               
              </Card.Body>

            </Card>
            
          </CardColumns>
          <a href="http://fik.amikompurwokerto.ac.id" className="btn btn-link btn-block" rel="noopener noreferrer" target="_blank" title="Fakultas Ilmu Komputer" alt="Fakultas Ilmu Komputer">Selengkapnya</a>
       
        </Tab.Pane>

        <Tab.Pane eventKey="second">
        <CardColumns>

        <Card>

          <Card.Body>
          <Badge color="info" variant="info">FBIS</Badge>
            <Card.Title>ILMU KOMUNIKASI (S1)</Card.Title>
          
            <ul className="pl-3">
              <li>Public Relations</li>
              <li>Jurnalistik</li>
              <li>Advertising</li>
            </ul>
          
          </Card.Body>

        </Card>
        <Card>

        <Card.Body>
        <Badge color="info" variant="info">FBIS</Badge>
            <Card.Title>BISNIS DIGITAL (S1)</Card.Title>
            
              <ul className="pl-3">
                <li>Financial Technology</li>
                <li>Business Analyst</li>
              </ul>
        
          </Card.Body>

        </Card>
        <Card>

          <Card.Body>
          <Badge color="info" variant="info">FBIS</Badge>
            <Card.Title>BAHASA INGGRIS (D3/PSDKU)</Card.Title>
          
                <ul className="pl-3">
                  <li>Tourism</li>
                </ul>
            
          </Card.Body>

        </Card>
        </CardColumns>
        <a href="http://fbis.amikompurwokerto.ac.id" target="_blank" rel="noopener noreferrer" className="btn btn-link btn-block" title="Fakultas Bisnis &amp; Ilmu Sosial" alt="Fakultas Bisnis &amp; Ilmu Sosial">Selengkapnya</a>

              </Tab.Pane>
            </Tab.Content>
         
          </Col>
        </Row>
        </Tab.Container>
         
              
        </>
  
        )
    }
}

export default TabProdi
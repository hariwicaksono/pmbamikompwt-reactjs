import React,{Component} from 'react'
import {Link,Redirect,NavLink } from 'react-router-dom'
import { Badge, Tabs, Tab, Card, CardGroup, CardDeck} from 'react-bootstrap'

class TabsProdi extends Component{
    render(){
     
        return(  
            
                
            <div className="bg-white py-4 px-4">

<h2 className="display-3 text-center">FAKULTAS</h2>

            <Tabs defaultActiveKey="fik" id="uncontrolled-tab-example" variant="pills">
            
            <Tab eventKey="fik" title="Ilmu Komputer">
            <CardDeck>
            <Card className="shadow">
              
              <Card.Body>
              <Badge color="danger" variant="danger">FIK</Badge>
                <Card.Title>INFORMATIKA (S1)</Card.Title>
              
                <ul>
                  <li>Robotika</li>
                  <li>Pemrograman Web/Mobile</li>
                  <li>Multimetida/Visualisasi</li>
                </ul>
           
              </Card.Body>

            </Card>
            <Card className="shadow">
              
              <Card.Body>
              <Badge color="danger" variant="danger">FIK</Badge>
                <Card.Title>SISTEM INFORMASI (S1)</Card.Title>
           
                <ul>
                  <li>E-Business</li>
                  <li>Manajemen Sistem Informasi</li>
                </ul>
             
              </Card.Body>

            </Card>
            <Card className="shadow">
            
              <Card.Body>
              <Badge color="danger" variant="danger">FIK</Badge>
                <Card.Title>TEKNOLOGI INFORMASI</Card.Title>
      
                  <ul>
                    <li>Cyber Security/Forensik</li>
                    <li>Interent of Things (IoT)</li>
                    <li>Animasi dan Game</li>
                  </ul>
               
              </Card.Body>

            </Card>
          
          </CardDeck>
          </Tab>
          <Tab eventKey="fbis" title="Bisnis &amp; Ilmu Sosial">
          <CardDeck>

            <Card className="shadow">
            
              <Card.Body>
              <Badge color="info" variant="info">FBIS</Badge>
                <Card.Title>ILMU KOMUNIKASI (S1)</Card.Title>
              
                <ul>
                  <li>Public Relations</li>
                  <li>Jurnalistik</li>
                  <li>Advertising</li>
                </ul>
               
              </Card.Body>

            </Card>
            <Card className="shadow">

            <Card.Body>
            <Badge color="info" variant="info">FBIS</Badge>
                <Card.Title>BISNIS DIGITAL (S1)</Card.Title>
                
                  <ul>
                    <li>Financial Technology</li>
                    <li>Business Analyst</li>
                  </ul>
             
              </Card.Body>

            </Card>
             <Card className="shadow">
  
              <Card.Body>
              <Badge color="info" variant="info">FBIS</Badge>
                <Card.Title>BAHASA INGGRIS (D3/PSDKU)</Card.Title>
               
                    <ul>
                      <li>Tourism</li>
                    </ul>
                
              </Card.Body>

            </Card>
          </CardDeck>
            </Tab>
          </Tabs>

              
        </div>
  
        )
    }
}

export default TabsProdi
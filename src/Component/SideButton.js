import React, { Component } from 'react'
import {Link, NavLink} from 'react-router-dom'
import {CardDeck, Card} from 'react-bootstrap'
import { CursorFill, Building, FileEarmarkText, Grid, Folder, DisplayFill } from 'react-bootstrap-icons'
 
class SideButton extends Component{
    render(){
       
        return(  
            <div className="sticky-bottom sticky-top" style={{backgroundColor: "#482373",paddingRight:"15px"}}>
                <CardDeck className="mb-2">
                   
                    <Card text="light" as={NavLink} to={'/about'} className="text-center mr-0 link-unstyled" style={{backgroundColor:'#753478'}}>
                        <Card.Body>
                        <Card.Title><Grid size={50} style={{color:'#f2f2f2'}}/></Card.Title>
                        <Card.Text style={{fontWeight:'500',lineHeight:'16px'}}>
                            Petunjuk
                        </Card.Text>
                        </Card.Body>
                       
                    </Card>
                  
                    
                    <Card text="light" as={NavLink} to={'/page/18'} className="text-center mr-0 link-unstyled" style={{backgroundColor:'#753478'}} >
                        <Card.Body>
                        <Card.Title><CursorFill size={50} style={{color:'#f2f2f2'}}/></Card.Title>
                        <Card.Text style={{fontSize:'.875rem',fontWeight:'500',lineHeight:'16px'}}>
                            Jalur Penerimaan
                        </Card.Text>
                        </Card.Body>
                       
                    </Card>
                    
                    </CardDeck>
                    
                    <CardDeck className="mb-2">
                   
                        <Card text="light" as={NavLink} to={'/about'} className="text-center mr-0 link-unstyled" style={{backgroundColor:'#753478'}}>
                        <Card.Body>
                        <Card.Title><Building size={50} style={{color:'#f2f2f2'}}/></Card.Title>
                        <Card.Text style={{fontSize:'.875rem',fontWeight:'500',lineHeight:'16px'}}>
                           Fakultas &amp; Program Studi
                        </Card.Text>
                        </Card.Body>
                       
                    </Card>
                  
                  
                    <Card text="light" as={NavLink} to={'/about'} className="text-center mr-0 link-unstyled" style={{backgroundColor:'#753478'}}>
                        <Card.Body>
                        <Card.Title><FileEarmarkText size={50} style={{color:'#f2f2f2'}}/></Card.Title>
                        <Card.Text style={{fontSize:'.875rem',fontWeight:'500',lineHeight:'16px'}}>
                            Biaya Pendidikan
                        </Card.Text>
                        </Card.Body>
                       
                    </Card>
                    
                    </CardDeck>
                    
                    <CardDeck className="mb-2">
                   
                        <Card text="light" as={NavLink} to={'/page/30/'} className="text-center mr-0 link-unstyled" style={{backgroundColor:'#753478'}}>
                        <Card.Body>
                        <Card.Title><Folder size={50} style={{color:'#f2f2f2'}}/></Card.Title>
                        <Card.Text style={{fontWeight:'500',lineHeight:'16px'}}>
                            Beasiswa
                        </Card.Text>
                        </Card.Body>
                       
                    </Card>
                  
                  
                    <Card text="light" as={NavLink} to={'/about'} className="text-center mr-0 link-unstyled" style={{backgroundColor:'#753478'}}>
                        <Card.Body>
                        <Card.Title><DisplayFill size={50} style={{color:'#f2f2f2'}}/></Card.Title>
                        <Card.Text style={{fontWeight:'500',lineHeight:'16px'}}>
                           Fasilitas
                        </Card.Text>
                        </Card.Body>
                       
                    </Card>
                    
                    </CardDeck>
                    </div>
        )
    }
}
 
export default SideButton
import React,{Component} from 'react'
import {Link,Redirect,NavLink} from 'react-router-dom'
import API from '../../ServiceApi/Index'
import { Navbar, Nav, NavItem} from 'react-bootstrap'
import { HouseDoorFill, GridFill, PersonFill, FilePostFill } from 'react-bootstrap-icons'

class Appbar extends Component{


    render(){
  
        
        return(
            <div className="pt-5 mt-4">
              
              
              <Navbar id="appbar" bg="light" fixed="bottom" sticky="bottom" style={{height:'60px'}}>
              
              <Nav className="mx-auto text-center">

              <NavItem className="navItem">
                <NavLink className="nav-link" to="/user" activeClassName="active" exact><HouseDoorFill size="20"/><br/>Home</NavLink>
              </NavItem>
              <NavItem className="navItem">
                <NavLink className="nav-link" to="/about" activeClassName="active"><GridFill size="20"/><br/>Panduan</NavLink>
              </NavItem>

              <NavItem className="navItem">
                <NavLink className="nav-link" to="/pendaftaran" activeClassName="active"><FilePostFill size="20"/><br/>Pendaftaran</NavLink>
              </NavItem>
              
              <NavItem className="navItem">
                <NavLink className="nav-link" to="/akun/profil" activeClassName="active"><PersonFill size="20"/><br/>Akun</NavLink>
              </NavItem>

                </Nav>
           
        
          
            </Navbar>
       
        
        </div>
        )
    }
}

export default Appbar
import React,{Component} from 'react'
import {Link,Redirect,NavLink} from 'react-router-dom'
import { Container, Row, Col, Navbar, Nav, NavItem, Button} from 'react-bootstrap'
import { HouseDoorFill, GridFill, PersonFill, PersonPlusFill } from 'react-bootstrap-icons'

class Appbar extends Component{

    render(){
        if (sessionStorage.getItem('isLogin')) {
            return(<Redirect to="/user" />)
        }
        if (sessionStorage.getItem('isAdmin')) {
            return(<Redirect to="/admin" />)
        }
        
        return(
            <div className="pt-4 mt-4">
              
              
              <Navbar bg="light" fixed="bottom" sticky="bottom" style={{height:'60px'}}>
              
              <Nav className="mx-auto text-center">

              <NavItem className="navItem">
                <NavLink className="nav-link" to="/" activeClassName="active" exact><HouseDoorFill size="20"/><br/>Home</NavLink>
              </NavItem>
              <NavItem className="navItem">
                <NavLink className="nav-link" to="/about" activeClassName="active"><GridFill size="24"/><br/>Panduan</NavLink>
              </NavItem>
              <NavItem className="navItem">
                <NavLink className="nav-link" to="/register" activeClassName="active"><PersonPlusFill size="20"/><br/>Daftar</NavLink>
              </NavItem>
              <NavItem className="navItem">
                <NavLink className="nav-link" to="/login" activeClassName="active"><PersonFill size="20"/><br/>Akun</NavLink>
              </NavItem>

                </Nav>
           
        
          
            </Navbar>
       
        
        </div>
        )
    }
}

export default Appbar
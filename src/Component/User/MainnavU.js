import React,{Component} from 'react'
import {NavLink} from 'react-router-dom'
import API from '../../ServiceApi/Index'
import {Nav, Navbar, NavDropdown} from 'react-bootstrap'

class Mainnav extends Component{

    render(){
  
        
        return(
      
        <Navbar bg="secondary" variant="light" expand="lg" className="navbar2 pt-0 pb-0">

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
                <Navbar.Toggle className="navbar-toggler float-right" aria-controls="basic-navbar-nav">
                    <span />
                    <span />
                </Navbar.Toggle>
    <Nav className="mr-auto">
    <NavLink className="nav-link" to="/user" activeClassName="active" exact>Dashboard</NavLink>
      <Nav.Link href="#link">Pendaftaran</Nav.Link>
      <Nav.Link href="#link">Upload Document</Nav.Link>
      <Nav.Link href="#link">Informasi</Nav.Link>
      <NavLink className="nav-link" to="/akun/profil" activeClassName="active">Akun</NavLink>
    </Nav>
  </Navbar.Collapse>
</Navbar>

        )
    }
}

export default Mainnav
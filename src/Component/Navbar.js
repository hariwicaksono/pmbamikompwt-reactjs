import React,{Component} from 'react'
import {Link,Redirect} from 'react-router-dom'
import { Navbar, Nav, NavDropdown, Button} from 'react-bootstrap'

class NavBar extends Component{
    render(){
        if (sessionStorage.getItem('isLogin')) {
            return(<Redirect to="/user" />)
        }
        if (sessionStorage.getItem('isAdmin')) {
            return(<Redirect to="/admin" />)
        }
        return(  
              
              <Navbar variant="dark" expand="lg" style={{backgroundColor:'#371260'}}>
              <Navbar.Brand as={Link} to='/'> 
              <img
                src="/logo.png"
                width="200"
                className="d-inline-block align-center"
                alt="Logo"
                />
                
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                
                </Nav>
                
                <Nav inline="true">
                <Nav.Link as={Link} to='/' exact="true">Home</Nav.Link>
                <NavDropdown title="Menu Utama" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to='/page/14'>Jenis Pendaftaran</NavDropdown.Item>
                <NavDropdown.Item as={Link} to='/page/34'>Syarat Pendaftaran</NavDropdown.Item>
                <NavDropdown.Item as={Link} to='/page/18'>Prosedur Pendaftaran</NavDropdown.Item>
                <NavDropdown.Item as={Link} to='/page/31'>Alur Pendaftaran</NavDropdown.Item>
                <NavDropdown.Item as={Link} to='/page/30/'>Beasiswa</NavDropdown.Item>
                
              </NavDropdown>
              <NavDropdown title="Direktori PSU &amp; Kuliah Umum" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to='/page/19'>Kegiatan Pra Kuliah</NavDropdown.Item>
                <NavDropdown.Item as={Link} to='/page/21'>Tata Tertib Mahasiswa Baru</NavDropdown.Item>
                <NavDropdown.Item as={Link} to='/page/32'>Jadwal Kegiatan</NavDropdown.Item>
                <NavDropdown.Item as={Link} to='/page/34'>Perlengkapan</NavDropdown.Item>
                
              </NavDropdown>
                <Nav.Link as={Link} to='/page/33'>FAQ</Nav.Link>
                {/*<Nav.Link as={Link} to='/register'><Button variant="info" size="sm">Daftar</Button></Nav.Link>
                <Nav.Link as={Link} to='/login'><Button variant="warning" size="sm">Masuk</Button></Nav.Link>*/}
                </Nav>

              </Navbar.Collapse>
            </Navbar>
            
        )
    }
}

export default NavBar
import React,{Component} from 'react'
import {Link, Redirect, NavLink} from 'react-router-dom'
import PeriksaForm from './Form/PeriksaForm'
import {Form,Button, Navbar, Nav, NavItem, NavDropdown} from 'react-bootstrap'
import {TextLeft} from 'react-bootstrap-icons'
 
class NavBar extends Component{
    
    render(){
      /* if (sessionStorage.getItem('isLogin')) {
            return(<Redirect to="/user" />)
        }
        if (sessionStorage.getItem('isAdmin')) {
            return(<Redirect to="/admin" />)
        }*/
        
        return(  
              
        <Navbar variant="dark" expand="lg" sticky="top" style={{backgroundColor:'#371260'}}>

        <Button onClick={this.props.toggleMenu} type="button" className="btn btn-warning">
        <TextLeft size="20" />
        </Button>
    
            <Navbar.Brand as={Link} className="mx-auto" to='/'> 
            <img src="/logo.png" width="180" className="img-fluid" alt="Logo Amikom Purwokerto" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">

              <Nav className="mr-auto">
             
              <NavItem className="navItem">
             <NavLink className="nav-link" to='/' activeClassName="active" exact>Home</NavLink>
            </NavItem>
             <NavDropdown title="Menu Utama" id="basic-nav-dropdown">
             <NavDropdown.Item as={Link} to='/page/14'>Jenis Pendaftaran</NavDropdown.Item>
             <NavDropdown.Item as={Link} to='/page/34'>Syarat Pendaftaran</NavDropdown.Item>
             <NavDropdown.Item as={Link} to='/page/18'>Prosedur Pendaftaran</NavDropdown.Item>
             <NavDropdown.Item as={Link} to='/page/30'>Beasiswa</NavDropdown.Item>
             <NavDropdown.Item as={Link} to='/page/31'>Alur Pendaftaran</NavDropdown.Item>
             <NavDropdown.Item as={Link} to='/page/19'>Kegiatan Pra Kuliah Mahasiswa Baru</NavDropdown.Item>
             <NavDropdown.Item as={Link} to='/page/21'>Tata Tertib Penerimaan Mahasiswa Baru</NavDropdown.Item>
             
           </NavDropdown>
           
             </Nav>
            
            <PeriksaForm />

            <Nav className="ml-auto">
            <NavItem className="navItem">
            <NavLink className="nav-link" to='/page/33' activeClassName="active">FAQ</NavLink>
           </NavItem>
            
            </Nav>
           
           <Form inline>

           <Button as={Link} to='/login' className="btn btn-info py-1" style={{fontWeight: '600'}}>Daftar/Masuk</Button>
           </Form>
            
              </Navbar.Collapse>
            </Navbar>
            
        )
    }
}

export default NavBar
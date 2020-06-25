import React, { Component } from 'react'
import {Link,Redirect} from 'react-router-dom'
import API from '../../ServiceApi/Index'
import { Navbar, Nav, NavDropdown, Button} from 'react-bootstrap'
import { NotificationManager } from 'react-notifications'
import { BoxArrowRight } from 'react-bootstrap-icons'

class NavbarU extends Component {
    constructor(props){
        super(props)
        this.state = {
            login:false,
            id: '',
            nama: ''
        }
    }
 
    Logout = () => {
        sessionStorage.setItem('isLogin','')
        sessionStorage.clear()
        this.setState({
            login:true
        })
        NotificationManager.success('Berhasil keluar sistem');

    }

    componentDidMount = () => {
        const data = JSON.parse(sessionStorage.getItem('isLogin'))
        const id = data[0].username
        API.GetUserId(id).then(res=>{
            this.setState({
                id : res.username,
                nama: res.nama,
                
            })
        })
        if (sessionStorage.getItem('isLogin')) {
           // console.log('Ok')
        } else {
            this.setState({
                login:true
            })
        }
    }

    render() {
        if (this.state.login) {
            return( <Redirect to="/login" /> )
        }
        return (
            <div>
            <Navbar variant="dark" expand="lg" style={{backgroundColor:'#482373', marginBottom:'12px'}}>
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
                <Nav.Link as={Link} to='/user' exact="true">Home</Nav.Link>
                <NavDropdown title="Menu Utama" id="basic-nav-dropdown">
                <NavDropdown.Item href='/pageU/14'>Jenis Pendaftaran</NavDropdown.Item>
                <NavDropdown.Item href='/pageU/34'>Syarat Pendaftaran</NavDropdown.Item>
                <NavDropdown.Item href='/pageU/18'>Prosedur Pendaftaran</NavDropdown.Item>
                <NavDropdown.Item href='/pageU/19'>Kegiatan Pra Kuliah Mahasiswa Baru</NavDropdown.Item>
                <NavDropdown.Item href='/pageU/21'>Tata Tertib Penerimaan Mahasiswa Baru</NavDropdown.Item>
                <NavDropdown.Item href='/pageU/30'>Beasiswa</NavDropdown.Item>
                <NavDropdown.Item href='/pageU/31'>Alur Pendaftaran</NavDropdown.Item>
                <NavDropdown.Item href='/pageU/31'>Calon Mahasiswa</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Direktori PSU &amp; Kuliah Umum" id="basic-nav-dropdown">
                <NavDropdown.Item href='/pageU/32'>Jadwal Kegiatan</NavDropdown.Item>
                <NavDropdown.Item href='/pageU/34'>Perlengkapan</NavDropdown.Item>
                
              </NavDropdown>
                <Nav.Link href='/pageU/33'>FAQ</Nav.Link>

                <NavDropdown title={'Halo, '+this.state.nama} id="basic-nav-dropdown">
                <NavDropdown.Item onClick={this.Logout} href=''><BoxArrowRight/> Keluar</NavDropdown.Item>

                </NavDropdown>
            
               
                </Nav>

              </Navbar.Collapse>

            </Navbar>
               
              
   
 
            </div>
        )
    }
}

export default NavbarU
import React,{Component} from 'react'
import {Link, NavLink} from 'react-router-dom'
import PeriksaForm from '../Pages/Home/PeriksaForm'
import API from '../ServiceApi/Index'
import {Form,Button, Navbar, Nav, NavItem, NavDropdown} from 'react-bootstrap'
import {TextLeft, BoxArrowRight, PersonFill} from 'react-bootstrap-icons'
import { logout, isLogin } from '../Utils'
 
class NavBar extends Component{
  constructor(props) {
    super(props)
    this.state = {
        login:false,
        id: '',
        nama: ''
        
    }
    
  }
  Logout = () => {
    logout();
    //sessionStorage.setItem('isLogin','');
    //sessionStorage.clear();
    //this.setState({
        //login:true
    //})
    
    //NotificationManager.success('Berhasil keluar sistem');
    
}
  componentDidMount = () => {
    if (isLogin()) {
       console.log('LOGIN')
       const data = JSON.parse(sessionStorage.getItem('isLogin'))
            const id = data[0].username
            API.GetUserId(id).then(res=>{
                this.setState({
                    id : res.username,
                    nama: res.nama, 
                })
            })
            
    } else {
        this.setState({
            login:true
        })
    }
}

    render(){

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
              {this.state.login ?
                <NavItem className="navItem">
                <NavLink className="nav-link" to='/' activeClassName="active" exact>Home</NavLink>
               </NavItem>
              :

              <NavItem className="navItem">
              <NavLink className="nav-link" to='/user' activeClassName="active" exact>Home</NavLink>
             </NavItem>
              }

             <NavDropdown title="Menu Utama" id="basic-nav-dropdown">
             <NavDropdown.Item as={Link} to='/page/14'>Jenis Pendaftaran</NavDropdown.Item>
             <NavDropdown.Item as={Link} to='/page/34'>Syarat Pendaftaran</NavDropdown.Item>
             <NavDropdown.Item as={Link} to='/page/18'>Prosedur Pendaftaran</NavDropdown.Item>
             <NavDropdown.Item as={Link} to='/page/31'>Alur Pendaftaran</NavDropdown.Item>
             <NavDropdown.Item as={Link} to='/page/30'>Beasiswa - Beasiswa</NavDropdown.Item>
             <NavDropdown.Item as={Link} to='/page/21'>Tata Tertib Penerimaan Mahasiswa Baru</NavDropdown.Item>
             <NavDropdown.Item as={Link} to='/page/19'>Kegiatan Pra Kuliah Mahasiswa Baru</NavDropdown.Item>
           </NavDropdown>
           
             </Nav>
            
            <PeriksaForm />

            <Nav className="ml-auto">
            <NavItem className="navItem">
            <NavLink className="nav-link" to='/page/33' activeClassName="active">FAQ</NavLink>
           </NavItem>
            
            </Nav>


            {this.state.login ?

           <Form inline>

           <Button as={Link} to='/login' className="btn btn-secondary btn-sm py-2" style={{fontWeight: '700'}}>Daftar/Masuk</Button>
           </Form>
           :
          <Nav>
           <NavDropdown title={this.state.nama} id="basic-nav-dropdown">
           <NavDropdown.Item as={Link} to={'/akun/edit/' + this.state.id}><PersonFill/> Akun</NavDropdown.Item>
                <NavDropdown.Item onClick={this.Logout} href=''><BoxArrowRight/> Keluar</NavDropdown.Item>

                </NavDropdown>
                </Nav>
            }
              </Navbar.Collapse>
            </Navbar>
            
        )
    }
}

export default NavBar
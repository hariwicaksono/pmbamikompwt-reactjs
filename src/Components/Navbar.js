import React,{Component} from 'react'
import {Link, NavLink} from 'react-router-dom'
import PeriksaForm from './PeriksaForm'
import API from '../ServiceApi/Index'
import {Container, Form,Button, Navbar, Nav, NavItem, NavDropdown} from 'react-bootstrap'
import {TextLeft, BoxArrowRight, PersonFill, QuestionCircle} from 'react-bootstrap-icons'
import { logout, isLogin } from '../Utils'
  
class Navigation extends Component{
  constructor(props) {
    super(props)
    this.state = {
        login:false,
        id: '',
        nama: '',
        foto:'',
        url: 'http://localhost/pmbamikompwt-server/assets/img/'
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
                    foto: res.foto,
                })
            })
            
    } else {
        this.setState({
            login:true
        })
    }
    }

    render(){
        //const navDropdownTitle = (<> Test Dropdown </>);
        return(  
        <Container className="px-0" fluid style={{backgroundColor:'#371260'}}>

        <Navbar className="shadow-sm" variant="dark" expand="lg" sticky="top">

        <Button onClick={this.props.toggleMenu} type="button" className="btn btn-warning btn-sm text-dark">
            <TextLeft size="20" />
        </Button>
    
        <Navbar.Brand as={Link} to='/'> 
            <img src="/logo.png" width="200" className="img-fluid" alt="Logo Amikom Purwokerto" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">

            <Nav>  
            {this.state.login ?
               <>
               </>
               :
               <NavDropdown title={'Menu User'} id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to='/user'>Dashboard</NavDropdown.Item>
                <NavDropdown.Item as={Link} to='/user/pendaftaran'>Form Pendaftaran</NavDropdown.Item>
                <NavDropdown.Item as={Link} to='/user/dokumen'>Upload Dokumen</NavDropdown.Item>
                <NavDropdown.Item as={Link} to={'/akun/edit/' + this.state.id}>Akun</NavDropdown.Item>
           </NavDropdown>
            }    

            <NavDropdown title="Menu Utama" id="basic-nav-dropdown">
             <NavDropdown.Item as={Link} to='/page/31'>Alur Pendaftaran</NavDropdown.Item>
             <NavDropdown.Item as={Link} to='/page/14'>Jenis Pendaftaran</NavDropdown.Item>
             <NavDropdown.Item as={Link} to='/page/34'>Syarat Pendaftaran</NavDropdown.Item>
             <NavDropdown.Item as={Link} to='/page/18'>Prosedur Pendaftaran</NavDropdown.Item>
             
             <NavDropdown.Item as={Link} to='/page/30'>Beasiswa - Beasiswa</NavDropdown.Item>
             <NavDropdown.Item as={Link} to='/page/21'>Tata Tertib Penerimaan Mahasiswa Baru</NavDropdown.Item>
             <NavDropdown.Item as={Link} to='/page/19'>Kegiatan Pra Kuliah Mahasiswa Baru</NavDropdown.Item>
            </NavDropdown>

           </Nav>    

            <PeriksaForm />
    
            <Nav>
            
            <Nav.Link as={NavLink} to='/page/33' activeClassName="active" title="Kenapa Amikom?" alt="Kenapa Amikom?" style={{paddingTop: '11px'}}><QuestionCircle size="22" /></Nav.Link>
            {this.state.login ?
            <>
            <Form inline>
            <Button as={NavLink} variant="info" size="sm" to='/login' activeClassName="active" style={{fontWeight: '600',paddingTop:'8px',paddingBottom:'8px'}}>Daftar/Masuk</Button>
            </Form>
            </>
           :
           <NavItem>
           <NavDropdown title=
           {this.state.foto > 0 ? (
            <>
            <img
                alt="Foto"
                width="30"
                className="rounded-circle"
                src={this.state.url+this.state.foto} />
            </>
                ) : (
            <>
            <img
                alt="Foto"
                width="30"
                className="rounded-circle"
                src={this.state.url+'no-photo.jpg'} />
            </>
            )} id="basic-nav-dropdown" alignRight>
            <NavDropdown.Item as={Link} to={'/akun/edit/' + this.state.id}><PersonFill/> Akun</NavDropdown.Item>
            <NavDropdown.Item onClick={this.Logout} href=''><BoxArrowRight/> Keluar</NavDropdown.Item>
            </NavDropdown>
            </NavItem>
            }
            </Nav>

        </Navbar.Collapse>
        </Navbar>
        
        </Container>
        )
    }
}

export default Navigation
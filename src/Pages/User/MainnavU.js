import React,{Component} from 'react'
import {NavLink} from 'react-router-dom'
import {Nav, Navbar} from 'react-bootstrap'
import { isLogin } from '../../Utils'
import API from '../../ServiceApi/Index'

class Mainnav extends Component{
  constructor(props) {
    super(props)
    this.state = {
        login:false,
        id: '',   
    }
    
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
      
        <Navbar bg="light" variant="light" expand="lg" className="py-1">

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        {/*<Navbar.Toggle className="navbar-toggler float-right" aria-controls="basic-navbar-nav">
            <span />
            <span />
        </Navbar.Toggle>*/}
          <Nav className="mr-auto">
            <NavLink className="nav-link" to="/user" activeClassName="active" exact>Dashboard</NavLink>
            <NavLink className="nav-link" to="/user/pendaftaran" activeClassName="active">Pendaftaran</NavLink>
            <NavLink className="nav-link" to="/user/dokumen" activeClassName="active">Upload Dokumen</NavLink>
            <NavLink className="nav-link" to={'/akun/edit/' + this.state.id} activeClassName="active" exact>Akun</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

        )
    }
}

export default Mainnav
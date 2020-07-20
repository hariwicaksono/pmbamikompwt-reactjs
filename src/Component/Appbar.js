import React,{Component} from 'react'
import {Link,Redirect,NavLink} from 'react-router-dom'
import { Navbar, Nav, NavItem} from 'react-bootstrap'
import { HouseDoorFill, GridFill, PersonFill, PersonPlusFill, FilePostFill } from 'react-bootstrap-icons'

class Appbar extends Component{
  constructor(props) {
    super(props)
    this.state = {
        login:false,
        id: '',
        nama: ''
        
    }
  }
  componentDidMount = () => {
    if (sessionStorage.getItem('isLogin')) {
       // console.log('Ok')
    } else {
        this.setState({
            login:true
        })
    }
}
    render(){
        /*if (sessionStorage.getItem('isLogin')) {
            return(<Redirect to="/user" />)
        }
        if (sessionStorage.getItem('isAdmin')) {
            return(<Redirect to="/admin" />)
        }*/
        
        return(
            <div className="pt-4 mt-4">
              
              <Navbar id="appbar" variant="dark" fixed="bottom" sticky="bottom" style={{backgroundColor:'#371260',height:'60px'}}>
              
              <Nav className="mx-auto text-center">

              {this.state.login ?
               <NavItem className="navItem">
               <NavLink className="nav-link" to="/" activeClassName="active" exact><HouseDoorFill size="20"/><br/>Home</NavLink>
             </NavItem>
              :

              <NavItem className="navItem">
                <NavLink className="nav-link" to="/user" activeClassName="active" exact><HouseDoorFill size="20"/><br/>Home</NavLink>
              </NavItem>
              }
              
              <NavItem className="navItem">
                <NavLink className="nav-link" to="/page/37" activeClassName="active"><GridFill size="20"/><br/>Petunjuk</NavLink>
              </NavItem>
              
              {this.state.login ?
              <NavItem className="navItem">
                <NavLink className="nav-link" to="/login" activeClassName="active"><PersonFill size="20"/><br/>Akun</NavLink>
              </NavItem>
              :
              <NavItem className="navItem">
                <NavLink className="nav-link" to="/akun/profil" activeClassName="active"><PersonFill size="20"/><br/>Akun</NavLink>
              </NavItem>
              }
              {this.state.login ?
              <NavItem className="navItem">
                <NavLink className="nav-link" to="/register" activeClassName="active"><PersonPlusFill size="20"/><br/>Daftar</NavLink>
              </NavItem>
              :
              <NavItem className="navItem">
                <NavLink className="nav-link" to="/pendaftaran" activeClassName="active"><FilePostFill size="20"/><br/>Pendaftaran</NavLink>
              </NavItem>
              }
              </Nav>

            </Navbar>
       
        
        </div>
        )
    }
}

export default Appbar
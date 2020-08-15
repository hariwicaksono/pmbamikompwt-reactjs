import React,{Component} from 'react'
import {NavLink} from 'react-router-dom'
import { Navbar, Nav, NavItem} from 'react-bootstrap'
import { HouseDoorFill, GridFill, PersonFill, PersonPlusFill, FilePostFill } from 'react-bootstrap-icons'
import { isLogin } from '../Utils'

class Appbar extends Component{
  constructor(props) {
    super(props)
    this.state = {
        login:false,
        id: ''  
    }
  }
  componentDidMount = () => {
    if (isLogin()) {
       // console.log('Ok')
       const data = JSON.parse(sessionStorage.getItem('isLogin'))
       this.setState({
        id : data[0].username
       })
    } else {
        this.setState({
            login:true
        })
    }
}
    render(){
        
        return(
            <div className="pt-4 mt-4 d-xs-block d-sm-block d-md-block d-lg-none d-xl-none">
              
              <Navbar id="appbar" className="border-top" variant="light" fixed="bottom" sticky="bottom" style={{backgroundColor:'#fafafa',height:'60px'}}>
              
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
                <NavLink className="nav-link" to={'/akun/edit/' + this.state.id} activeClassName="active"><PersonFill size="20"/><br/>Akun</NavLink>
              </NavItem>
              }
              {this.state.login ?
              <NavItem className="navItem">
                <NavLink className="nav-link" to="/register" activeClassName="active"><PersonPlusFill size="20"/><br/>Daftar</NavLink>
              </NavItem>
              :
              <NavItem className="navItem">
                <NavLink className="nav-link" to="/pendaftaran" activeClassName="active"><FilePostFill size="20"/><br/>Form</NavLink>
              </NavItem>
              }
              </Nav>

            </Navbar>
       
        
        </div>
        )
    }
}

export default Appbar
import React,{Component} from 'react'
import {Link,Redirect,NavLink} from 'react-router-dom'
import API from '../../ServiceApi/Index'
import { Container, Row, Col, Navbar, Nav, NavItem, Button} from 'react-bootstrap'
import { HouseDoorFill, GridFill, PersonFill } from 'react-bootstrap-icons'

class Appbar extends Component{
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            nama: ''
            
        }
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
    }
    render(){
  
        
        return(
            <div className="pt-4 mt-4">
              
              
              <Navbar bg="light" fixed="bottom" sticky="bottom" style={{height:'60px'}}>
              
              <Nav className="mx-auto text-center">

              <NavItem className="navItem">
                <NavLink className="nav-link" to="/user" activeClassName="active" exact><HouseDoorFill size="20"/><br/>Home</NavLink>
              </NavItem>
              <NavItem className="navItem">
                <NavLink className="nav-link" to="/about" activeClassName="active"><GridFill size="24"/><br/>Panduan</NavLink>
              </NavItem>
              
              <NavItem className="navItem">
                <NavLink className="nav-link" to="/akunU" activeClassName="active"><PersonFill size="20"/><br/>Akun</NavLink>
              </NavItem>

                </Nav>
           
        
          
            </Navbar>
       
        
        </div>
        )
    }
}

export default Appbar
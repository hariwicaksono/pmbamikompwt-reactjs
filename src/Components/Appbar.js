import React,{Component} from 'react'
import {NavLink} from 'react-router-dom'
import { Nav } from 'react-bootstrap'
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
            
              
              <Nav id="appbar" fill className="mx-auto text-center border-top" style={{backgroundColor:"#fafafa",height:"60px", position: "fixed",width: "100%",left: "0",bottom: "0"}}>

              {this.state.login ?
               <Nav.Item>
               <Nav.Link as={NavLink} to="/" activeClassName="active" exact><HouseDoorFill size="24"/><div>Home</div></Nav.Link>
             </Nav.Item>
              :

              <Nav.Item>
                <Nav.Link as={NavLink} to="/user" activeClassName="active" exact><HouseDoorFill  size="24"/><div>Home</div></Nav.Link>
              </Nav.Item>
              }
              
              <Nav.Item>
                <Nav.Link as={NavLink} to="/page/37" activeClassName="active"><GridFill size="24"/><div>Menu</div></Nav.Link>
              </Nav.Item>
              
              {this.state.login ?
              <Nav.Item>
                <Nav.Link as={NavLink} to="/login" activeClassName="active"><PersonFill size="24"/><div>Akun</div></Nav.Link>
              </Nav.Item>
              :
              <Nav.Item>
                <Nav.Link as={NavLink} to={'/akun/edit/' + this.state.id} activeClassName="active"><PersonFill size="24"/><div>Akun</div></Nav.Link>
              </Nav.Item>
              }
              {this.state.login ?
              <Nav.Item>
                <Nav.Link as={NavLink} to="/register" activeClassName="active"><PersonPlusFill size="24"/><div>Daftar</div></Nav.Link>
              </Nav.Item>
              :
              <Nav.Item>
                <Nav.Link as={NavLink} to="/user/pendaftaran" activeClassName="active"><FilePostFill size="24"/><div>Form</div></Nav.Link>
              </Nav.Item>
              }
              </Nav>
        
        </div>
        )
    }
}

export default Appbar
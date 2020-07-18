import React, { Component } from 'react'
import {Link,Redirect} from 'react-router-dom'
import Navbar from '../../Component/Navbar'
import NavbarU from '../../Component/User/NavbarU'
import Appbar from '../../Component/Appbar'
import Sidebar from '../../Component/Sidebar'
import { Helmet } from 'react-helmet'
import MyRouter from '../../Routes'

const TITLE = 'PMB Universitas Amikom Purwokerto'

class Home extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            showMenu: true
        }

        this.toggleMenu = this.toggleMenu.bind(this)
    }

    toggleMenu = function() {
        this.setState({ showMenu: !this.state.showMenu });
      }

      componentDidMount = () => {
        
        if (sessionStorage.getItem('isLogin')) {
           this.setState({
            login:true
            })
        } else {
            this.setState({
                login:false
            })
        }
    }

    render() {

        return (
            
            <div>
                <Helmet>
                <title>{ TITLE }</title>
                <style type="text/css">{`
                body {
                    background-color: #fff;
                }
                `}
                </style>
                </Helmet>

{!this.state.login ?
    <Navbar toggleMenu={this.toggleMenu} />
:

<NavbarU toggleMenu={this.toggleMenu} />
}
                
                
                <div className="wrapper">
                    
                <Sidebar showMenu={this.state.showMenu} />

                <div id="content">

                <MyRouter/>
 
                </div>
                </div>
            
            <Appbar />
            </div>
        )
    }
}

export default Home
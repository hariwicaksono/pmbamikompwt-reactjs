import React, { Component } from 'react'
//import {Redirect,NavLink,Link} from 'react-router-dom'
//import API from '../../ServiceApi/Index'
import { Helmet } from 'react-helmet'
//import MainnavU from './MainnavU'
import { Card, Container } from 'react-bootstrap'
import Form from './Form'

const TITLE = ' User - PMB Universitas Amikom Purwokerto'
class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            //mhs: []
        }
    }

    //componentDidMount = () => {
        //if (sessionStorage.getItem('isLogin')) {
           // console.log('Ok')
           
        //} else {
            //this.setState({
               // login:true
           // })
        //}
        
    //}

    render() {
        
        return (
            <>
                <Helmet>
                <title>{ TITLE }</title>
                
                </Helmet>

                <div className="mx-2 my-3">
                <Container fluid>
                
                <Form />

                </Container>
                </div>
    
            </>
        )
    }
}


export default Index
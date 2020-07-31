import React, { Component } from 'react'
//import {Redirect,Link} from 'react-router-dom'
import API from '../../ServiceApi/Index'
import SearchResult from './SearchResult'
//import { NotificationManager } from 'react-notifications'
import { Form, Button, Col, Spinner } from 'react-bootstrap'
import {Search} from 'react-bootstrap-icons'
//import Form from 'react-formal'
//import * as yup from 'yup'

//const schema = yup.object({
    //query: yup.string().required(),
  //}); 

class LoginForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            query: '',
            results: [],
            loading: false
        }
        this.handlerChange = this.handlerChange.bind(this)
        this.handlerSubmit = this.handlerSubmit.bind(this)
        
    }

    handlerChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handlerSubmit = (e) => {
        e.preventDefault();
        this.setState({ loading: true });
        const query=this.state.query;
        API.CariOrang(query).then(res=>{
            console.log(res)
            setTimeout(() => this.setState({
              results: res,
              loading: false,
            }), 100);
        });  
    }

    
    render() {

        return (
            <>
        
                <Form className="w-50" onSubmit={this.handlerSubmit} style={{paddingRight: '15px'}} >
                <Form.Row>
                <Col lg={10} md={10} xs={10}>
                        <Form.Control type="text" name="query" placeholder="Cari Nama atau Nomor Daftar..." onChange={this.handlerChange} required/>
                       
                 </Col>
                <Col>
                    <Button type="submit" variant="warning">
                    {
                        this.state.loading
                        ?
                        <><Spinner as="span" animation="border" size="sm"  role="status" aria-hidden="true" /></>
                        :   
                    <><Search size="18" /></>}
                    </Button>
                    
                    </Col>
                </Form.Row>

                {this.state.results.length > 0 && (
                
                <SearchResult data={this.state.results} />

               )}

               
                </Form>   


          
                       
  
            </>
        )
    }

}

export default LoginForm
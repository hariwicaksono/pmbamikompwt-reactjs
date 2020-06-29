import React, { Component } from 'react'
import {Redirect,Link} from 'react-router-dom'
import API from '../../ServiceApi/Index'
import SearchResult from './SearchResult'
import { NotificationManager } from 'react-notifications'
import { FormGroup, Spinner } from 'react-bootstrap'
import {PersonPlus, Search} from 'react-bootstrap-icons'
import Form from 'react-formal'
import * as yup from 'yup'

const schema = yup.object({
    query: yup.string().required(),
  }); 
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

    handlerSubmit = () => {
        this.setState({ loading: true });
        const query=this.state.query
        API.CariOrang(query).then(res=>{
            setTimeout(() => this.setState({
              results: res,
              loading: false,
            }), 100);
        })
       
    }

    
    render() {

        return (
            <div>
        
                <Form onSubmit={this.handlerSubmit} schema={schema}>
                   
                    <FormGroup>
                        <Form.Field type="text" name="query" placeholder="Nomor Pendaftaran" className="form-control" onChange={this.handlerChange} />
                        <Form.Message for="query" className="error" />
                    </FormGroup>
                    
                    <Form.Submit type="submit" className="btn btn-success btn-block">
                    {
                        this.state.loading
                        ?
                        <><Spinner as="span" animation="border" size="sm"  role="status" aria-hidden="true" /> Memuat...</>
                        :   
                    <><Search size="16" /> Lihat Hasil</>}</Form.Submit>
                    <Link to="/register" className="btn btn-default btn-block"><PersonPlus size="16" /> Daftar Akun</Link>
                </Form>   
                
                {this.state.results.length > 0 ? (
                 
                 <SearchResult data={this.state.results} />
                
                ): (
                    <div>
                
                    </div>  
                )}                           
  
            </div>
        )
    }

}

export default LoginForm
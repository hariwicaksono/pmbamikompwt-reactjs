import React, { Component } from 'react'
import {Redirect,Link} from 'react-router-dom'
import API from '../../ServiceApi/Index'
import SearchResult from './SearchResult'
import { NotificationManager } from 'react-notifications'
import { FormGroup } from 'react-bootstrap'
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
            results: []
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
        //event.preventDefault()
        //console.log(event)
        const query=this.state.query
        API.CariOrang(query).then(res=>{
            this.setState({
              results: res
            })
          
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
                    
                    <Form.Submit type="submit" className="btn btn-success btn-block"><Search /> Lihat Hasil</Form.Submit>
                    <Link to="/register" className="btn btn-default btn-block"><PersonPlus /> Daftar Akun</Link>
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
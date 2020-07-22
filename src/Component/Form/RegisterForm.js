import React, { Component } from 'react'
//import {Redirect} from 'react-router-dom'
import API from '../../ServiceApi/Index'
import { NotificationManager } from 'react-notifications'
import {FormLabel, FormGroup, Row, Col, Spinner} from 'react-bootstrap'
import {Check2} from 'react-bootstrap-icons'
import Form from 'react-formal'
import * as yup from 'yup'
import { useForm } from "react-hook-form"

const Example = () => {
    const { handleSubmit, register, errors } = useForm();
    const onSubmit = values => console.log(values);
  
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          name="email"
          ref={register({
            required: "Required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "invalid email address"
            }
          })}
        />
        {errors.email && errors.email.message}
  
        <input
          name="username"
          ref={register({
            validate: value => value !== "admin" || "Nice try!"
          })}
        />
        {errors.username && errors.username.message}
  
        <button type="submit">Submit</button>
      </form>
    );
  };
//const TITLE = ' Daftar - PMB Universitas Amikom Purwokerto'
const schema = yup.object({
    nama: yup.string().required(),
    telp: yup.number().required(),
    email: yup.string().required(),
    username: yup.string().required(),
    password: yup.string().required(),
  });

class RegisterForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            username:'',
            email:'',
            password:'',
            aktivasi:'0',
            nama:'',
            telp:'',
            bukti_pembayaran:'',
            foto:'no-photo.jpg',
            loading: false
        }
        this.handlerChange = this.handlerChange.bind(this)
        this.handlerSubmit = this.handlerSubmit.bind(this)
    }

    handlerChange = (event) => {
       this.setState({
           [event.target.name] : event.target.value
       })
    }

    handlerSubmit = () => {
        this.setState({ loading: true });
        //event.preventDefault()
        API.PostUser(this.state).then(res=>{
            setTimeout(() => {
            if (res.status === 1 ) {
                this.setState({
                    loading: false
                })
                window.location.href = '/login';
                NotificationManager.success('Daftar Akun berhasil, silakan Login');
            } else {
                this.setState({
                    loading: false
                })
                NotificationManager.warning('Perhatian, pendaftaran Akun gagal');
            }
            }, 100);
        })
    }


    render() {

    return (
    <>
       <Example />
    <Form onSubmit={this.handlerSubmit} schema={schema} >
    <input type="hidden" name="aktivasi" value={this.state.aktivasi} />
    <input type="hidden" name="foto" value={this.state.foto} />
        <FormGroup>
        
        <FormLabel>Nama Lengkap*</FormLabel>
            
                <Form.Field className="form-control" placeholder="Nama Lengkap"
                name="nama"
                onChange={this.handlerChange} />
                <Form.Message for="nama" className="error" />
                
        </FormGroup>

        <Row>
        <FormGroup as={Col}>
            <FormLabel>Email*</FormLabel>
            <Form.Field type="text" placeholder="Email" name="email" className="form-control" onChange={this.handlerChange}/>
            <Form.Message for="email" className="error" />
        </FormGroup>
        
        
        <FormGroup as={Col}>
            <FormLabel>Telp/HP*</FormLabel>
            <Form.Field type="text" placeholder="Telp/No.HP" name="telp" className="form-control" onChange={this.handlerChange} />
            <Form.Message for="telp" className="error" />
        </FormGroup>
        </Row>

        <FormGroup>
            <FormLabel>Username*</FormLabel>
            <Form.Field type="text" placeholder="Username" name="username" className="form-control" onChange={this.handlerChange} />
            <Form.Message for="username" className="error" />
        </FormGroup>
        <FormGroup>
            <FormLabel>Password*</FormLabel>
            <Form.Field type="password" placeholder="Password" name="password" className="form-control" onChange={this.handlerChange} />
            <Form.Message for="password" className="error" />
        </FormGroup>

        <Form.Submit type="submit" className="btn btn-info btn-block">
        {
                        this.state.loading
                        ?
                        <><Spinner as="span" animation="border" size="sm"  role="status" aria-hidden="true" /> Memuat...</>
                        :  <><Check2 size="18"/> Daftar</> }

        </Form.Submit>
    </Form>            

    </>
    )
    }
}


export default RegisterForm
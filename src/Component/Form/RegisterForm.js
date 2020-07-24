import React, { Component } from 'react'
//import {Redirect} from 'react-router-dom'
import API from '../../ServiceApi/Index'
import { NotificationManager } from 'react-notifications'
import {FormLabel, FormGroup, Row, Col, Spinner} from 'react-bootstrap'
import {Check2} from 'react-bootstrap-icons'
import Form from 'react-formal'
import * as yup from 'yup'
 
let schema = yup.object({
    nama: yup.string().required('Nama lengkap harus diisi').min(4),
    telp: yup.number().required('Nomor Telepon atau HP harus diisi').typeError("Harus berupa angka"),
    email: yup.string().email('Harus berupa email yang valid').required('Alamat email harus diisi'),
    username: yup.string().required('Username harus diisi').test({
      message: () => 'Username sudah ada',
      test: async (value) => {
        try {
            const res = await API.CheckUsername(value)
            const result = await res.data.results;
            return !result
            } catch (error) {
            console.log(error.response); 
            return error.response;
            }
      },
    }),
    password: yup.string().min(6, 'Password terlalu pendek, minimal 6 karakter').required('Password harus diisi'),
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
    <div style={{maxHeight:'400px',overflowY: 'auto', overflowX:'hidden'}}>
       
    <Form onSubmit={this.handlerSubmit} schema={schema} >
    <input type="hidden" name="aktivasi" value={this.state.aktivasi} />
    <input type="hidden" name="bukti_pembayaran" value={this.state.bukti_pembayaran} />
    <input type="hidden" name="foto" value={this.state.foto} />
        <FormGroup>

        <FormLabel>Nama Lengkap*</FormLabel>
            
            <Form.Field errorClass="error" placeholder="Nama Lengkap"
            name="nama"
            onChange={this.handlerChange}  />
            <Form.Message for="nama" className="error" />
                
        </FormGroup>

        <Row>
        <FormGroup as={Col}>
            <FormLabel>Email*</FormLabel>
            <Form.Field type="text" placeholder="Email" name="email"  errorClass="error" onChange={this.handlerChange}/>
            <Form.Message for="email" className="error" />
        </FormGroup>
        
        
        <FormGroup as={Col}>
            <FormLabel>Telp/HP*</FormLabel>
            <Form.Field type="text" placeholder="Telp/No.HP" name="telp" errorClass="error" onChange={this.handlerChange} />
            <Form.Message for="telp" className="error" />
        </FormGroup>
        </Row>
 
        <FormGroup>
            <FormLabel>Username*</FormLabel>
            <Form.Field errorClass="error" type="text" placeholder="Username" name="username" onChange={this.handlerChange} validateOn={{ change: true, blur: true }} />
            <Form.Message for="username" className="error" />
        </FormGroup>
        <FormGroup>
            <FormLabel>Password*</FormLabel>
            <Form.Field type="password" placeholder="Password" name="password" errorClass="error" onChange={this.handlerChange} />
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

    </div>
    )
    }
}


export default RegisterForm
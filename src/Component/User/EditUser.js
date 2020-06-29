import React, { Component } from 'react'
import NavbarU from './NavbarU'
import API from '../../ServiceApi/Index'
import { Helmet } from 'react-helmet'
import ContentLoader from '../Layout/PageContentLoader'
import AppbarU from './AppbarU'
import { Container, Row, Col, Card } from 'react-bootstrap'

const TITLE = ' - PMB Universitas Amikom Purwokerto'
class EditUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id : '',
            nama : '',
            telp: '',
            email:'',
            //foto:'',
            //fotos: '',
            //password :'',
            //file: {
                //fto: ''
            //}
        }
        this.handlerData = this.handlerData.bind(this)
        //this.handlerImage = this.handlerImage.bind(this)
        this.handlerSubmit = this.handlerSubmit.bind(this)
     }


    handlerData = (e) => {
        this.setState({
           [ e.target.name] : e.target.value
        })
    }

    /*handlerImage = (e)=>{
        this.setState({
            foto: e.target.files[0].name,
            fotos: e.target.files[0].name,
            file: {
                fto: e.target.files[0]
            }
        })
    }*/

    handlerSubmit = (e) =>{
        e.preventDefault()
        if (this.state.fotos === "") {
            API.PutUser(this.state).then(res=>{
                if (res.status === 1) {
                    this.props.history.push('/akunU')
                }
            })
        } else {
            //API.PostImageP(this.state.file.fto, this.state.file.fto.name).then(res => {
                //console.log('img_ok')
            //})
            API.PutUser(this.state).then(res=>{
               //console.log(res)
                if (res.status === 1) {
                    this.props.history.push('/akunU')
                }
            })
        }
    }


    componentDidMount = () => {
        const data = JSON.parse(sessionStorage.getItem('isLogin'))
        const id = data[0].username
        API.GetUserId(id).then(res=>{
            this.setState({
                nama : res.nama,
                telp : res.telp,
                email : res.email,
            })
        })
    }


    render() {
        return (
            <div>
                <Helmet>
                <title>{ 'Edit Akun Saya' + TITLE }</title>
                </Helmet>
                <NavbarU />
                <div className="my-3">
                <Container>
                <Card className="bg-white shadow border-0">
                    <Card.Body>
                    
                        <h1>EDIT USER</h1>
                        <hr />
                        
                                <form onSubmit={this.handlerSubmit}>
                                    <div className="form-group">
                                        <label>NAMA USER</label>
                                        <input value={this.state.nama} name="nama" className="form-control" onChange={this.handlerData} type="text"></input>
                                    </div>

                                    <div className="form-group">
                                        <label>NO HP</label>
                                        <input value={this.state.telp} name="hp" className="form-control" onChange={this.handlerData} type="text"></input>
                                    </div>
                                    <div className="form-group">
                                        <label>EMAIL</label>
                                        <input value={this.state.email} name="email" className="form-control" onChange={this.handlerData} type="text" ></input>
                                    </div>
                                    {/*<div className="form-group">
                                        <input name="fotos" className="form-control" type="file" onChange={this.handlerImage} ></input>
                                    </div>*/}
                                    <input value="SIMPAN" className="btn btn-info" type="submit" ></input>
                                </form>
                         
                     
                    </Card.Body>
                    </Card>
                </Container>
                </div>
                <AppbarU/>
            </div>
        )
    }
}

export default EditUser
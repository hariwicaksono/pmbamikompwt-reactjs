import React, { Component } from 'react'
import {Link,Redirect,NavLink} from 'react-router-dom'
import API from '../../../ServiceApi/Index'
import { Helmet } from 'react-helmet'
import ContentLoader from '../../Layout/PageLoader'
import AppbarU from '../AppbarU'
import MainnavU from '../MainnavU'
import { Nav,Container, Card, Form, FormGroup, FormLabel, Button, Row, Col } from 'react-bootstrap'
import { NotificationManager } from 'react-notifications'

const TITLE = ' - PMB Universitas Amikom Purwokerto'
class AkunEdit extends Component {
constructor(props) {
super(props)
this.state = {
    id : '',
    nama : '',
    telp: '',
    email:'',
    foto:'',
    fotos: '',
    //password :'',
    file: {
        fto: ''
    },
    loading: true,
    url: 'http://localhost/pmbamikompwt-server/assets/img/'
}
this.handlerData = this.handlerData.bind(this)
this.handlerImage = this.handlerImage.bind(this)
this.handlerSubmit = this.handlerSubmit.bind(this)
}


handlerData = (e) => {
this.setState({
    [ e.target.name] : e.target.value
})
}

handlerImage = (e)=>{
this.setState({
    foto: e.target.files[0].name,
    fotos: e.target.files[0].name,
    file: {
        fto: e.target.files[0]
    }
})
}

handlerSubmit = (e) =>{
e.preventDefault()
if (this.state.fotos === "") {
    API.PutUser(this.state).then(res=>{
        if (res.status === 1) {
            //this.props.history.push('/akun/profil')
        }
    })
} else {
    API.PostImageP(this.state.file.fto, this.state.file.fto.name).then(res => {
        console.log('img_ok')
    })
    API.PutUser(this.state).then(res=>{
        console.log(res)
        if (res.status === 1) {
            //this.props.history.push('/akun/profil')
        }
    })
}
NotificationManager.info('Berhasil menyimpan data profil');
}


componentDidMount = () => {
const id = this.props.match.params.id
this.setState({
    id : id
})
API.GetUserId(id).then(res=>{
    setTimeout(() => this.setState({
        nama : res.nama,
        telp : res.telp,
        email : res.email,
        foto : res.foto,
        loading: false 
    }), 200);
})
}


render() {
return (
    <div>
        <Helmet>
        <title>{ 'Ganti Password' + TITLE }</title>
        </Helmet>

        <MainnavU />
        <div className="my-3 mx-2">
        <Container fluid>
        <Card className="shadow">
            <Card.Body>
            <Row>
                <Col md="3" className="border-right">
                <Nav id="nav" className="flex-column">
                <NavLink className="nav-link" to={'/akun/edit/' + this.state.id} activeClassName="active">Edit Profile</NavLink>
                <NavLink className="nav-link" to={'/akun/password/' + this.state.id} activeClassName="active">Ganti Password</NavLink>
                
                </Nav>
                </Col>         
                <Col md="9">
            
                {
                this.state.loading
                ?
                <ContentLoader />
                :
  
                <Form onSubmit={this.handlerSubmit}>
                    <Form.Group as={Row}>
                   
                        <Col sm={3}>
                        <a href="#" onClick={e => e.preventDefault()}>
                        {this.state.foto.length > 0 ? (
                          <><img
                          alt="Foto"
                          width="50"
                          className="rounded-circle mb-1 float-right"
                          src={this.state.url+this.state.foto}
                          
                        /></>
                         ) : (
                        <><img
                        alt="Foto"
                        width="50"
                        className="rounded-circle mb-1 float-right"
                        src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
                        
                        /></>
                         )}
                        </a>
                        
                        </Col>
                        <Col sm={9}><strong>{this.state.nama}</strong></Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm={3} className="text-right font-weight-bold">Password Lama</Form.Label>
                        <Col sm={9}>
                        <Form.Control name="oldpassword" className="text-dark" onChange={this.handlerData} type="password" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm={3} className="text-right font-weight-bold">Password</Form.Label>
                        <Col sm={9}>
                        <Form.Control name="password" className="text-dark" onChange={this.handlerData} type="password" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                    <Form.Label column sm={3} className="text-right font-weight-bold">Konfirmasi</Form.Label>
                    <Col sm={9}>
                        <Form.Control name="password_confirm" className="text-dark" onChange={this.handlerData} type="password" />
                        </Col>
                    </Form.Group>
                    
                    
                    <Form.Group as={Row}>
                    <Form.Label column sm={3}></Form.Label>
                    <Col sm={9}>
                    <Button variant="primary" type="submit">Simpan</Button>
                    </Col>

                    </Form.Group>

                </Form>
                
                }
               </Col>
            </Row> 
            </Card.Body>
            </Card>
        </Container>
        </div>
        <AppbarU/>
    </div>
)
}
}

export default AkunEdit
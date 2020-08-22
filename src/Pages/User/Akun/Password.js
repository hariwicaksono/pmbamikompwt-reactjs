import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'
import API from '../../../ServiceApi/Index'
import { Helmet } from 'react-helmet'
import ContentLoader from '../../../Components/Loader'
import { Nav,Container, Card, Form, Button, Row, Col } from 'react-bootstrap'
import { NotificationManager } from 'react-notifications'

const TITLE = ' - PMB Universitas Amikom Purwokerto'
class AkunPassword extends Component {
constructor(props) {
super(props)
this.state = {
    id : '',
    password :'',
    password_confirm:'',
    loading: true,
    url: 'http://localhost/pmbamikompwt-server/assets/img/'
    
}
this.handlerData = this.handlerData.bind(this)
this.handlerSubmit = this.handlerSubmit.bind(this)
}


handlerData = (e) => {
this.setState({
    [ e.target.name] : e.target.value
})
}

handlerSubmit = (e) =>{
e.preventDefault()
if (this.state.password_confirm === this.state.password) {
    API.PutUserPassword(this.state).then(res=>{
    if (res.status === 1) {
        //this.props.history.push('/hadmin')
        NotificationManager.success('Berhasil menyimpan password baru');
    } else {
        NotificationManager.warning('Gagal menyimpan password baru');
    }
    })
} else {
    NotificationManager.error('Konfirmasi Password tidak sesuai');
}

}


componentDidMount = () => {
const id = this.props.match.params.id
this.setState({
    id : id
})
API.GetUserId(id).then(res=>{
    setTimeout(() => {
    this.setState({
        nama : res.nama,
        telp : res.telp,
        email : res.email,
        foto : res.foto,
        password: res.password,
        loading: false 
    })
    }, 100);
})
}


render() {
return (
    <>
        <Helmet>
        <title>{ 'Ganti Password' + TITLE }</title>
        </Helmet>
      
        <Container fluid>
 
        <Card className="shadow my-3">
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
                        <a href="!#" onClick={e => e.preventDefault()}>
                        {this.state.foto > 0 ? (
                          <><img
                          alt="Foto"
                          width="60"
                          className="rounded-circle mb-1 float-md-right"
                          src={this.state.url+this.state.foto}
                          
                        /></>
                         ) : (
                        <><img
                        alt="Foto"
                        width="60"
                        className="rounded-circle mb-1 float-md-right"
                        src={this.state.url+'no-photo.jpg'}
                        
                        /></>
                         )}
                        </a>
                        
                        </Col>
                        <Col sm={9}><strong>{this.state.nama}</strong></Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm={3} className="text-md-right font-weight-bold">Password Baru</Form.Label>
                        <Col sm={9}>
                        <Form.Control name="password" className="text-dark" onChange={this.handlerData} type="password" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                    <Form.Label column sm={3} className="text-md-right font-weight-bold">Konfirmasi</Form.Label>
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
   
    </>
)
}
}

export default AkunPassword
import React, { Component } from 'react'
import API from '../../../ServiceApi/Index'
import { Helmet } from 'react-helmet'
import ContentLoader from '../../Layout/PageLoader'
import AppbarU from '../AppbarU'
import MainnavU from '../MainnavU'
import { Container, Card, Form, FormGroup, FormLabel, Button } from 'react-bootstrap'
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
    loading: true
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
            this.props.history.push('/akun/profil')
        }
    })
} else {
    API.PostImageP(this.state.file.fto, this.state.file.fto.name).then(res => {
        console.log('img_ok')
    })
    API.PutUser(this.state).then(res=>{
        console.log(res)
        if (res.status === 1) {
            this.props.history.push('/akun/profil')
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
        <title>{ 'Edit Akun Saya' + TITLE }</title>
        </Helmet>

        <MainnavU />
        <div className="my-2 mx-2">
        <Container fluid>
        <Card className="shadow">
            <Card.Body>
            
                <h2 className="mb-3">Edit Profil</h2>
                {
                this.state.loading
                ?
                <ContentLoader />
                :
                <Form onSubmit={this.handlerSubmit}>
                    <FormGroup>
                        <label>NAMA USER</label>
                        <Form.Control value={this.state.nama} name="nama" className="text-dark" onChange={this.handlerData} type="text" />
                    </FormGroup>

                    <FormGroup>
                        <FormLabel>NO TELP/HP</FormLabel>
                        <Form.Control value={this.state.telp} name="telp" className="text-dark" onChange={this.handlerData} type="text" />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>EMAIL</FormLabel>
                        <Form.Control value={this.state.email} name="email" className="text-dark" onChange={this.handlerData} type="text" />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>FOTO</FormLabel>
                        <Form.File name="fotos" onChange={this.handlerImage} />
                    </FormGroup>
                    <hr/>
                    <FormGroup>
                    <Button variant="primary" type="submit">SIMPAN</Button>
                    </FormGroup>

                </Form>
                }
                
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
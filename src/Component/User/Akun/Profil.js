import React, { Component } from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import API from '../../../ServiceApi/Index'
import AppbarU from '../AppbarU'
import ContentLoader from '../../Layout/PageLoader'
import MainnavU from '../MainnavU'
import { Helmet } from 'react-helmet'
import { Container, Row, Col, Card } from 'react-bootstrap'
import {Pencil} from 'react-bootstrap-icons'

const TITLE = ' - PMB Universitas Amikom Purwokerto'
class AkunProfil extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            nama: '',
            alamat: '',
            nohp: '',
            email: '',
            foto: '',
            loading: true,
            url: 'http://localhost/pmbamikompwt-server/assets/img/'
        }
    }

    getData = () => {
        
    }

    componentDidMount = () => {
        const data = JSON.parse(sessionStorage.getItem('isLogin'))
        const id = data[0].username
        API.GetUserId(id).then(res=>{
            setTimeout(() => this.setState({
                id : res.username,
                nama: res.nama,
                telp: res.telp,
                email: res.email,
                foto: res.foto,
                loading: false 
            }), 200);
        })
    }
    render() {
        return (
            <div>
                <Helmet>
                <title>{ 'Akun Saya' + TITLE }</title>
                </Helmet>

                <MainnavU />

                <div className="my-2 mx-2">
                <Container fluid>
                <Card className="shadow">
                <Card.Body>
                  <h2 className="mb-3">Akun Saya</h2>

                  {
                    this.state.loading
                        ?
                        <ContentLoader />
                        :
                        <>

                        <h3>{this.state.nama}</h3>
                        <Row>
                                
                        <Col md="8">
                        <hr className="mt-2 mb-2" />
                        <p className="lead"><b>NAMA :</b> {this.state.nama} <br/>
                        <b>NO.TELP/HP :</b> {this.state.telp}  <br/>
                        <b>EMAIL :</b> {this.state.email}</p>
                        
                        </Col>
                        <Col md="4">
                        
                        <a href="#" onClick={e => e.preventDefault()}>
                        {this.state.foto.length > 0 ? (
                          <><img
                          alt=""
                          className="card-img"
                          src={this.state.url+this.state.foto}
                          
                        /></>
                         ) : (
                        <><img
                        alt=""
                        className="card-img"
                        src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
                        
                        /></>
                         )}
                        </a>
                        </Col>
                    </Row>

                    <Link className="btn btn-primary btn-block"  to={'/akun/edit/' + this.state.id} ><Pencil /> Edit Profil</Link>
                    </>
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

export default AkunProfil
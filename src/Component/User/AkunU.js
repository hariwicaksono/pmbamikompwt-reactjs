import React, { Component } from 'react'
import NavbarU from './NavbarU'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import API from '../../ServiceApi/Index'
import AppbarU from './AppbarU'
import ContentLoader from '../Layout/PageContentLoader'
import { Helmet } from 'react-helmet'
import { Container, Row, Col, Card } from 'react-bootstrap'
import {Pencil} from 'react-bootstrap-icons'

const TITLE = ' - PMB Universitas Amikom Purwokerto'
class AkunU extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            nama: '',
            alamat: '',
            nohp: '',
            email: '',
            foto: ''
        }
    }

    getData = () => {
        
    }

    componentDidMount = () => {
        const data = JSON.parse(sessionStorage.getItem('isLogin'))
        const id = data[0].username
        API.GetUserId(id).then(res=>{
            this.setState({
                id : res.username,
                nama: res.nama,
                telp: res.telp,
                email: res.email
               
            })
        })
    }
    render() {
        return (
            <div>
                <Helmet>
                <title>{ 'Akun Saya' + TITLE }</title>
                </Helmet>
                <NavbarU />
                

                <div className="my-3">
                <Container>
                <Card className="bg-white py-3 px-4 shadow">
                  <h2>Akun Saya <Link className="btn btn-info float-right"  to={'/editakunU/' + this.state.id} ><Pencil size="16" /> Edit Profil</Link></h2>
                    <div className="text-center pt-2">
                        <a href="#" onClick={e => e.preventDefault()}>
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={"https://indonesiadentalexpo.com/wp-content/uploads/2019/06/gravatar-60-grey.jpg"}
                            width="150"
                          />
                        </a>
                     
                        <h1>{this.state.nama}</h1>
                        <hr className="mt-2 mb-2" />
                        <p><b>NAMA :</b> {this.state.nama}  </p>
                        <p><b>NO HP :</b> {this.state.telp}  </p>
                        <p><b>EMAIL :</b> {this.state.email}  </p>
                        

                    </div>
                </Card>
                    
                </Container>
                </div>
           
            <AppbarU/>
            </div>
        )
    }
}

export default AkunU
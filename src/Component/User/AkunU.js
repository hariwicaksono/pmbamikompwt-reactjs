import React, { Component } from 'react'
import NavbarU from './NavbarU'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import API from '../../ServiceApi/Index'
import AppbarU from './AppbarU'

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
                alamat: res.alamat_user,
                nohp: res.no_hp_user,
                email: res.email_user,
                foto: res.photo_user,
            })
        })
    }
    render() {
        return (
            <div>
                <NavbarU />
                <div className="container">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <div className="panel panel-info">
                            <div className="panel-body">
                                <h1>MY ACCOUNT</h1>
                                <hr />
                                <p><b>NAMA :</b> {this.state.nama}  </p>
                                <p><b>ALAMAT :</b> {this.state.alamat}  </p>
                                <p><b>NO HP :</b> {this.state.nohp}  </p>
                                <p><b>EMAIL :</b> {this.state.email}  </p>
                                <p><img src={'http://localhost/api_olsop_fix/server/asset/img/' + this.state.foto} width="250" height="200" alt="test" /></p>
                                <Link className="btn btn-info" to={'/edituser/' + this.state.id} >EDIT</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <AppbarU/>
            </div>
        )
    }
}

export default AkunU
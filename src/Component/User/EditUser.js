import React, { Component } from 'react'
import NavbarU from './NavbarU'
import API from '../../ServiceApi/Index'

class EditUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id : '',
            nama : '',
            alamat : '',
            hp: '',
            email:'',
            foto:'',
            fotos: '',
            password :'',
            file: {
                fto: ''
            }
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
                    this.props.history.push('/akunU')
                }
            })
        } else {
            API.PostImageP(this.state.file.fto, this.state.file.fto.name).then(res => {
                //console.log('img_ok')
            })
            API.PutUser(this.state).then(res=>{
               //console.log(res)
                if (res.status === 1) {
                    this.props.history.push('/akunU')
                }
            })
        }
    }


    componentDidMount = () => {
        const id = this.props.match.params.id
        this.setState({
            id : id
        })
        API.GetUserId(id).then(res=>{
            this.setState({
                nama : res.nama_user,
                alamat : res.alamat_user,
                hp : res.no_hp_user,
                email : res.email_user,
                foto : res.photo_user,
                password : res.password_user
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
                        <h1>EDIT USER</h1>
                        <hr />
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <form onSubmit={this.handlerSubmit}>
                                    <div className="form-group">
                                        <label>NAMA USER</label>
                                        <input value={this.state.nama} name="nama" className="form-control" onChange={this.handlerData} type="text"></input>
                                    </div>
                                    <div className="form-group">
                                        <label>ALAMAT USER</label>
                                        <input value={this.state.alamat} name="alamat" className="form-control" onChange={this.handlerData} type="text"></input>
                                    </div>
                                    <div className="form-group">
                                        <label>NO HP</label>
                                        <input value={this.state.hp} name="hp" className="form-control" onChange={this.handlerData} type="text"></input>
                                    </div>
                                    <div className="form-group">
                                        <label>EMAIL</label>
                                        <input value={this.state.email} name="email" className="form-control" onChange={this.handlerData} type="text" ></input>
                                    </div>
                                    <div className="form-group">
                                        <input name="fotos" className="form-control" type="file" onChange={this.handlerImage} ></input>
                                    </div>
                                    <input value="SIMPAN" className="btn btn-info" type="submit" ></input>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default EditUser
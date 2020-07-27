import React, { Component } from 'react'
import NavbarU from './NavbarU'
import API from '../../ServiceApi/Index'
import TSimpan from './TSimpan'

class DetailU extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            nama: '',
            kategori: '',
            harga: '',
            des: '',
            foto: '',
            url: 'http://localhost/api_olsop_fix/server/asset/img/'
        }
        //this.handlerSubmit = this.handlerSubmit.bind(this)
    }

    componentDidMount = () => {
        const id = this.props.match.params.id
        // console.log(id)
        API.GetProdukId(id).then(res => {
            // console.log(res)
            this.setState({
                id: res.id_produk,
                nama: res.nama_produk,
                kategori: res.kategori_produk,
                harga: res.harga_produk,
                des: res.desk_produk,
                foto: res.foto_produk
            })
        })

        // if (localStorage.getItem('isCart')) {
        //     this.setState({
        //         cartItems : JSON.parse(localStorage.getItem('isCart')) 
        //     })
        // }
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
                                <h1>DETAIL PRODUK</h1>
                                <hr />
                                <img width="320" height="200" className="img-responsive" src={this.state.url + this.state.foto} alt="name" />
                                <p><b>nama produk : {this.state.nama}</b> </p>
                                <p><b>harga produk : {this.state.harga}</b> </p>
                                <p><b>kategori produk :</b> {this.state.kategori} </p>
                                <p><b>des produk :</b> {this.state.des} </p>
                                <TSimpan data={this.state} />
                                <hr />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default DetailU
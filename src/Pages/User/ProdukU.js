import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class ProdukU extends Component {
    constructor(props) {
        super(props)
        this.state = {
            url: 'http://localhost/api_olsop_fix/server/asset/img/'
        }
    }
    render() {
        const ListProduk = this.props.data.map(produk => (
            <div className="col-md-3" key={produk.id_produk} >
                <div className="panel panel-default">
                    <div className="panel-body">
                        <p> <img width="225" height="200" src={this.state.url + produk.foto_produk} alt="test" className="img-rounded img-responsive" /> </p>
                        <p><b>Rp {produk.harga_produk} </b></p>
                        <p><b> {produk.nama_produk} </b></p>
                        <Link to={'/detailu/' + produk.id_produk} className="btn btn-success" >DETAIL</Link>
                    </div>
                </div>
            </div> 
        ))
        return (
            <div className="row">
                <div className="col-md-12">
                    {ListProduk}
                </div>
            </div>
        )
    }
}

export default ProdukU
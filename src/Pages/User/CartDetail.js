import React, { Component } from 'react'
import TombolHapus from './TombolHapus'

class CartDetail extends Component {
    render() {
        return (
            <div className="container">
                <div className="col-md-10">
                    <div className="panel panel-default">
                        <div className="panel-body">
                            <p><b>NAMA PRODUK </b> {this.props.data.nama} </p>
                            <p><b>HARGA PRODUK </b> {this.props.data.harga} </p>
                            <p><b>JUMLAH PRODUK </b> {this.props.data.count} </p>
                            <p><b>TOTAL HARGA </b> Rp. {this.props.data.harga * this.props.data.count} </p>
                            <TombolHapus/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CartDetail
import React, { Component } from 'react'

class TablePesan extends Component {
    componentDidMount = () => {
      console.log(this.props.data)
    }
    render() {
        const ListProduk = this.props.data.map(produk => (
            <tbody key={produk.id_pemesanan}>
                <tr>
                    <td>{produk.namaproduk}</td>
                    <td>{produk.hargaproduk}</td>
                    <td>{produk.count_produk}</td>
                    <td>{produk.desk_pemesanan}</td>
                    <td>{produk.count_produk * produk.hargaproduk}</td>
                </tr>
            </tbody>
        ))
        return (
            <div>
                <table className="table table-hover">

                    <thead>
                        <tr>
                            <th>NAMA PRODUK</th>
                            <th>HARGA PRODUK</th>
                            <th>JUMLAH PRODUK</th>
                            <th>KETERANGAN</th>
                            <th>TOTAL HARGA</th>
                        </tr>
                    </thead>
                    {
                        ListProduk
                    }
                </table>
            </div>
        )
    }
}

export default TablePesan
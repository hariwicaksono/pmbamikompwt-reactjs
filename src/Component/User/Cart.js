import React, { Component } from 'react'
import NavbarU from './NavbarU'
import CartDetail from './CartDetail'
import API from '../../ServiceApi/Index'

class Cart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: '',
            produk: [],
            id_user : '',
            desk : 'Belum Melakukan pembayaran',
            nama_user : ''
        }
    }

    handlerSimpan = () => {
        this.state.produk.map(prd =>{
            const data = {
                user : this.state.id_user,
                produk: prd.id,
                count : prd.count,
                desk : this.state.desk,
                namap : prd.nama,
                hargap : prd.harga,
                namau :  this.state.nama_user,
                jml : prd.count
            }
            console.log(data)
            API.PostPesan(data).then(res=>{
                if (res.status === 1) {
                    localStorage.setItem('cartItem','')
                    localStorage.clear()
                    this.props.history.push('/pesanu')
                }
            })
        })
    }

    componentDidMount = () => {
        if (localStorage.getItem('cartItem')) {
            this.setState({
                produk: JSON.parse(localStorage.getItem('cartItem'))
            })
        } else {
            this.setState({
                error: "KERANJANG KOSONG"
            })
        }
        
        if (sessionStorage.getItem('isLogin')) {
            const datas = JSON.parse(sessionStorage.getItem('isLogin'))
            this.setState({
                id_user: datas[0].id_user,
                nama_user: datas[0].nama_user
            })
        }
    }
    

    render() {
        return (
            <div>
                <NavbarU />
                <div className="container">
                    <hr />
                    <h1>{this.state.error}</h1>
                    {
                        this.state.produk.map(prodok => {
                            return <CartDetail key={prodok.id} data={prodok} />
                        })
                    }
                    <hr/>
                    <button className="btn btn-info margin" onClick={this.handlerSimpan} >CHECKOUT</button>
                </div>
                
            </div>
        )
    }
}

export default Cart
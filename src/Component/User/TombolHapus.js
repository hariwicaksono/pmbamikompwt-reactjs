import React, { Component } from 'react'

class TombolHapus extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cartItems: [],
            success:''
        }
        this.handlerRemove = this.handlerRemove.bind(this)
    }

    handlerRemove = (e, item) => {
        this.setState(state =>{
          const cartItems = state.cartItems.filter(elm => elm.id !== item.id)
          localStorage.setItem('cartItem',cartItems)
            state.success ="Berhasil dihapus"
          return {cartItems:cartItems}
        })
    }

    componentDidMount = () => {
        if (localStorage.getItem('cartItem')) {
            this.setState({
                produk: JSON.parse(localStorage.getItem('cartItem'))
            })
        }
    }
    render() {
        return (
            <div>
                <button className="btn btn-danger" onClick={(e) => this.handlerRemove(e, this.props.data)} >HAPUS</button>
                <br/>
                {
                    this.state.success
                }
            </div>
        )
    }
}

export default TombolHapus
import React,{Component} from 'react'


class TSimpan extends Component{
    constructor(props){
        super(props)
        this.state = {
            success:'',
            cartItems : []
        }
        this.handlerSubmit = this.handlerSubmit.bind(this)
    }

    handlerSubmit = (e,data) =>{
        this.setState(state=>{
            const cartItems = state.cartItems
            let ProductReady = false
            cartItems.forEach(element => {
                if (element.id === data.id) {
                    ProductReady = true
                    element.count += 1
                }
            });
            if (!ProductReady) {
                cartItems.push({...data,count:1})
            }
            localStorage.setItem('cartItem',JSON.stringify(cartItems))
            state.success = "Produk Sudah Masuk Keranjang"
            console.log(state.cartItems)
            return{cartItems:cartItems}
        })
    }

    componentDidMount = () => {
        if (localStorage.getItem('cartItem')) {
            this.setState({
              cartItems : JSON.parse(localStorage.getItem('cartItem'))
            })
        }
    }

    render(){
        return(
            <div>
                <button className="btn btn-info" onClick={(e) => this.handlerSubmit(e, this.props.data)} >BELI</button>
                <br/>
                {
                    this.state.success
                }
            </div>
        )
    }
}

export default TSimpan
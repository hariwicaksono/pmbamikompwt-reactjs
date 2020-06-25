import React, { Component } from 'react'
import NavbarU from './NavbarU'
import API from '../../ServiceApi/Index'
import ProdukU from './ProdukU'
import { Helmet } from 'react-helmet'
import AppbarU from './AppbarU'

const TITLE = ' User - PMB Universitas Amikom Purwokerto'
class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            mhs: []
        }
    }

    componentDidMount = () => {
        //API.GetProduk().then(res => {
           // console.log(res)
            //this.setState({
               // mhs: res
           // })
        //})
    }

    render() {
        return (
            <div>
                <Helmet>
                <title>{ TITLE }</title>
                </Helmet>
                <NavbarU />
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            {/*<ProdukU data={this.state.mhs} />*/}
                        </div>
                    </div>
                </div>
                <AppbarU />
            </div>
        )
    }
}


export default Index
import React, { Component } from 'react'
import NavbarU from './NavbarU'
import AppbarU from './AppbarU'
import API from '../../ServiceApi/Index'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import ContentLoader from '../../Component/Layout/PageLoader'
import Parser from 'html-react-parser'
import { Container,Card } from 'react-bootstrap'
import { Helmet } from 'react-helmet'
import Loader from 'react-loader'
 
const TITLE = ' - PMB Universitas Amikom Purwokerto'
/*var options = {
    lines: 13,
    length: 20,
    width: 10,
    radius: 30,
    scale: 0.35,
    corners: 1,
    color: '#fff',
    opacity: 0.25,
    rotate: 0,
    direction: 1,
    speed: 1,
    trail: 60,
    fps: 20,
    zIndex: 2e9,
    top: '50%',
    left: '50%',
    shadow: false,
    hwaccel: false,
    position: 'absolute'
};*/
class Page extends Component {
    constructor(props){
        super(props)
        this.state = {
            judul_tupoksi : '',
            isi_tupoksi : '',
            loading: true
            
        }
    }

    componentDidMount = () => {
        const id = this.props.match.params.id
        //console.log(id)
        API.GetPageId(id).then(res=>{
           // console.log(res)
           setTimeout(() => this.setState({
                judul_tupoksi : res.judul_tupoksi,
                isi_tupoksi :res.isi_tupoksi,
                loading: false
                //harga: res.harga_produk,
                //des:res.desk_produk,
                //foto : 'http://localhost/api_olsop_fix/server/asset/img/'+res.foto_produk
            }), 200);
        })
    }
    render() {
        
        return (
            <div>

                <Helmet>
                <title>{ Parser(this.state.judul_tupoksi) + TITLE }</title>
                </Helmet>
                <NavbarU />
                <div className="my-3">
                 <Container fluid>
                 <Card className="bg-white shadow border-0">
                    <Card.Body>
                    {
                        this.state.loading
                        ?
                        <ContentLoader />
                        :
                            <div>
                                <h1>{Parser(this.state.judul_tupoksi)}</h1>
                                <>{Parser(this.state.isi_tupoksi)}</>
                            </div>
                    }
                    </Card.Body>
                </Card>
                  </Container>  
                  </div>
                <AppbarU />
            </div>
        )
    }
}

export default Page
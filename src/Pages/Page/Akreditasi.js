import React, { Component } from 'react'
import API from '../../ServiceApi/Index'
import ContentLoader from '../../Components/Loader'
import Parser from 'html-react-parser'
import { Container, Card} from 'react-bootstrap'
import { Helmet } from 'react-helmet'
//import Loader from 'react-loader'

const TITLE = ' Akreditasi - PMB Universitas Amikom Purwokerto'
//var options = {
    //lines: 13,
    //length: 20,
    //width: 10,
    //radius: 30,
    //scale: 0.35,
    //corners: 1,
    //color: '#fff',
    //opacity: 0.25,
    //rotate: 0,
    //direction: 1,
    //speed: 1,
    //trail: 60,
    //fps: 20,
    //zIndex: 2e9,
    //top: '50%',
    //left: '50%',
    //shadow: false,
    //hwaccel: false,
    //position: 'absolute'
//};
class Akreditasi extends Component {
    constructor(props){
        super(props)
        this.state = {
            loading: true
            
        }
    }

    componentDidMount = () => {
        
           setTimeout(() => this.setState({
                loading: false
                //harga: res.harga_produk,
                //des:res.desk_produk,
                //foto : 'http://localhost/api_olsop_fix/server/asset/img/'+res.foto_produk
        }), 200);
     
    }

    render() {
         
        return (
            <>
 
                <Helmet>
                <title>{ TITLE }</title>
                </Helmet>
             
                <Container fluid>
                <Card className="shadow my-3">
                    <Card.Body>

                    <div>
                    {
                        this.state.loading
                        ?
                        /*<Loader options={options} className="spinner" />*/
                        
                        <ContentLoader />
                   
                        :
                       
                        <>
                            
                                
                        </>
                   
                        

                    }

                </div>

                </Card.Body>
                </Card>
                </Container>
    
            </>
        )
    }
}

export default Akreditasi
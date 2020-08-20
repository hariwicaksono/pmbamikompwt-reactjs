import React, { Component } from 'react'
//import {Redirect,NavLink,Link} from 'react-router-dom'
import API from '../../ServiceApi/Index'
import { Helmet } from 'react-helmet'
import MainnavU from './MainnavU'
import { Card, Container } from 'react-bootstrap'
import { isLogin } from '../../Utils'
import ContentLoader from '../../Components/Loader'

const TITLE = ' User - PMB Universitas Amikom Purwokerto'
class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            daftar:false,
            loading: true,
            mhs: [],
            url: 'http://localhost/pmbamikompwt-server/assets/img/'
        }
    }
 
    componentDidMount = () => {
        if (isLogin()) {
            const datas = JSON.parse(sessionStorage.getItem('isLogin'))
            const id = datas[0].email
            console.log(id)
            
            API.GetCalonsiswa(id).then(res=>{
                setTimeout(() => {
                this.setState({
                    mhs: res.data,
                    daftar: true,
                    loading: false
                 })
                }, 100);
                
            })
           
        } 
        
        
        
    }

    render() {
        console.log(this.state.mhs)
        return (
            <>
                <Helmet>
                <title>{ TITLE }</title>
                
                </Helmet>
                
                <Container fluid>
                <MainnavU />
                <Card className="shadow">
                <Card.Body>
                
                
                <Card className="mt-5">
                <div className="mx-auto">
                <img
                alt="Foto"
                width="120"
                className="rounded-circle mx-auto"
                src={this.state.url+'no-photo.jpg'} style={{marginTop: "-60px"}}/>
                </div>
  <Card.Body>
    <Card.Title>Card Title</Card.Title>
    <Card.Text>
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </Card.Text>
    
  </Card.Body>
</Card>
                {
                        this.state.loading
                        ?
                        /*<Loader options={options} className="spinner" />*/
                        
                        <ContentLoader />
                   
                        :
                        <>
                {this.state.daftar ?
                <>

1
     
                </>
            :
            <>
2
            </>
            }
            </>
                        }

                </Card.Body>
                </Card>
                </Container>
             
    
            </>
        )
    }
}


export default Index
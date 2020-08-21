import React, { Component } from 'react'
//import {Redirect,NavLink,Link} from 'react-router-dom'
import API from '../../ServiceApi/Index'
import { Helmet } from 'react-helmet'
import MainnavU from './MainnavU'
import { Card, Container } from 'react-bootstrap'
import { isLogin } from '../../Utils'
import ContentLoader from '../../Components/Loader'
import CardIndex from './CardIndexU'
import { NotificationManager } from 'react-notifications'

const TITLE = ' User - PMB Universitas Amikom Purwokerto'
class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            mhs: [],
            url: 'http://localhost/pmbamikompwt-server/assets/img/'
        }
    }
 
    componentDidMount = () => {

        const datas = JSON.parse(sessionStorage.getItem('isLogin'))
        const id = datas[0].email
        //console.log(id)
        
        API.GetCalonsiswa(id).then(res=>{
            setTimeout(() => {
                if (res.data.length > 0) {
                    this.setState({
                      mhs: res.data,
                      loading: false
                    })
                    NotificationManager.success('Selamat datang Calon Mahasiswa Baru');
                  } else {
                    this.setState({
                      mhs: res.data,
                      loading: false
                    })
                    NotificationManager.warning('Perhatian, anda belum melakukan pendaftaran');
                  }
            }, 100);
            
        })
     
    }

    render() {
        
        return (
            <>
                <Helmet>
                <title>{ TITLE }</title>
                
                </Helmet>
                
                <Container fluid>
                <MainnavU />
                <Card className="shadow">
                <Card.Body>

                {this.state.mhs.length > 0 ? (
                    
                    (this.state.loading
                    ?
                    <ContentLoader />
                    :
                    
                    <CardIndex data={this.state.mhs} />
                    )
                    
                ): (

                (this.state.loading ?
                    <ContentLoader />
                    :
                    <>
                    Belum Daftar
                    </>
                )
                    
                )}

                
                </Card.Body>
                </Card>
                </Container>
             
    
            </>
        )
    }
}


export default Index
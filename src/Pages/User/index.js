import React, { Component } from 'react'
//import {Redirect,NavLink,Link} from 'react-router-dom'
import API from '../../ServiceApi/Index'
import { Helmet } from 'react-helmet'
import MainnavU from './MainnavU'
import { Card, Container, Alert, Row, Col } from 'react-bootstrap'
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
            hour: null,
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
        
        this.getHour()
        

    }
    getHour = () => {
        const date = new Date();
        const hour = date.getHours()
        this.setState({
           hour
        });
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
                <Alert key="" variant="primary">
                     <Alert.Heading>Selamat {this.state.hour < 12 ? `Pago` : `Malam`}</Alert.Heading>
                        This is a alert—check it out!
                    </Alert>

                    <Row>
                    <Col>
                    <Card
                    bg="info"
                    key=""
                    text="light"
                    className="mb-2"
                >
                
                    <Card.Body>
                    <Card.Title>Program Studi</Card.Title>
                    <Card.Text>
                        Selamat Datang di PMB Amikom Purwokerto
                    </Card.Text>
                    </Card.Body>
                </Card> 
                    </Col>
                    <Col>
                    <Card
                    bg="success"
                    key=""
                    text="light"
                    className="mb-2"
                >
                
                    <Card.Body>
                    <Card.Title>Tahun Akademik</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the bulk
                        of the card's content.
                    </Card.Text>
                    </Card.Body>
                </Card> 
                    </Col>

                    <Col>
                    <Card
                    bg="danger"
                    key=""
                    text="light"
                    className="mb-2"
                >
                
                    <Card.Body>
                    <Card.Title>Gelombang</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the bulk
                        of the card's content.
                    </Card.Text>
                    </Card.Body>
                </Card>  
                    </Col>

                    </Row>

                     

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
import React, { Component } from 'react'
//import {Redirect,NavLink,Link} from 'react-router-dom'
//import API from '../../ServiceApi/Index'
import { Helmet } from 'react-helmet'
import MainnavU from './MainnavU'
import { Container, Row, Col } from 'react-bootstrap'
import StepZilla from 'react-stepzilla'
import Step1 from "./Step1";
import 'react-stepzilla/src/css/main.css'

const TITLE = ' User - PMB Universitas Amikom Purwokerto'

  const Step2 = props => {
    return (
      <div>
        <div>Step 2</div>
      </div>
    );
  };
const steps = [
    {
      name: "Step 1",
      component: <Step1 />
    },
    {
        name: "Step 2",
        component: <Step2 />
      }
  ];
  

class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            //login:false,
            mhs: [],
            current: 0
        }
    }

    //componentDidMount = () => {
        //if (sessionStorage.getItem('isLogin')) {
           // console.log('Ok')
           
        //} else {
            //this.setState({
               // login:true
           // })
        //}
        
    //}

    handleStepClick = (stepNumber) => {
        this.setState({current: stepNumber})
    };

    render() {
        //if (this.state.login) {
            //return( <Redirect to="/login" /> )
        //}
        
        return (
            <>
                <Helmet>
                <title>{ TITLE }</title>
                
                </Helmet>


                <MainnavU />

                <div className="my-3 mx-3">
                <Container fluid>

                    <Row>
                        <Col md={12}>
                    
                            
    <div className='step-progress'>
        <StepZilla steps={steps} backButtonCls="btn btn-next btn-primary float-left" nextButtonCls="btn btn-prev btn-primary float-md-right"/>
    </div>
                        </Col>
                    </Row>
              
                </Container>
                </div>
    
            </>
        )
    }
}


export default Index
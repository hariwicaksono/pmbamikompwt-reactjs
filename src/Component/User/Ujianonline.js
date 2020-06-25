import React, { Component } from 'react'
import NavbarU from './NavbarU'
import API from '../../ServiceApi/Index'
import Soal from './Soal'
import ContentLoader from '../Layout/SoalContentLoader'
//import Pagination from 'react-js-pagination'

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Soal: [],
            loading: true
            //activePage : 0
        }
    }


     //handlerChange = (pageNumber) =>{
         //console.log(pageNumber)
         //this.setState({activePage:pageNumber})
     //}



    componentDidMount = () => {
        API.GetSoal().then(res => {
            
            setTimeout(() => this.setState({
                loading: false,
                Soal: res
               
            }), 500);
            
        })
    }
    render() {
        return (
            <div>
                <NavbarU />
                <br/>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                        
                        {
                        this.state.loading
                        ?
                        <ContentLoader/>
                        :
                         <Soal data={this.state.Soal} />
                        }

                        </div>
                    </div>
                </div>
                {/* <Pagination
                    itemClass="page-item"
                    linkClass="page-link"
                    activePage = {this.state.activePage}
                    itemsCountPerPage = {1}
                    totalItemsCount ={10}
                    pageRangeDisplayed = {3}
                    onChange = {this.handlerChange.bind(this)}
                /> */}
               
               
            </div>
        )
    }
}

export default Home
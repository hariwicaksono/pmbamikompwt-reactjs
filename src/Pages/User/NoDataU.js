import React,{ Component } from 'react'
import {Link} from 'react-router-dom'
//import API from '../../ServiceApi/Index'
import { Button } from 'react-bootstrap'

class NoDataU extends Component{

    render(){
        return(
            <div className="text-center">
                <h3 className="mb-3">Anda Belum Melakukan Pendaftaran</h3>
                <img src="./images/notfound.png" className="mb-3 img-fluid" alt="Not Data Found" /><br/>
                <Button as={Link} to="/user/pendaftaran" variant="primary">Form Daftar</Button>
            </div>
        )
    }
}

export default NoDataU
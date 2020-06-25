import React,{Component} from 'react'
import NavbarU from './NavbarU'
import API from '../../ServiceApi/Index'
import TablePesan from './TablePesan'

class Pemesanan extends Component{
    constructor(props){
        super(props)
        this.state={
            mhs : []
        }
    }

    componentDidMount = () => {
        if (sessionStorage.getItem('isLogin')) {
            const datas = JSON.parse(sessionStorage.getItem('isLogin'))
            const id = datas[0].id_user
            console.log(id)
            API.GetPesan(id).then(res=>{
                console.log(res)
                this.setState({
                    mhs: res.data
                })
            })
        }
    }

    render(){
        return(
            <div>
                <NavbarU/>
                <div className="container">
                    <h1>TRANSAKSI PESAN</h1>
                    <hr/>
                    <TablePesan data={this.state.mhs} />
                    <div className="alert alert-info" >
                        <div className="alert-body">
                           <p><b>SILAHKAN MELAKUKAN PEMBAYARAN KE NOMER REKENING 0931</b></p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Pemesanan
import React, { Component } from "react";
import NoData from '../NoDataU'
import API from '../../../ServiceApi/Index'
import ContentLoader from '../../../Components/Loader'
import { NotificationManager } from 'react-notifications'

class Dokumen extends Component {
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
                    NotificationManager.info('Selamat datang Calon Mahasiswa Baru');
                  } else {
                    this.setState({
                      mhs: res.data,
                      loading: false
                    })
                    NotificationManager.error('Perhatian, anda belum melakukan Pendaftaran');
                  }
            }, 100);
            
        })
     
    }

    render() {
        
        return (
            <>
            {this.state.mhs.length > 0 ? (
                    
                    (this.state.loading
                    ?
                    <ContentLoader />
                    :
                    <>

                    </>
                 
                    )
                    
                ): (

                (this.state.loading ?
                    <ContentLoader />
                    :
                    <>
                    <NoData />
                    </>
                )
                    
                )}
            </>
        )
    }
}


export default Dokumen;
import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import API from '../ServiceApi/Index'
import { logout, isLogin } from '../Utils'

class Sidebar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            login:false
            
        }
    }
    Logout = () => {
        logout();
        
    }
    componentDidMount = () => {
        if (isLogin()) {
           console.log('LOGIN')
           const data = JSON.parse(sessionStorage.getItem('isLogin'))
                const id = data[0].username
                API.GetUserId(id).then(res=>{
                    this.setState({
                        id : res.username,
                        nama: res.nama, 
                        foto: res.foto,
                    })
                })
                
        } else {
            this.setState({
                login:true
            })
        }
    }

    render() {
      
    return(
        <>
        <nav id="sidebar" className={this.props.showMenu ? '' : 'active' }>
        <ul className="list-unstyled components">
        
                <li>
                    <NavLink to={'/page/37'} title="Petunjuk" alt="Petunjuk">
                    <img src="/images/iconpack/bulb_210969.png" alt="" width="35" /><br/><span>Petunjuk</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/page/18'} title="Jalur Penerimaan" alt="Jalur Penerimaan">
                    <img src="/images/iconpack/paper-plane.png" alt="" width="35" /><br/><span>Jalur Penerimaan</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/page/36'} title="Fakultas &amp; Progdi" alt="Fakultas &amp; Progdi">
                    <img src="/images/iconpack/home_240324.png" alt="" width="35" /><br/><span>Fakultas &amp; Prodi</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/page/38'} title="Biaya Pendidikan" alt="Biaya Pendidikan">
                    <img src="/images/iconpack/wallet_216490.png" alt="" width="35" /><br/><span>Biaya Pendidikan</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/page/30/'} title="Beasiswa" alt="Beasiswa">
                    <img src="/images/iconpack/folder_243935.png" alt="" width="35" /><br/><span>Beasiswa</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/page/35'} title="Fasilitas" alt="Fasilitas">
                    <img src="/images/iconpack/computer_210953.png" alt="" width="35" /><br/><span>Fasilitas</span>
                    </NavLink>
                </li>

                {this.state.login ?
            <>
             
            </>
            :
            <>
                <li>
                    <NavLink onClick={this.Logout} to='' activeClassName="">
                    <img src="/images/iconpack/logout_210120.png" alt="" width="35" /><br/><span>Keluar Sistem</span>
                    </NavLink>
                </li>
            </>
        } 
          
            </ul>
        </nav>
      
        </>

    )

}
}

export default Sidebar
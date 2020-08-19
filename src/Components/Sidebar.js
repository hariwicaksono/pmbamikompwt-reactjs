import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
//import { ArrowUpRightCircle, Building, FileEarmarkText, ListUl, Folder, Display } from 'react-bootstrap-icons'

class Sidebar extends Component {


      render() {
      
    return(
        <>
        <nav id="sidebar" className={this.props.showMenu ? '' : 'active' }>
        <ul className="list-unstyled components">
    
                <li>
                    <NavLink to={'/page/37'} title="Petunjuk" alt="Petunjuk">
                    <img src="/images/iconpack/innovation.png" alt="" width="40" /><br/><span>Petunjuk</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/page/18'} title="Jalur Penerimaan" alt="Jalur Penerimaan">
                    <img src="/images/iconpack/paper-plane.png" alt="" width="40" /><br/><span>Jalur Penerimaan</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/page/36'} title="Fakultas &amp; Progdi" alt="Fakultas &amp; Progdi">
                    <img src="/images/iconpack/university.png" alt="" width="40" /><br/><span>Fakultas &amp; Prodi</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/page/38'} title="Biaya Pendidikan" alt="Biaya Pendidikan">
                    <img src="/images/iconpack/005-money.png" alt="" width="40" /><br/><span>Biaya Pendidikan</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/page/30/'} title="Beasiswa" alt="Beasiswa">
                    <img src="/images/iconpack/student.png" alt="" width="40" /><br/><span>Beasiswa</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/page/35'} title="Fasilitas" alt="Fasilitas">
                    <img src="/images/iconpack/045-computer.png" alt="" width="40" /><br/><span>Fasilitas</span>
                    </NavLink>
                </li>
                
            </ul>
        </nav>
      
        </>

    )

}
}

export default Sidebar
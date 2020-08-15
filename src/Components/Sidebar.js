import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import { ArrowUpRightCircle, Building, FileEarmarkText, Signpost2, Grid, Folder, Display } from 'react-bootstrap-icons'

class Sidebar extends Component {


      render() {
      
    return(
        <>
     
        <nav id="sidebar" className={this.props.showMenu ? '' : 'active' }>
        <ul className="list-unstyled components">
    
                <li>
                    <NavLink to={'/page/37'} title="Petunjuk" alt="Petunjuk">
                    <Signpost2 size={28} /><br/><span>Petunjuk</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/page/18'} title="Jalur Penerimaan" alt="Jalur Penerimaan">
                    <ArrowUpRightCircle size={28} /><br/><span>Jalur Penerimaan</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/page/36'} title="Fakultas &amp; Progdi" alt="Fakultas &amp; Progdi">
                    <Building size={28} /><br/><span>Fakultas &amp; Prodi</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/page/38'} title="Biaya Pendidikan" alt="Biaya Pendidikan">
                    <FileEarmarkText size={28} /><br/><span>Biaya Pendidikan</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/page/30/'} title="Beasiswa" alt="Beasiswa">
                    <Folder size={28} /><br/><span>Beasiswa</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/page/35'} title="Fasilitas" alt="Fasilitas">
                    <Display size={28} /><br/><span>Fasilitas</span>
                    </NavLink>
                </li>
                
            </ul>
        </nav>
      
        </>

    )

}
}

export default Sidebar
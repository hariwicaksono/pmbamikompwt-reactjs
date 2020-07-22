import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {Button} from 'react-bootstrap'
import {X} from 'react-bootstrap-icons'

const SearchResults = (props) => {
  
  const options = props.data.map(r => (
  <div className="text-dark" key={r.nodaf}>
    <h6><Link to="">{r.nama}</Link> - <small>{r.nodaf}</small><br/>
  <small>Status: <strong><em><u>{r.syarat2 === 'Sudah' ? 'Diterima' : 'Belum Diterima'}</u></em></strong></small></h6>
   
  </div>
   
  ))

  const [show, setShow] = useState(true);

  if (show) {
    return (
      <div id="searchResult" className="col-md-5 mt-1" style={{paddingLeft:0}}>
      <div className="card card-body">
       {options}
      
        <div className="d-flex justify-content-end">
          <Button size="sm" onClick={() => setShow(false) + window.location.reload(true)} variant="warning">
            <X size="18" />
          </Button>
        </div>
      </div>

   </div>
    );
    
  }
  return true;
}

export default SearchResults
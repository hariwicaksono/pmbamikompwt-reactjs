import React, {useState} from 'react'
import {Alert,Button} from 'react-bootstrap'
import {X} from 'react-bootstrap-icons'

const SearchResults = (props) => {
  
  const options = props.data.map(r => (
  <div className="text-dark" key={r.nodaf}>
    <h5>No. Daftar: {r.nodaf}<br/>Nama: {r.nama}<br/>
   Status: <strong><u>{r.syarat2 == 'Sudah' ? 'Diterima' : 'Belum Diterima'}</u></strong></h5>
   
  </div>
   
  ))

  const [show, setShow] = useState(true);

  if (show) {
    return (
      <Alert variant="secondary" className="mt-2">
       {options}
       <hr className="mb-2 mt-3" />
        <div className="d-flex justify-content-end">
          <Button onClick={() => setShow(false) + window.location.reload(true)} variant="outline-warning">
            <X size="16" /> Tutup
          </Button>
        </div>
      </Alert>
      
    );
    
  }
  return true;
}

export default SearchResults
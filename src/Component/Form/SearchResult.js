import React from 'react'
import {Card} from 'react-bootstrap'


const SearchResults = (props) => {
    
  const options = props.data.map(r => (

    <Card key={r.nodaf}>


    <Card.Body>
  <Card.Title>{r.nama} - {r.nodaf}</Card.Title>
    <Card.Text>
     <em>{r.syarat2 == 'Sudah' ? 'Diterima' : 'Tidak Diterima'}</em>
    </Card.Text>
  
    </Card.Body>

    </Card>
    
  ))
  return <div>{options}</div>
}

export default SearchResults
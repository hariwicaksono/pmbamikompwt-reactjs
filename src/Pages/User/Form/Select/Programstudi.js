import React, { Component } from 'react'

class Programstudi extends Component {

    render() {
        const List = this.props.data.map(p => (
            <option key={p.KD_DEPT} value={p.KD_DEPT}>{p.NAMA_DEPT_id}</option>
        ))
        return (
           <>
            {List}
           </>
        )
    }
}

export default Programstudi
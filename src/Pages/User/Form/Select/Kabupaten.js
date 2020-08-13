import React, { Component } from 'react'

class Kabupaten extends Component {

    render() {
        const List = this.props.data.map(p => (
            <option key={p.KdKab} value={p.KdKab}>{p.NamaKab}</option>
        ))
        return (
           <>
            {List}
           </>
        )
    }
}

export default Kabupaten
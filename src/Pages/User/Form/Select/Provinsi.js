import React, { Component } from 'react'

class Provinsi extends Component {

    render() {
        const List = this.props.data.map(p => (
            <option key={p.kdProp} value={p.kdProp}>{p.NamaProp}</option>
        ))
        return (
           <>
            {List}
           </>
        )
    }
}

export default Provinsi
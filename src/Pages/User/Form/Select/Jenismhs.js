import React, { Component } from 'react'

class Jenismhs extends Component {

    render() {
        const List = this.props.data.map(p => (
            <option key={p.ID_JENISMHS} value={p.ID_JENISMHS}>{p.NAMA}</option>
        ))
        return (
           <>
            {List}
           </>
        )
    }
}

export default Jenismhs
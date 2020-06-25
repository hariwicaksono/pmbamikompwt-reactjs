import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {Card} from 'react-bootstrap'

class Soal extends Component {
    constructor(props){
        super(props)
        this.state={
            pil: "pilihan"
            
        }
       

    }


    render() {
        const Jumlah = this.props.data.length
        const ListSoal = this.props.data.map(soal => (
            
            <div key={soal.id_soal}>
                <input type="hidden" name="id[]" value={soal.id_soal}/>
                <input type="hidden" name="jumlah" value={Jumlah}/>
                
                <Card>
                <Card.Header as="h5">{soal.soal} ?</Card.Header>
                <Card.Body>
    
    
                    <div className="form-check">
                        <input name={this.state.pil+'['+soal.id_soal+']'} type="radio" value="A"/> 
                        <label className="form-check-label" style={{'font-size':'18px'}}>
                        &nbsp;&nbsp;A.&nbsp;{soal.a}
                        </label>
                    </div>
                    <div className="form-check">
                        <input name={this.state.pil+'['+soal.id_soal+']'} type="radio" value="B"/> 
                        <label className="form-check-label" style={{'font-size':'18px'}}>
                        &nbsp;&nbsp;B.&nbsp;{soal.b}
                        </label>
                    </div>
                    <div className="form-check">
                        <input name={this.state.pil+'['+soal.id_soal+']'} type="radio" value="C" /> 
                        <label className="form-check-label" style={{'font-size':'18px'}}>
                        &nbsp;&nbsp;C.&nbsp;{soal.c}
                        </label>
                    </div>
                    <div className="form-check">
                        <input name={this.state.pil+'['+soal.id_soal+']'} type="radio" value="D" /> 
                        <label className="form-check-label" style={{'font-size':'18px'}}>
                        &nbsp;&nbsp;D.&nbsp;{soal.d}
                        </label>
                    </div>
                    <div className="form-check">
                        <input name={this.state.pil+'['+soal.id_soal+']'} type="radio" value="E" /> 
                        <label className="form-check-label" style={{'font-size':'18px'}}>
                        &nbsp;&nbsp;E.&nbsp;{soal.e}
                        </label>
                    </div>
                    
                    
                    </Card.Body>
                    </Card>
                    <br/>
            </div>
        ))
        return (
            <div>
                <form onSubmit={this.handlerSubmit} >
                <div className="row">

                <div className="col-md-10" style={{'max-height': '500px','overflow-y': 'auto'}}>
                    {ListSoal}
                </div>

                <div className="col-md-2">
                <input type="submit" className="btn btn-primary btn-block" name="submit" value="Jawab" />
                </div>

                </div>
            
            </form>
            </div>
        )
    }
}

export default Soal
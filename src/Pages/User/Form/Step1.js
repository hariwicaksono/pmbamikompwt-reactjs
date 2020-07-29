import React , { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import validate from '../../../Component/Form/Validation';
import FormInput from '../../../Component/Form/FormInput';
import FormCheck from '../../../Component/Form/FormCheck';
import FormSelect from '../../../Component/Form/FormSelect';
import {
  mobile,
  captialize,
  age
} from '../../../Component/Form/Normalize';
import {
  Button,
  Form,
  FormLabel,
  Card,
  Col
} from 'react-bootstrap';
import { ChevronRight } from 'react-bootstrap-icons';
import API from '../../../ServiceApi/Index'
import { isLogin } from '../../../Utils'

class Step1 extends Component {
  constructor(props) {
    super(props)
    this.state = {
        id: '',
        nama: ''
        
    }
    
  }
  componentDidMount = () => {
    if (isLogin()) {
       //console.log('LOGIN')
       const data = JSON.parse(sessionStorage.getItem('isLogin'))
            const id = data[0].username
            API.GetUserId(id).then(res=>{
                this.setState({
                    id : res.username,
                    nama: res.nama, 
                })
            })
            
    } else {
        this.setState({
            login:true
        })
    }
}
  render(){

  const { handleSubmit } = this.props;
  return (
    <Form noValidate onSubmit={handleSubmit}>
      
      <Form.Row>
        <Col md={7}>
        
          <Field name="nama" type="text" component={FormInput} label="Nama Lengkap *" inputPlaceHolder="Nama Lengkap" normalize={captialize} />
        </Col>
        <Col md={5}>
          <Field name="nik" type="text" component={FormInput} label="NIK KTP *" inputPlaceHolder="Nomor NIK / KTP" normalize={captialize} />
        </Col>
      </Form.Row>  
      <Form.Row>
        <Col>
        <Field name="tempatlahir" type="text" component={FormInput} label="Tempat Lahir *" inputPlaceHolder="Tempat Lahir" normalize={captialize} />
        </Col>
      <Col>
      <Field name="tgllahir" type="date" component={FormInput} label="Tanggal Lahir *" />
      </Col>
      </Form.Row>

      <Form.Row>
      <Col> 
    
       <FormLabel>Jenis Kelamin *</FormLabel><br/>
       
        <Field inline name="jk" component={FormCheck} type="radio" value="Pria" label="Laki-Laki" />
        
        <Field inline name="jk" component={FormCheck} type="radio" value="Wanita" label="Perempuan"/>

      </Col>
      <Col>
      <Field name="agama" component={FormSelect} label="Agama *" >
          <option />
          <option value="I">Islam</option>
          <option value="P">Protestan</option>
          <option value="K">Katholik</option>
          <option value="B">Budha</option>
          <option value="H">Hindu</option>
          <option value="L">Lainnya</option>
      </Field>
      </Col>

      </Form.Row>
      <Form.Row>
      <Col>
        <Field name="telepon" type="text" component={FormInput} label="Telp/HP *" inputPlaceHolder="Nomor Telp/HP" normalize={captialize} />
        </Col>
      <Col>
      <Field name="email" type="email" component={FormInput} label="Email *" inputPlaceHolder="Alamat Email" />
      </Col>

      </Form.Row>

      <Form.Group>
        <Button color="primary" className="float-right" type="submit">
            Selanjutnya <ChevronRight />
        </Button>
      </Form.Group>

    </Form>
  );
};
}

Step1.propTypes = {
  handleSubmit: PropTypes.func
};

export default reduxForm({
  form: 'wizardForm',
  initialValues: {
        nama: 'Dan'
  },
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
})(Step1);

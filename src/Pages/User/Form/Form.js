import React, { Fragment, useState } from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import FormInput from '../../../Component/Form/FormInput';
import FormCheck from '../../../Component/Form/FormCheck';
import FormSelect from '../../../Component/Form/FormSelect';
import RadioCustom from '../../../Component/Form/FormRadioCustom';
import validation from '../../../Component/Form/Validation';
import { Row, Col, FormLabel, Card, Button } from 'react-bootstrap';
import API from '../../../ServiceApi/Index'
import { isLogin } from '../../../Utils'

const Step1Schema = Yup.object().shape({
  picked: Yup.string().required("Jenis Pendaftaran harus dipilih"),
});

const Step2Schema = Yup.object().shape({
  nama: Yup.string().required("First Name Is Required"),
  nik: Yup.string().required("Middle Name Is Required").typeError("Harus berupa angka"),
  tempatlahir: Yup.string().required("Sir Name Is Required"),
  tgllahir: Yup.string().required("Pet is required"),
  jk: Yup.string().required("Email Is Required"),
  agama: Yup.string().required("Email Is Required"),
  telepon: Yup.number().required('Nomor Telepon atau HP harus diisi').typeError("Harus berupa angka"),
  email: Yup.string().email('Harus berupa email yang valid').required("Email Is Required"),
});
const Step3Schema = Yup.object().shape({
 //favoriteColor: Yup.string().required("Favorite color required"),
});

const initialValues = {
  picked: "",
  nama: "",
  nik: "",
  tempatlahir: "",
  tgllahir: "",
  jk:"",
  agama:"",
  email: "",
  telepon: "",
};

const schemaArray = [Step1Schema, Step2Schema];

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

//const required = value => (value ? undefined : "Required");

class Wizard extends React.Component {
  static Page = ({ children, parentState }) => {
    return children(parentState);
  };
 
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      values: props.initialValues,
      nama: ""
    };
  }

  next = values =>
    this.setState(state => ({
      page: Math.min(state.page + 1, this.props.children.length - 1),
      values,
    }));

  previous = () =>
    this.setState(state => ({
      page: Math.max(state.page - 1, 0),
    }));

  //validate = values => {
    //const activePage = React.Children.toArray(this.props.children)[
      //this.state.page
    //];
    //return activePage.props.validate ? activePage.props.validate(values) : {};
  //};

  handleSubmit = (values, bag) => {
    const { children, onSubmit } = this.props;
    const { page } = this.state;
    const isLastPage = page === React.Children.count(children) - 1;
    if (isLastPage) {
      return onSubmit(values, bag);
    } else {
      bag.setTouched({});
      bag.setSubmitting(false);
      this.next(values);
    }
  };

  arrayProgress = [
    {
      title: "Jenis Daftar",
      //description: "Biodata Pendaftar",
    },
    {
      title: "Data Diri",
      //description: "Biodata Pendaftar",
    },
    {
      title: "Data Alamat",
      //description: "Alamat Pendaftar dan Orang Tua",
    },
    {
      title: "Data Pendidikan",
      //description: "Sekolah asal dan Jurusan Pilihan",
    },
  ];
  render() {
    const { children } = this.props;
    const { page, values } = this.state;
    const activePage = React.Children.toArray(children)[page];
    const totalSteps = React.Children.count(children);
    console.log(activePage, "activePage");
    const isLastPage = page === React.Children.count(children) - 1;
    return (
      <Formik
        initialValues={values}
        enableReinitialize={false}
        // validate={this.validate}
        // validationSchema={this.schemaArray[page]}
        validationSchema={schemaArray[page]}
        onSubmit={this.handleSubmit}
        //validate={validation}
      >
        {props => {
          const { handleSubmit, isSubmitting  } = props;
          return (
            <Form onSubmit={handleSubmit}>
              
              <div className="c_breadcrumb mb-2" >
              <ul className="nav nav-pills nav-tabs nav-fill">
                  {this.arrayProgress.map((item, index) => {
                    
                    return (
                      <li className="nav-item">
                      <a href="" onClick={(e) => e.preventDefault()} className={page >= index ? "nav-link active" : "nav-link"}>
                        
                          {item.title}
                          {/*{item.description}*/}
                       
                      </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
           
              <h6 className="text-primary">
                LANGKAH {page + 1} DARI {totalSteps}
              </h6>

              {React.cloneElement(activePage, { parentState: { ...props } })}

              <Row>
                <Col>
                 
                    {page > 0 &&
                      <Button
                        variant="primary"
                        onClick={this.previous}
                      >
                        « Previous
                      </Button>}

                    {!isLastPage && <Button variant="primary" className="float-right" type="submit">Next »</Button>}
                    {isLastPage &&
                      <Button variant="primary" type="submit" disabled={isSubmitting}>
                        Submit
                      </Button>}
                  
                </Col>
              </Row>

            </Form>
          );
        }}
      </Formik>
    );
  }
}

export const App = () => {
  return (
    <>
    
      <Wizard
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          sleep(300).then(() => {
            window.alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          });
        }}
      >
         <Wizard.Page>
          {props => {
            console.log(props, "this first");
            return (
              <Fragment>
                <h3 style={{fontWeight:"700"}} className="mb-1">Jenis Pendaftaran</h3>
              <h5 className="mb-3">Jenis Pendaftaran Reguler dan Beasiswa</h5>
              
                <FormLabel style={{fontWeight:"600"}}>1. Apakah anda Memiliki Kartu KIP-Kuliah? *</FormLabel>
                <Row>
                <Col md="6">
                <label>
                <Field name="picked" component={RadioCustom} type="radio" value="Reguler" label="Reguler" className="card-input-element d-none" id="REG" />
                <div className="card card-body bg-light d-flex flex-row justify-content-between align-items-center" style={{height: "5rem", fontWeight: "600"}}>TIDAK, Daftar Reguler</div>
                </label>
                </Col>

                <Col md="6">
                <label>
                <Field name="picked" component={RadioCustom} type="radio" value="Bidikmisi" label="KIP-Kuliah" className="card-input-element d-none" id="KIPK" />
                <div className="card card-body bg-light d-flex flex-row justify-content-between align-items-center" style={{height: "5rem", fontWeight: "600"}}>YA, Ada Kartu KIP-Kuliah</div>
                </label>
                </Col>  
                </Row>

            <div>Picked: {props.values.picked}</div> 
            </Fragment>
            );
          }}
        </Wizard.Page>

        <Wizard.Page>
          {props => {
            
            console.log(props, "this props 1");
            return (
              
              <Fragment>
                <h3 style={{fontWeight:"700"}} className="mb-1">Data Pribadi</h3>
              <h5 className="mb-3">Isikan data pribadi anda. Semua kolom wajib diisi</h5>
                <div className="row">
                <Col md={7}>
                <Field name="nama" component={FormInput} type="text" label="Nama Lengkap" placeholder="Nama Lengkap anda" />
                </Col>
                <Col md={5}>
                <Field name="nik" component={FormInput} type="text" label="Nomor NIK/KTP" />
                </Col>

                </div>
                <div className="row">
                <Col md={6}>
                <Field name="tempatlahir" type="text" component={FormInput} label="Tempat Lahir *" />   
                </Col>
                <Col md={6}>      
                <Field name="tgllahir" type="text" component={FormInput} label="Tanggal Lahir *" />
                </Col>
                </div>

                <div className="row">
                <Col md={6}>
                <div class="form-group">
                <FormLabel style={{fontWeight:"600"}}>Jenis Kelamin *</FormLabel><br/>
                <Field name="jk" component={FormCheck} type="radio" value="Pria" label="Laki-Laki" />
                <Field name="jk" component={FormCheck} type="radio" value="Wanita" label="Perempuan"/>
                </div>
                </Col>
                <Col md={6}>
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
                </div>
                <div className="row">
                <Col md={6}>
                <Field name="telepon" type="text" component={FormInput} label="Telp/HP *" />
                </Col>
                <Col md={6}>  
                <Field name="email" type="email" component={FormInput} label="Email *" />
                </Col>
                </div>
              </Fragment>
            );
          }}
        </Wizard.Page>
        <Wizard.Page>
          {props => {
            console.log(props, "this props last");
            return (
              <Fragment>
                <div>
                  <Row>
                    <Col>
                      
                    </Col>
                    <Col>
                     
                    </Col>
                  </Row>
                </div>
              </Fragment>
            );
          }}
        </Wizard.Page>
        <Wizard.Page>
          {props => {
            console.log(props, "this props last");
            return (
              <Fragment>
                <div>
                  <Row>
                    <Col>
                      
                    </Col>
                    <Col>
                     
                    </Col>
                  </Row>
                </div>
              </Fragment>
            );
          }}
        </Wizard.Page>
      </Wizard>
    </>
  );
};

export default App;
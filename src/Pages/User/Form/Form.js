import React, { Fragment } from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Container, Row, Col, FormGroup, FormLabel, Button } from 'react-bootstrap';
import FormInput from '../../../Components/Form/FormInput';
import FormCheck from '../../../Components/Form/FormCheck';
import FormSelect from '../../../Components/Form/FormSelect';
import RadioCustom from '../../../Components/Form/FormRadioCustom';
import SelectJenismhs from '../Form/Select/Jenismhs';
import SelectProgramstudi from '../Form/Select/Programstudi';
import API from '../../../ServiceApi/Index'

const Step1Schema = Yup.object().shape({
  status_registrasi: Yup.string().required("Jenis Pendaftaran harus dipilih"),
  jenis_mhs: Yup.string().required("Jenis Mahasiswa harus dipilih"),
  pilihan1: Yup.string().required("Program Studi Pilihan 1 harus dipilih"),
  pilihan2: Yup.string().required("Program Studi Pilihan 2 harus dipilih"),
  pilihan3: Yup.string().required("Program Studi Pilihan 3 harus dipilih"),
  info: Yup.string().required("Info PMB harus dipilih")
});
 
const Step2Schema = Yup.object().shape({
  nama: Yup.string().required("Nama Lengkap harus diisi"),
  nik: Yup.string().required("Nomor NIK/KTP harus diisi").typeError("Harus berupa angka"),
  tempatlahir: Yup.string().required("Tempat lahir harus diisi"),
  tgllahir: Yup.string().required("Tanggal lahir harus diisi"),
  jk: Yup.string().required("Jenis kelamin harus dipilih"),
  agama: Yup.string().required("Agama harus dipilih"),
  telepon: Yup.number().required('Nomor Telepon atau HP harus diisi').typeError("Harus berupa angka"),
  email: Yup.string().email('Harus berupa email yang valid').required("Email harus diisi"),
});
const Step3Schema = Yup.object().shape({
 //favoriteColor: Yup.string().required("Favorite color required"),
});

const initialValues = {
  jenis_mhs: "",
  status_registrasi: "",
  kelas:"",
  pilihan1:"",
  pilihan2:"",
  pilihan3:"",
  info:[],
  nama: "",
  nik: "",
  tempatlahir: "",
  tgllahir: "",
  jk:"",
  agama:"",
  email: "",
  telepon: "",
};

const schemaArray = [Step1Schema, Step2Schema, Step3Schema];

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
    const { page, values, selectOptions } = this.state;
    const activePage = React.Children.toArray(children)[page];
    const totalSteps = React.Children.count(children);
    console.log(selectOptions);
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
          const { handleSubmit, isSubmitting } = props;
          return (

            <Form onSubmit={handleSubmit}>
               <Container>
              <div className="c_breadcrumb mb-3" >
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
                        className="mr-2"
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
              </Container>

            </Form>
          );
        }}
      </Formik>
    );
  }
}

class Jenismhs extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      select : []
    }
  }
 
   componentDidMount(){
   
    API.GetJenisMhs().then(res=>{
      //console.log(res)
      this.setState({
        select: res
      })
  });  
   }

  render() {
    return <>
     <Field name="jenis_mhs" component={FormSelect} label="Jenis Pendaftaran *">
       <option>Pilih Jenis</option>
        <SelectJenismhs data={this.state.select} />  
      </Field>

    </>;
  }
}

class Programstudi extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      select : []
    }
  }
 
   componentDidMount(){
   
    API.GetProdi().then(res=>{
      //console.log(res)
      this.setState({
        select: res
      })
  });  
   }

  render() {
    return <>
    <Row>
    <Col>
    <Field name="pilihan1" component={FormSelect} label="Pilihan 1 *">
       <option>Pilih Program Studi</option>
        <SelectProgramstudi data={this.state.select} />  
      </Field>
    </Col>
    <Col>
    <Field name="pilihan2" component={FormSelect} label="Pilihan 2 *">
       <option>Pilih Program Studi</option>
        <SelectProgramstudi data={this.state.select} />  
      </Field>
    </Col>
<Col>
<Field name="pilihan3" component={FormSelect} label="Pilihan 3 *">
       <option>Pilih Program Studi</option>
        <SelectProgramstudi data={this.state.select} />  
      </Field>
</Col>

    </Row>
     

    </>;
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
            
           console.log(props, "this props 1");
            return (
              
              <Fragment>
                <h3 style={{fontWeight:"700"}} className="mb-1">Data Alamat</h3>
              <h5 className="mb-3">Isikan data Alamat dan Orang tua anda. Semua kolom wajib diisi</h5>
              <Row>

              <Col>

                <Row>
                <Col md={12}>
                <Field name="alamat" component={FormInput} type="text" label="Alamat Lengkap *" placeholder="Alamat lengkap anda" />
                </Col>
                </Row>

                <Row>
                <Col md={3}>
                <Field name="rt" type="text" component={FormInput} label="RT *" placeholder="RT" maxlength="2" />   
                </Col>
                <Col md={3}>
                <Field name="rw" type="text" component={FormInput} label="RW *" placeholder="RW" maxlength="2" />   
                </Col>
                <Col md={6}>      
                <Field name="kelurahan" type="text" component={FormInput} label="Desa/Kelurahan *" placeholder="Desa/Kelurahan" />
                </Col>
                </Row>

                <Row>
                <Col md={6}>
                <Field name="kecamatan" type="text" component={FormInput} label="Kecamatan *" placeholder="Kecamatan" />
                </Col>
                <Col md={6}>
                <Field name="kodepos" type="text" component={FormInput} label="Kode Pos *" placeholder="Kode Pos" />
                </Col>
                </Row>

                <Row>
                <Col md={6}>
                
                </Col>
                <Col md={6}>  
               
                </Col>
                </Row>


                </Col>

                <Col>
                
                
                </Col>
                </Row>

              </Fragment>
            );
          }}
        </Wizard.Page>

         <Wizard.Page>
          {props => {

            return (
              <Fragment>
             
              <h3 style={{fontWeight:"700"}} className="mb-1">Jenis Pendaftaran</h3>
              <h5 className="mb-4">Jenis Pendaftaran Reguler dan Beasiswa</h5>

                <FormGroup>
                <FormLabel style={{fontWeight:"600"}}>Apakah anda Memiliki Kartu KIP-Kuliah? *</FormLabel>
                
                <Row>
               
                <Col md={6}>
                <label>
                <Field name="status_registrasi" component={RadioCustom} type="radio" value="Hanya Daftar" label="Reguler" className="card-input-element d-none" id="REG" />
                <div className="card card-body bg-light d-flex flex-row justify-content-between align-items-center" style={{height: "5rem", fontWeight: "600"}}>TIDAK, Daftar Reguler</div>
                </label>
                </Col>
                <Col md={6}>
                <label>
                <Field name="status_registrasi" component={RadioCustom} type="radio" value="Bidikmisi" label="KIP-Kuliah" className="card-input-element d-none" id="KIPK" />
                <div className="card card-body bg-light d-flex flex-row justify-content-between align-items-center" style={{height: "5rem", fontWeight: "600"}}>YA, Ada Kartu KIP-Kuliah</div>
                </label>
                
                </Col>
               
                </Row>
                {props.values.status_registrasi === "Bidikmisi" &&
                <><Field name="no_kipk" component={FormInput} type="number" label="Nomor KIP-Kuliah" /></>}
                </FormGroup>

                <Row>
               
               <Col md={6}>
               <Jenismhs />
                </Col>
         
               
                <Col md={6}>
                <FormGroup>
                <FormLabel style={{fontWeight:"600"}}>Kelas *</FormLabel>
                <select name="kelas">
                {(props.values.jenis_mhs === "1" || props.values.jenis_mhs === "2" ) &&
                <>
                <option value="Pagi" label="Pagi" />
                </>}
                {props.values.jenis_mhs === "3" &&
                <>
                <option value="Transfer" label="Transfer" />
                </>}
                {props.values.jenis_mhs === "4" &&
                <>
                <option value="Sore" label="Sore" />
                </>}
                </select>
                </FormGroup>
                </Col>
                </Row>

            
                <Programstudi/>
                  

               
                <FormGroup>
                <FormLabel style={{fontWeight:"600"}}>Informasi tentang Universitas Amikom Purwokerto *</FormLabel><br/>
                    <Field name="info" component={FormCheck} type="checkbox" value="brosur" label="Brosur" />
                    <Field name="info" component={FormCheck} type="checkbox" value="televisi" label="Televisi"/>
                    <Field name="info" component={FormCheck} type="checkbox" value="internet" label="Internet"/>
                    <Field name="info" component={FormCheck} type="checkbox" value="teman/Saudara" label="Teman/Saudara"/>
                    <Field name="info" component={FormCheck} type="checkbox" value="lainnya" label="Lainnya"/>
                </FormGroup>
               
               
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
                <Field name="nik" component={FormInput} type="text" label="Nomor NIK/KTP" placeholder="Nomor NIK/KTP" />
                </Col>

                </div>
                <div className="row">
                <Col md={6}>
                <Field name="tempatlahir" type="text" component={FormInput} label="Tempat Lahir *" placeholder="Tempat Lahir" />   
                </Col>
                <Col md={6}>      
                <Field name="tgllahir" type="text" component={FormInput} label="Tanggal Lahir *" />
                </Col>
                </div>

                <div className="row">
                <Col md={6}>
                <div className="form-group">
                <FormLabel style={{fontWeight:"600"}}>Jenis Kelamin *</FormLabel><br/>
                <Field name="jk" component={FormCheck} type="radio" value="Pria" label="Laki-Laki" />
                <Field name="jk" component={FormCheck} type="radio" value="Wanita" label="Perempuan"/>
                </div>
                </Col>
                <Col md={6}>
                <Field name="agama" component={FormSelect} label="Agama *" >
                    <option>Pilih Agama</option>
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
                <Field name="telepon" type="text" component={FormInput} label="Telp/HP *" placeholder="Nomor Telepon/HP" />
                </Col>
                <Col md={6}>  
                <Field name="email" type="email" component={FormInput} label="Email *" placeholder="yourname@mail.com" />
                </Col>
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
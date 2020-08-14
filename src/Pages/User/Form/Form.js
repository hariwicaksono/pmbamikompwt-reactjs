import React, { Fragment } from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Container, Row, Col, Alert, FormGroup, FormLabel, Button } from 'react-bootstrap';
import {Check2Circle} from 'react-bootstrap-icons';
import FormInput from '../../../Components/Form/FormInput';
import FormCheck from '../../../Components/Form/FormCheck';
import FormSelect from '../../../Components/Form/FormSelect';
import RadioCustom from '../../../Components/Form/FormRadioCustom';
import SelectJenismhs from '../Form/Select/Jenismhs';
import SelectProgramstudi from '../Form/Select/Programstudi';
import PropKab from './PropKab';
import PropKabOrtu from './PropKab_ortu';
import API from '../../../ServiceApi/Index'

const Step1Schema = Yup.object().shape({
  status_registrasi: Yup.string().required("Jenis Pendaftaran harus dipilih"),
  no_kipk: Yup.number().typeError("Harus berupa angka, boleh menggunakan titik.").transform((_, value) => {
    if (value.includes(',')) {
      return null;
    }
  })
  .positive(),
  //jenis_mhs: Yup.string().required("Jenis Mahasiswa harus dipilih"),
  //pilihan1: Yup.string().required("Program Studi Pilihan 1 harus dipilih"),
  //pilihan2: Yup.string().required("Program Studi Pilihan 2 harus dipilih"),
  //pilihan3: Yup.string().required("Program Studi Pilihan 3 harus dipilih"),
  //info: Yup.string().required("Info PMB harus dipilih")
});

const Step2Schema = Yup.object().shape({
  jenis_mhs: Yup.string().required("Jenis Mahasiswa harus dipilih"),
  kelas: Yup.string().required("Kelas harus dipilih"),
  pilihan1: Yup.string().required("Program Studi Pilihan 1 harus dipilih"),
  pilihan2: Yup.string().required("Program Studi Pilihan 2 harus dipilih"),
  //pilihan3: Yup.string().required("Program Studi Pilihan 3 harus dipilih"),
  info: Yup.string().required("Info PMB harus dipilih")
});
 
const Step3Schema = Yup.object().shape({
  nama: Yup.string().required("Nama Lengkap harus diisi"),
  nik: Yup.number().required("Nomor NIK/KTP harus diisi").typeError("Harus berupa angka"),
  tempatlahir: Yup.string().required("Tempat lahir harus diisi"),
  tgllahir: Yup.string().required("Tanggal lahir harus diisi"),
  jk: Yup.string().required("Jenis kelamin harus dipilih"),
  agama: Yup.string().required("Agama harus dipilih"),
  telepon: Yup.number().required('Nomor Telepon atau HP harus diisi').typeError("Harus berupa angka"),
  email: Yup.string().email('Harus berupa email yang valid').required("Email harus diisi"),
});
const Step4Schema = Yup.object().shape({
  propinsi: Yup.string().required("Provinsi harus dipilih"), 
  kabupaten: Yup.string().required("Kabupaten harus dipilih"), 
  alamat: Yup.string().required("Alamat Lengkap harus diisi"), 
  rt: Yup.number().required("RT harus diisi").typeError("Harus berupa angka"),
  rw: Yup.number().required("RW harus diisi").typeError("Harus berupa angka"),
  kelurahan: Yup.string().required("Kelurahan harus diisi"), 
  kecamatan: Yup.string().required("Kecamatan harus diisi"), 
  kodepos: Yup.string().required("Kodepos harus diisi"), 
  propinsi_ortu: Yup.string().required("Provinsi harus dipilih"), 
  kabupaten_ortu: Yup.string().required("Kabupaten harus dipilih"), 
  alamat_ortu: Yup.string().required("Alamat Lengkap harus diisi"), 
  rt_ortu: Yup.number().required("RT harus diisi").typeError("Harus berupa angka"),
  rw_ortu: Yup.number().required("RW harus diisi").typeError("Harus berupa angka"),
  kelurahan_ortu: Yup.string().required("Kelurahan harus diisi"), 
  kecamatan_ortu: Yup.string().required("Kecamatan harus diisi"), 
  kodepos_ortu: Yup.string().required("Kodepos harus diisi"), 
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
  propinsi:"",
  kabupaten:"",
  alamat:"",
  rt:"",
  rw:"",
  kelurahan:"",
  kecamatan:"",
  kodepos:"",
  nama_ortu:"",
  alamat_ortu:"",
  rt_ortu:"",
  rw_ortu:"",
  kelurahan_ortu:"",
  kecamatan_ortu:"",
  kabupaten_ortu:"",
  propinsi_ortu:"",
  kodepos_ortu:"",
  telp_ortu:""
};

const schemaArray = [Step1Schema, Step2Schema, Step3Schema, Step4Schema];

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
      title: "Program Studi",
      //description: "Biodata Pendaftar",
    },
    {
      title: "Data Diri",
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
                 <Row>
               <div className="progressbar-wrapper">
              <ul className="progressbar">
                  {this.arrayProgress.map((item, index) => {
                    
                    return (
                      <li className={page >= index ? "active" : ""}>
                        
                          {item.title}
                          {/*{item.description}*/}

                      </li>
                    );
                  })}
                </ul>
              </div>
              </Row>

              <div>
              <h6 className="text-primary">
                LANGKAH {page + 1} DARI {totalSteps}
              </h6>
              </div>

              {React.cloneElement(activePage, { parentState: { ...props } })}
              <hr/>
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
       <option value="">Pilih Jenis</option>
        <SelectJenismhs data={this.state.select} />  
      </Field>

    </>;
  }
}

class ProgramstudiReg extends React.Component {
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
       <option value="">Pilihan 1</option>
        <SelectProgramstudi data={this.state.select} />
      </Field>
    </Col>
    <Col>
    <Field name="pilihan2" component={FormSelect} label="Pilihan 2 *">
       <option value="">Pilihan 2</option>
        <SelectProgramstudi data={this.state.select} />  
      </Field>
    </Col>
  <Col>
  <Field name="pilihan3" component={FormSelect} label="Pilihan 3 *">
        <option value="">Pilihan 3</option>
          <SelectProgramstudi data={this.state.select} />  
        </Field>
  </Col>

    </Row>
     

    </>;
  }
}

class ProgramstudiBswa extends React.Component {
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
       <option value="">Pilihan 1</option>
       <option value="55201">INFORMATIKA</option>
       <option value="55701">SISTEM INFORMASI</option>
      </Field>
    </Col>
    <Col>
    <Field name="pilihan2" component={FormSelect} label="Pilihan 2 *">
       <option value="">Pilihan 2</option>
       <option value="55201">INFORMATIKA</option>
      <option value="55701">SISTEM INFORMASI</option>
      </Field>
    </Col>

    </Row>
     

    </>;
  }
}

class ProgramstudiSore extends React.Component {
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
       <option value="">Pilihan 1</option>
       <option value="55201">INFORMATIKA</option>
      </Field>
    </Col>
    <Col>
    <Field name="pilihan2" component={FormSelect} label="Pilihan 2 *">
       <option value="">Pilihan 2</option>
       <option value="55201">INFORMATIKA</option>
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
        onSubmit={(values, actions, { setSubmitting, resetForm }) => {
          sleep(300).then(() => {
            window.alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(true);
            //setSubmitting(false);
            // resetForm(initialValues); // this will reset all the form fields
            
          });
        }}
        
      >

<Wizard.Page>
{props => {
  const {
    values
  } = props;
 //console.log(props, "this props 1");
  return (
    
    <Fragment>
    <h3 style={{fontWeight:"700"}} className="mb-1">Jenis Pendaftaran</h3>
    <h5 className="mb-5">Jenis Pendaftaran Reguler dan Beasiswa</h5>

    <Container>
      <FormGroup>
      <h4 className="text-center mb-3">Apakah anda memiliki Kartu KIP-Kuliah? *</h4>
      
      <Row>
       <Col md={{ span: 8, offset: 2 }}>
      <Row>
     
      <Col md={6}>
      <label>
      <Field name="status_registrasi" component={RadioCustom} type="radio" value="Hanya Daftar" label="Reguler" className="card-input-element d-none" id="REG" />
      <div className="card card-body bg-light d-flex flex-row justify-content-between align-items-center">1. TIDAK ADA<br/>Pendaftaran Reguler</div>
      </label>
      </Col>
      <Col md={6}>
      <label>
      <Field name="status_registrasi" component={RadioCustom} type="radio" value="Bidikmisi" label="KIP-Kuliah" className="card-input-element d-none" id="KIPK" />
      <div className="card card-body bg-light d-flex flex-row justify-content-between align-items-center">2. YA ADA<br/>Punya Kartu KIP-Kuliah</div>
      </label>
      
      </Col>
     
      </Row>
      {values.status_registrasi === "Bidikmisi" &&
      <><Field name="no_kipk" component={FormInput} type="text" label="Masukkan Nomor Kartu KIP-Kuliah *" required /></>}
      </Col>
      </Row>

      
      </FormGroup>

      </Container>
    </Fragment>

  );
}}
</Wizard.Page>

<Wizard.Page>
{props => {
const {
  values
} = props;
  return (
    <Fragment>
   
    <h3 style={{fontWeight:"700"}} className="mb-1">Jenis Mahasiswa &amp; Program Studi</h3>
    <h5 className="mb-3">Pilih Jenis Mahasiswa, Program Studi dan Sumber Informasi Amikom</h5>

      <FormGroup>
     
      <Alert variant="warning" className="mb-0 mt-0">
      {values.status_registrasi === "Hanya Daftar" &&
      <>
     <p className="lead mb-0" style={{fontWeight: "600"}}>Pendaftaran Reguler <Check2Circle size="30"/></p>
    </>}
        {values.status_registrasi === "Bidikmisi" &&
      <>
     <p className="lead mb-0" style={{fontWeight: "600"}}>Pendaftaran Beasiswa KIP-Kuliah <Check2Circle size="30"/></p>
     <span style={{fontWeight: "400"}}>Nomor Kartu: <samp>{values.no_kipk}</samp></span>
    </>}
        
      </Alert>
      
      </FormGroup>

      <Row>
     
      <Col md={6}>
        <Jenismhs />
      </Col>
     
      <Col md={6}>
  
      <Field component={FormSelect} name="kelas" label="Kelas *">
        <option value="">Pilih Kelas</option>
      {(values.jenis_mhs === "1" || values.jenis_mhs === "2" ) &&
      <>
      <option value="Pagi">PAGI</option>
      </>}
      {values.jenis_mhs === "3" &&
      <>
      <option value="Transfer">TRANSFER</option>
      </>}
      {values.jenis_mhs === "4" &&
      <>
      <option value="Sore">SORE</option>
      </>}
      </Field>

      </Col>
      </Row>

      <Row>
        <Col>

        {values.status_registrasi === "Hanya Daftar" && values.jenis_mhs === "1" &&
          <><ProgramstudiReg/></>}

        {values.status_registrasi === "Hanya Daftar" && values.jenis_mhs === "2" &&
          <><ProgramstudiReg/></>}

        {values.status_registrasi === "Hanya Daftar" && values.jenis_mhs === "3" &&
        <><ProgramstudiReg/></>}

        {values.status_registrasi === "Hanya Daftar" && values.jenis_mhs === "4" &&
        <><ProgramstudiSore/></>}

        {values.status_registrasi === "Bidikmisi" && values.jenis_mhs === "1" &&
        <><ProgramstudiBswa/></>}

        {values.status_registrasi === "Bidikmisi" && values.jenis_mhs === "2" &&
        <><ProgramstudiBswa/></>}

        {values.status_registrasi === "Bidikmisi" && values.jenis_mhs === "3" &&
        <><ProgramstudiBswa/></>}

        {values.status_registrasi === "Bidikmisi" && values.jenis_mhs === "4" &&
        <><ProgramstudiSore/></>}
          
        </Col>
      </Row>

      <Row>
        <Col>
      <FormGroup>
      <FormLabel style={{fontWeight:"600"}}>Informasi tentang Universitas Amikom Purwokerto *</FormLabel><br/>
        <div className="ml-2">
          <Field name="info" component={FormCheck} type="checkbox" value="brosur" label=" Brosur" />
          <Field name="info" component={FormCheck} type="checkbox" value="televisi" label=" Televisi"/>
          <Field name="info" component={FormCheck} type="checkbox" value="internet" label=" Internet"/>
          <Field name="info" component={FormCheck} type="checkbox" value="teman/saudara" label=" Teman/Saudara"/>
          <Field name="info" component={FormCheck} type="checkbox" value="lainnya" label=" Lainnya"/>
        </div>
      </FormGroup>
      </Col>
      </Row> 
     
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

      <Wizard.Page>
          {props => {
           const {
            values
          } = props;
           console.log(props, "this props 1");
            return (
              
              <Fragment>
                <h3 style={{fontWeight:"700"}} className="mb-1">Data Alamat</h3>
              <h5 className="mb-3">Isikan data Alamat dan Orang tua anda. Semua kolom wajib diisi</h5>
              
              <Row>
              <Col>

                <FormGroup>
                  <PropKab/>
                </FormGroup>

                  <Row>
                  <Col md={12}>
                  <Field name="alamat" component={FormInput} type="text" label="Alamat Lengkap *" placeholder="Alamat lengkap anda" />
                  </Col>
                  </Row>

                  <Row>
                  <Col md={3}>
                  <Field name="rt" type="number" component={FormInput} label="RT *" placeholder="RT" maxLength="2" />   
                  </Col>
                  <Col md={3}>
                  <Field name="rw" type="number" component={FormInput} label="RW *" placeholder="RW" maxLength="2" />   
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
                
                </Col>

               
                <Col>

                <Row>
                <Col md={12}>
                <Field name="ibu" component={FormInput} type="text" label="Nama Ibu Kandung *" placeholder="Nama Ibu Kandung" />
                
                
                <Field name="telp_ortu" component={FormInput} type="number" label="Nomor HP Orang Tua *" placeholder="Nomor HP Orang Tua" />
                </Col>

                </Row>

                <FormGroup>
                  <PropKabOrtu/>
                </FormGroup>

                <Row>
                <Col md={12}>
                <Field name="alamat_ortu" component={FormInput} type="text" label="Alamat Lengkap Orang Tua*" placeholder="Alamat Orang Tua" value={values.alamat_ortu = values.alamat} />
                </Col>
                </Row>

                <Row>
                <Col md={3}>
                <Field name="rt_ortu" type="text" component={FormInput} label="RT *" placeholder="RT" maxLength="2" value={values.rt_ortu = values.rt} />   
                </Col>
                <Col md={3}>
                <Field name="rw_ortu" type="text" component={FormInput} label="RW *" placeholder="RW" maxLength="2" value={values.rw_ortu = values.rw} />   
                </Col>
                <Col md={6}>      
                <Field name="kelurahan_ortu" type="text" component={FormInput} label="Desa/Kelurahan *" placeholder="Desa/Kelurahan" value={values.kelurahan_ortu = values.kelurahan}/>
                </Col>
                </Row>

                <Row>
                <Col md={6}>
                <Field name="kecamatan_ortu" type="text" component={FormInput} label="Kecamatan *" placeholder="Kecamatan" value={values.kecamatan_ortu = values.kecamatan}/>
                </Col>
                <Col md={6}>
                <Field name="kodepos_ortu" type="text" component={FormInput} label="Kode Pos *" placeholder="Kode Pos" value={values.kodepos_ortu = values.kodepos}/>
                </Col>
                </Row>

                

                </Col>
                </Row>
              </Fragment>
            );

          }}

       
      </Wizard.Page>


      </Wizard>
    </>
  );
};

export default App;
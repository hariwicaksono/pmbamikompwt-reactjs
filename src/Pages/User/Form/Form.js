import React, { Fragment } from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Container, Row, Col, Card, Alert, FormGroup, FormLabel, Button } from 'react-bootstrap';
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
  nama_ortu: Yup.string().required("Nama Ibu Kandung harus diisi"),
  nik: Yup.number().required("Nomor NIK/KTP harus diisi").typeError("Harus berupa angka"),
  tempatlahir: Yup.string().required("Tempat lahir harus diisi"),
  tgl: Yup.string().required("Tanggal lahir harus diisi"),
  bln: Yup.string().required("Bulan lahir harus diisi"),
  thn: Yup.string().required("Tahun lahir harus diisi"),
  jk: Yup.string().required("Jenis kelamin harus dipilih"),
  agama: Yup.string().required("Agama harus dipilih"),
  telepon: Yup.number().required('Nomor Telepon atau HP harus diisi').typeError("Harus berupa angka"),
  telp_ortu: Yup.number().required('Nomor Telepon atau HP harus diisi').typeError("Harus berupa angka"),
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

const Step5Schema = Yup.object().shape({
  sekolah: Yup.string().required("Nama Sekolah harus diisi"),
  jurusan: Yup.string().required("Jurusan harus dipilih"),
  nem: Yup.number().test(
    'is-decimal',
    'Format harus Decimal, contoh: 87.60',
    value => (value + "").match(/^\d*\.{1}\d*$/),
  ).typeError("Harus berupa angka, hanya boleh menggunakan titik."),
  thn_lulus: Yup.string().required("Tahun Lulus harus dipilih"),
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
  tgl:"",
  bln:"",
  thn:"",
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
  telp_ortu:"",
  sekolah:"",
  jurusan:"",
  nem:"",
  thn_lulus:""
};

const schemaArray = [Step1Schema, Step2Schema, Step3Schema, Step4Schema, Step5Schema];

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
      values: props.initialValues
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
      id: "1",
      title: "Jenis Daftar",
      //description: "Biodata Pendaftar",
    },
    {
      id: "2",
      title: "Program Studi",
      //description: "Biodata Pendaftar",
    },
    {
      id: "3",
      title: "Data Diri",
      //description: "Alamat Pendaftar dan Orang Tua",
    },
    {
      id: "4",
      title: "Data Alamat",
      //description: "Sekolah asal dan Jurusan Pilihan",
    },
    {
      id: "5",
      title: "Data Sekolah",
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
                        
                          <span className="d-block d-sm-none">{item.id}</span>
                          <span className="d-none d-xs-none d-sm-block d-md-block">{item.title}</span>
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
       <option>Pilih Jenis</option>
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
       <option>Pilihan 1</option>
        <SelectProgramstudi data={this.state.select} />
      </Field>
    </Col>
    <Col>
    <Field name="pilihan2" component={FormSelect} label="Pilihan 2 *">
       <option>Pilihan 2</option>
        <SelectProgramstudi data={this.state.select} />  
      </Field>
    </Col>
  <Col>
  <Field name="pilihan3" component={FormSelect} label="Pilihan 3 *">
        <option>Pilihan 3</option>
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
       <option>Pilihan 1</option>
       <option value="55201">INFORMATIKA</option>
       <option value="55701">SISTEM INFORMASI</option>
      </Field>
    </Col>
    <Col>
    <Field name="pilihan2" component={FormSelect} label="Pilihan 2 *">
       <option>Pilihan 2</option>
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
       <option>Pilihan 1</option>
       <option value="55201">INFORMATIKA</option>
      </Field>
    </Col>
    <Col>
    <Field name="pilihan2" component={FormSelect} label="Pilihan 2 *">
       <option>Pilihan 2</option>
       <option value="55201">INFORMATIKA</option>
      </Field>
    </Col>

    </Row>
     

    </>;
  }
}

function TanggalList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <option key={number.toString()} value={number.toString()}>
      {number}
    </option>
  );
  return (
    <Field name="tgl" component={FormSelect} label="Tanggal *">
      <option></option>
      {listItems}
    </Field>
  );
}
function BulanList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <option key={number.toString()} value={number.toString()}>
      {number}
    </option>
  );
  return (
    <Field name="bln" component={FormSelect} label="Bulan *">
      <option></option>
      {listItems}
    </Field>
  );
}
function TahunList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <option key={number.toString()} value={number.toString()}>
      {number}
    </option>
  );
  return (
    <Field name="thn" component={FormSelect} label="Tahun *">
      <option></option>
      {listItems}
    </Field>
  );
}

function TahunLulus(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <option key={number.toString()} value={number.toString()}>
      {number}
    </option>
  );
  return (
    <Field name="thn_lulus" component={FormSelect} label="Tahun *">
      <option>Pilih Tahun</option>
      {listItems}
    </Field>
  );
}

const tanggal = ['01','02','03','04','05','06','07','08','09',10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
const bulan = ['01','02','03','04','05','06','07','08','09',10,11,12];
const tahun = [2020,2019,2018,2017,2016,2015,2014,2013,2012,2011,2010,2009,2008,2007,2006,2005,2004,2003,2002,2001,2000,1999,1998,1997,1996,1995,1994,1993,1992,1991,1990,1989,1988,1987,1986,1985,1984,1983,1982,1981,1980];
const tahunlulus = [2020,2019,2018,2017,2016,2015,2014,2013,2012,2011,2010,2009,2008,2007,2006,2005,2004,2003,2002,2001,2000];

export const App = () => {
  
  return (
    <>
    
      <Wizard
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          //onSubmit={(values, actions, { setSubmitting, resetForm }) => {
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
    <h5 className="d-none d-xs-none d-sm-none d-md-block">Jenis Pendaftaran Reguler dan Beasiswa</h5>
    <div className="mt-4">
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
  return (
    <Fragment>
   
    <h3 style={{fontWeight:"700"}} className="mb-1">Jenis Mahasiswa &amp; Program Studi</h3>
    <h5 className="d-none d-xs-none d-sm-none d-md-block">Pilih Jenis Mahasiswa, Program Studi dan Sumber Informasi Amikom</h5>
    <div className="mt-3">
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
        <option>Pilih Kelas</option>
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
      </div>
  </Fragment>
  );
}}
</Wizard.Page>

<Wizard.Page>
{props => {
  
 //console.log(props, "this props 1");
  return (
    
    <Fragment>
      <h3 style={{fontWeight:"700"}} className="mb-1">Data Pribadi</h3>
    <h5 className="d-none d-xs-none d-sm-none d-md-block">Isikan data pribadi anda. Semua kolom wajib diisi</h5>
    <div className="mt-3">
      <Row>
      <Col md={7}>
      <Field name="nama" component={FormInput} type="text" label="Nama Lengkap" placeholder="Nama Lengkap anda" />
      </Col>
      <Col md={5}>
      <Field name="nik" component={FormInput} type="text" label="Nomor NIK/KTP" placeholder="Nomor NIK/KTP" />
      </Col>
      </Row>

      <Row>
      <Col md={6}>
      <Field name="tempatlahir" type="text" component={FormInput} label="Tempat Lahir *" placeholder="Tempat Lahir" />   
      </Col>
      <Col md={6}> 
        <Row>
        <Col>
        <TanggalList numbers={tanggal} />
        </Col>
        <Col>
        <BulanList numbers={bulan} />
        </Col>
        <Col>
        <TahunList numbers={tahun} />
        </Col>
        </Row>     
      </Col>
      </Row>

      <Row>
      <Col md={6}>
      <FormGroup>
      <FormLabel style={{fontWeight:"600"}}>Jenis Kelamin *</FormLabel><br/>
      <span className="pl-1">
      <Field name="jk" component={FormCheck} type="radio" value="Pria" label="Laki-Laki" />
      </span>
      <span className="pl-3">
      <Field name="jk" component={FormCheck} type="radio" value="Wanita" label="Perempuan"/>
      </span>
      </FormGroup>
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
      </Row>

      <Row>
      <Col md={6}>
      <Field name="telepon" type="text" component={FormInput} label="Telp/HP *" placeholder="Nomor Telepon/HP" />
      </Col>
      <Col md={6}>  
      <Field name="email" type="email" component={FormInput} label="Email *" placeholder="yourname@mail.com" />
      </Col>
      </Row>
      
      <Card bg="light">
        <Card.Body>
      <Row>
        <Col md={6}>
        <Field name="nama_ortu" component={FormInput} type="text" label="Nama Ibu Kandung *" placeholder="Nama Ibu Kandung" />
        </Col>
        <Col md={6}>
        <Field name="telp_ortu" component={FormInput} type="text" label="Nomor HP Orang Tua *" placeholder="Nomor HP Orang Tua" />
        </Col>
      </Row>
      </Card.Body>
      </Card>
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
           //console.log(props, "this props 1");
            return (
              
              <Fragment>
                <h3 style={{fontWeight:"700"}} className="mb-1">Data Alamat</h3>
              <h5 className="d-none d-xs-none d-sm-none d-md-block">Isikan Data Alamat. Semua kolom wajib diisi</h5>
              <div className="mt-3">
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
                </div>
              </Fragment>
            );

          }}

       
      </Wizard.Page>


<Wizard.Page>
{props => {
  
 //console.log(props, "this props 1");
  return (
    
    <Fragment>
    <h3 style={{fontWeight:"700"}} className="mb-1">Data Sekolah</h3>
    <h5 className="d-none d-xs-none d-sm-none d-md-block">Asal Sekolah SMK/SMA/PTS/PTN/DLL</h5>
    <div className="mt-3">
      <Row>
      <Col>
      <Field name="sekolah" component={FormInput} type="text" label="Asal Sekolah *" placeholder="Nama SMK/SMA/PTS/PTN/DLL" />
      </Col>
      </Row>

      <Row>
      <Col>
      <Field name="jurusan" component={FormSelect} label="Jurusan *" >
      <option>Pilih Jurusan</option>
          <option value="IPA">IPA</option>
          <option value="IPS">IPS</option>
          <option value="BAHASA">BAHASA</option>
          <option value="AKUNTANSI">AKUNTANSI</option>
          <option value="PERKANTORAN">PERKANTORAN</option>
          <option value="MESIN">MESIN</option>
          <option value="LISTRIK">LISTRIK</option>
          <option value="ELEKTRO">ELEKTRO</option>
          <option value="TKJ">TKJ</option>
          <option value="MULTIMEDIA">MULTIMEDIA</option>
          <option value="RPL">RPL</option>
          <option value="Lainnya">Lainnya</option>
      </Field>
      </Col>
      </Row>

      <Row>
      <Col>
      <Field name="nem" component={FormInput} type="text" label="Rata-rata Nem/UAN *" placeholder="00.00" maxLength="5"/>
      </Col>
      </Row>

      <Row>
      <Col>
      <TahunLulus numbers={tahunlulus} />
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
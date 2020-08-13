import React, { Fragment, useState } from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Container, Row, Col, FormControl, FormGroup, FormLabel, Button } from 'react-bootstrap';
import FormInput from '../../../Components/Form/FormInput';
import FormCheck from '../../../Components/Form/FormCheck';
import FormSelect from '../../../Components/Form/FormSelect';
import RadioCustom from '../../../Components/Form/FormRadioCustom';
import SelectJenismhs from '../Form/Select/Jenismhs';
import SelectProgramstudi from '../Form/Select/Programstudi';
import SelectProp from '../Form/Select/Provinsi';
import SelectKab from '../Form/Select/Kabupaten';
import API from '../../../ServiceApi/Index'

const Step2Schema = Yup.object().shape({
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
const Step1Schema = Yup.object().shape({
  alamat: Yup.string().required("Alamat Lengkap harus diisi"), 
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
  rt_ortu:"",
rw_ortu:"",
kelurahan_ortu:"",
kecamatan_ortu:"",
kabupaten_ortu:"",
propinsi_ortu:"",
kodepos_ortu:"",
telp_ortu:""
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

const data = {
provinces: [{"kdProp":1,"NamaProp":"Nanggroe Aceh Darussalam"},{"kdProp":2,"NamaProp":"Sumatera Utara"},{"kdProp":3,"NamaProp":"Sumatera Barat"},{"kdProp":4,"NamaProp":"Riau"},{"kdProp":5,"NamaProp":"Jambi"},{"kdProp":6,"NamaProp":"Sumatera Selatan"},{"kdProp":7,"NamaProp":"Bengkulu"},{"kdProp":8,"NamaProp":"Lampung"},{"kdProp":9,"NamaProp":"Bangka Belitung"},{"kdProp":10,"NamaProp":"Kepulauan Riau"},{"kdProp":11,"NamaProp":"DKI Jakarta"},{"kdProp":12,"NamaProp":"Jawa Barat"},{"kdProp":13,"NamaProp":"Jawa Tengah"},{"kdProp":14,"NamaProp":"Daerah Istimewa Yogyakarta"},{"kdProp":15,"NamaProp":"Jawa Timur"},{"kdProp":16,"NamaProp":"Banten"},{"kdProp":17,"NamaProp":"Bali"},{"kdProp":18,"NamaProp":"Nusa Tenggara Barat"},{"kdProp":19,"NamaProp":"Nusa Tenggara Timur"},{"kdProp":20,"NamaProp":"Kalimantan Barat"},{"kdProp":21,"NamaProp":"Kalimantan Tengah"},{"kdProp":22,"NamaProp":"Kalimantan Selatan"},{"kdProp":23,"NamaProp":"Kalimantan Timur"},{"kdProp":24,"NamaProp":"Sulawesi Utara"},{"kdProp":25,"NamaProp":"Sulawesi Tengah"},{"kdProp":26,"NamaProp":"Sulawesi Selatan"},{"kdProp":27,"NamaProp":"Sulawesi Tenggara"},{"kdProp":28,"NamaProp":"Gorontalo"},{"kdProp":29,"NamaProp":"Maluku"},{"kdProp":30,"NamaProp":"Maluku Utara"},{"kdProp":31,"NamaProp":"Irian Jaya Barat"},{"kdProp":32,"NamaProp":"Papua"},{"kdProp":33,"NamaProp":"Luar Negeri"},{"kdProp":99,"NamaProp":"Lainnya"}],
  cities: [{"KdKab":"1001","Kdprop":10,"NamaKab":"Kepulauan Riau"},{"KdKab":"1002","Kdprop":10,"NamaKab":"Karimun"},{"KdKab":"1003","Kdprop":10,"NamaKab":"Natuna"},{"KdKab":"1004","Kdprop":10,"NamaKab":"Lingga"},{"KdKab":"1005","Kdprop":10,"NamaKab":"Kota Batam"},{"KdKab":"1006","Kdprop":10,"NamaKab":"Kota Tanjung Pinang"},{"KdKab":"101 ","Kdprop":1,"NamaKab":"Simeuleu"},{"KdKab":"102 ","Kdprop":1,"NamaKab":"Aceh Singkil"},{"KdKab":"103 ","Kdprop":1,"NamaKab":"Kab. Aceh Selatan"},{"KdKab":"104 ","Kdprop":1,"NamaKab":"Aceh Tenggara"},{"KdKab":"105 ","Kdprop":1,"NamaKab":"Kab. Aceh Timur"},{"KdKab":"106 ","Kdprop":1,"NamaKab":"Kab. Aceh Tengah"},{"KdKab":"107 ","Kdprop":1,"NamaKab":"Kab. Aceh Barat"},{"KdKab":"108 ","Kdprop":1,"NamaKab":"Kab. Aceh Besar"},{"KdKab":"109 ","Kdprop":1,"NamaKab":"Pidie"},{"KdKab":"110 ","Kdprop":1,"NamaKab":"Bireuen"},{"KdKab":"1101","Kdprop":11,"NamaKab":"Kepulauan Seribu"},{"KdKab":"1102","Kdprop":11,"NamaKab":"Jakarta Selatan"},{"KdKab":"1103","Kdprop":11,"NamaKab":"Jakarta Timur"},{"KdKab":"1104","Kdprop":11,"NamaKab":"Jakarta Pusat"},{"KdKab":"1105","Kdprop":11,"NamaKab":"Jakarta Barat"},{"KdKab":"1106","Kdprop":11,"NamaKab":"Jakarta Utara"},{"KdKab":"111 ","Kdprop":1,"NamaKab":"Kab. Aceh Utara"},{"KdKab":"112 ","Kdprop":1,"NamaKab":"Aceh Barat Daya"},{"KdKab":"113 ","Kdprop":1,"NamaKab":"Gayo Lues"},{"KdKab":"114 ","Kdprop":1,"NamaKab":"Aceh Tamiang"},{"KdKab":"115 ","Kdprop":1,"NamaKab":"Nagan Raya"},{"KdKab":"116 ","Kdprop":1,"NamaKab":"Aceh Jaya"},{"KdKab":"117 ","Kdprop":1,"NamaKab":"Bener Meriah"},{"KdKab":"118 ","Kdprop":1,"NamaKab":"Kota Banda Aceh"},{"KdKab":"119 ","Kdprop":1,"NamaKab":"Kota Sabang"},{"KdKab":"120 ","Kdprop":1,"NamaKab":"Kota Langsa"},{"KdKab":"1201","Kdprop":12,"NamaKab":"Kab. Bogor"},{"KdKab":"1202","Kdprop":12,"NamaKab":"Kab. Sukabumi"},{"KdKab":"1203","Kdprop":12,"NamaKab":"Cianjur"},{"KdKab":"1204","Kdprop":12,"NamaKab":"Kab. Bandung"},{"KdKab":"1205","Kdprop":12,"NamaKab":"Garut"},{"KdKab":"1206","Kdprop":12,"NamaKab":"Kab. Tasikmalaya"},{"KdKab":"1207","Kdprop":12,"NamaKab":"Ciamis"},{"KdKab":"1208","Kdprop":12,"NamaKab":"Kuningan"},{"KdKab":"1209","Kdprop":12,"NamaKab":"Kab. Cirebon"},{"KdKab":"121 ","Kdprop":1,"NamaKab":"Kota Lhokseumawe"},{"KdKab":"1210","Kdprop":12,"NamaKab":"Majalengka"},{"KdKab":"1211","Kdprop":12,"NamaKab":"Sumedang"},{"KdKab":"1212","Kdprop":12,"NamaKab":"Indramayu"},{"KdKab":"1213","Kdprop":12,"NamaKab":"Subang"},{"KdKab":"1214","Kdprop":12,"NamaKab":"Purwakarta"},{"KdKab":"1215","Kdprop":12,"NamaKab":"Karawang"},{"KdKab":"1216","Kdprop":12,"NamaKab":"Kab. Bekasi"},{"KdKab":"1217","Kdprop":12,"NamaKab":"Kota Bogor"},{"KdKab":"1218","Kdprop":12,"NamaKab":"Kota Sukabumi"},{"KdKab":"1219","Kdprop":12,"NamaKab":"Kota Bandung"},{"KdKab":"1220","Kdprop":12,"NamaKab":"Kota Cirebon"},{"KdKab":"1221","Kdprop":12,"NamaKab":"Kota Bekasi"},{"KdKab":"1222","Kdprop":12,"NamaKab":"Kota Depok"},{"KdKab":"1223","Kdprop":12,"NamaKab":"Kota Cimahi"},{"KdKab":"1224","Kdprop":12,"NamaKab":"Kota Tasikmalaya"},{"KdKab":"1225","Kdprop":12,"NamaKab":"Kota Banjar"},{"KdKab":"1301","Kdprop":13,"NamaKab":"Cilacap"},{"KdKab":"1302","Kdprop":13,"NamaKab":"Banyumas"},{"KdKab":"1303","Kdprop":13,"NamaKab":"Purbalingga"},{"KdKab":"1304","Kdprop":13,"NamaKab":"BanjarNegara"},{"KdKab":"1305","Kdprop":13,"NamaKab":"Kebumen"},{"KdKab":"1306","Kdprop":13,"NamaKab":"Purworejo"},{"KdKab":"1307","Kdprop":13,"NamaKab":"Wonosobo"},{"KdKab":"1308","Kdprop":13,"NamaKab":"Kab. Magelang"},{"KdKab":"1309","Kdprop":13,"NamaKab":"Boyolali"},{"KdKab":"1310","Kdprop":13,"NamaKab":"Klaten"},{"KdKab":"1311","Kdprop":13,"NamaKab":"Sukoharjo"},{"KdKab":"1312","Kdprop":13,"NamaKab":"Wonogiri"},{"KdKab":"1313","Kdprop":13,"NamaKab":"Karanganyar"},{"KdKab":"1314","Kdprop":13,"NamaKab":"Sragen"},{"KdKab":"1315","Kdprop":13,"NamaKab":"Grobogan"},{"KdKab":"1316","Kdprop":13,"NamaKab":"Blora"},{"KdKab":"1317","Kdprop":13,"NamaKab":"Rembang"},{"KdKab":"1318","Kdprop":13,"NamaKab":"Pati"},{"KdKab":"1319","Kdprop":13,"NamaKab":"Kudus"},{"KdKab":"1320","Kdprop":13,"NamaKab":"Jepara"},{"KdKab":"1321","Kdprop":13,"NamaKab":"Demak"},{"KdKab":"1322","Kdprop":13,"NamaKab":"Kab. Semarang"},{"KdKab":"1323","Kdprop":13,"NamaKab":"Temanggung"},{"KdKab":"1324","Kdprop":13,"NamaKab":"Kendal"},{"KdKab":"1325","Kdprop":13,"NamaKab":"Batang"},{"KdKab":"1326","Kdprop":13,"NamaKab":"Kab. Pekalongan"},{"KdKab":"1327","Kdprop":13,"NamaKab":"Pemalang"},{"KdKab":"1328","Kdprop":13,"NamaKab":"Kab. Tegal"},{"KdKab":"1329","Kdprop":13,"NamaKab":"Brebes"},{"KdKab":"1330","Kdprop":13,"NamaKab":"Kota Magelang"},{"KdKab":"1331","Kdprop":13,"NamaKab":"Kota Surakarta"},{"KdKab":"1332","Kdprop":13,"NamaKab":"Kota Salatiga"},{"KdKab":"1333","Kdprop":13,"NamaKab":"Kota Semarang"},{"KdKab":"1334","Kdprop":13,"NamaKab":"Kota Pekalongan"},{"KdKab":"1335","Kdprop":13,"NamaKab":"Kota Tegal"},{"KdKab":"1401","Kdprop":14,"NamaKab":"Kulon Progo"},{"KdKab":"1402","Kdprop":14,"NamaKab":"Bantul"},{"KdKab":"1403","Kdprop":14,"NamaKab":"Gunung Kidul"},{"KdKab":"1404","Kdprop":14,"NamaKab":"Sleman"},{"KdKab":"1405","Kdprop":14,"NamaKab":"Kota Yogyakarta"},{"KdKab":"1501","Kdprop":15,"NamaKab":"Pacitan"},{"KdKab":"1502","Kdprop":15,"NamaKab":"Ponorogo"},{"KdKab":"1503","Kdprop":15,"NamaKab":"Trenggalek"},{"KdKab":"1504","Kdprop":15,"NamaKab":"Tulungagung"},{"KdKab":"1505","Kdprop":15,"NamaKab":"Kab. Blitar"},{"KdKab":"1506","Kdprop":15,"NamaKab":"Kab. Kediri"},{"KdKab":"1507","Kdprop":15,"NamaKab":"Kab. Malang"},{"KdKab":"1508","Kdprop":15,"NamaKab":"Lumajang"},{"KdKab":"1509","Kdprop":15,"NamaKab":"Jember"},{"KdKab":"1510","Kdprop":15,"NamaKab":"Banyuwangi"},{"KdKab":"1511","Kdprop":15,"NamaKab":"Bondowoso"},{"KdKab":"1512","Kdprop":15,"NamaKab":"Situbondo"},{"KdKab":"1513","Kdprop":15,"NamaKab":"Kab. Probolinggo"},{"KdKab":"1514","Kdprop":15,"NamaKab":"Kab. Pasuruan"},{"KdKab":"1515","Kdprop":15,"NamaKab":"Sidoarjo"},{"KdKab":"1516","Kdprop":15,"NamaKab":"Kab. Mojokerto"},{"KdKab":"1517","Kdprop":15,"NamaKab":"Jombang"},{"KdKab":"1518","Kdprop":15,"NamaKab":"Nganjuk"},{"KdKab":"1519","Kdprop":15,"NamaKab":"Kab. Madiun"},{"KdKab":"1520","Kdprop":15,"NamaKab":"Magetan"},{"KdKab":"1521","Kdprop":15,"NamaKab":"Ngawi"},{"KdKab":"1522","Kdprop":15,"NamaKab":"Bojonegoro"},{"KdKab":"1523","Kdprop":15,"NamaKab":"Tuban"},{"KdKab":"1524","Kdprop":15,"NamaKab":"Lamongan"},{"KdKab":"1525","Kdprop":15,"NamaKab":"Gresik"},{"KdKab":"1526","Kdprop":15,"NamaKab":"Bangkalan"},{"KdKab":"1527","Kdprop":15,"NamaKab":"Sampang"},{"KdKab":"1528","Kdprop":15,"NamaKab":"Pamekasan"},{"KdKab":"1529","Kdprop":15,"NamaKab":"Sumenep"},{"KdKab":"1530","Kdprop":15,"NamaKab":"Kota Kediri"},{"KdKab":"1531","Kdprop":15,"NamaKab":"Kota Blitar"},{"KdKab":"1532","Kdprop":15,"NamaKab":"Kota Malang"},{"KdKab":"1533","Kdprop":15,"NamaKab":"Kota Probolinggo"},{"KdKab":"1534","Kdprop":15,"NamaKab":"Kota Pasuruan"},{"KdKab":"1535","Kdprop":15,"NamaKab":"Kota Mojokerto"},{"KdKab":"1536","Kdprop":15,"NamaKab":"Kota Madiun"},{"KdKab":"1537","Kdprop":15,"NamaKab":"Kota Surabaya"},{"KdKab":"1538","Kdprop":15,"NamaKab":"Kota Batu"},{"KdKab":"1601","Kdprop":16,"NamaKab":"Pandeglang"},{"KdKab":"1602","Kdprop":16,"NamaKab":"Lebak"},{"KdKab":"1603","Kdprop":16,"NamaKab":"Kab. Tangerang"},{"KdKab":"1604","Kdprop":16,"NamaKab":"Serang"},{"KdKab":"1605","Kdprop":16,"NamaKab":"Kota Tangerang"},{"KdKab":"1606","Kdprop":16,"NamaKab":"Kota Cilegon"},{"KdKab":"1701","Kdprop":17,"NamaKab":"Jembrana"},{"KdKab":"1702","Kdprop":17,"NamaKab":"Tabanan"},{"KdKab":"1703","Kdprop":17,"NamaKab":"Badung"},{"KdKab":"1704","Kdprop":17,"NamaKab":"Gianyar"},{"KdKab":"1705","Kdprop":17,"NamaKab":"Klungkung"},{"KdKab":"1706","Kdprop":17,"NamaKab":"Bangli"},{"KdKab":"1707","Kdprop":17,"NamaKab":"Karang Asem"},{"KdKab":"1708","Kdprop":17,"NamaKab":"Buleleng"},{"KdKab":"1709","Kdprop":17,"NamaKab":"Kota Denpasar"},{"KdKab":"1801","Kdprop":18,"NamaKab":"Lombok Barat"},{"KdKab":"1802","Kdprop":18,"NamaKab":"Lombok Tengah"},{"KdKab":"1803","Kdprop":18,"NamaKab":"Lombok Timur"},{"KdKab":"1804","Kdprop":18,"NamaKab":"Sumbawa"},{"KdKab":"1805","Kdprop":18,"NamaKab":"Dompu"},{"KdKab":"1806","Kdprop":18,"NamaKab":"Kab. Bima"},{"KdKab":"1807","Kdprop":18,"NamaKab":"Sumbawa Barat"},{"KdKab":"1808","Kdprop":18,"NamaKab":"Kota Mataram"},{"KdKab":"1809","Kdprop":18,"NamaKab":"Kota Bima"},{"KdKab":"1901","Kdprop":19,"NamaKab":"Sumba Barat"},{"KdKab":"1902","Kdprop":19,"NamaKab":"Sumba Timur"},{"KdKab":"1903","Kdprop":19,"NamaKab":"Kab. Kupang"},{"KdKab":"1904","Kdprop":19,"NamaKab":"Timor Tengah Selatan"},{"KdKab":"1905","Kdprop":19,"NamaKab":"Timor Tengah Utara"},{"KdKab":"1906","Kdprop":19,"NamaKab":"Belu"},{"KdKab":"1907","Kdprop":19,"NamaKab":"Alor"},{"KdKab":"1908","Kdprop":19,"NamaKab":"Lembata"},{"KdKab":"1909","Kdprop":19,"NamaKab":"Flores Timur"},{"KdKab":"1910","Kdprop":19,"NamaKab":"Sikka"},{"KdKab":"1911","Kdprop":19,"NamaKab":"Ende"},{"KdKab":"1912","Kdprop":19,"NamaKab":"Ngada"},{"KdKab":"1913","Kdprop":19,"NamaKab":"Manggarai"},{"KdKab":"1914","Kdprop":19,"NamaKab":"Rote Ndao"},{"KdKab":"1915","Kdprop":19,"NamaKab":"Manggarai Barat"},{"KdKab":"1916","Kdprop":19,"NamaKab":"Kota Kupang"},{"KdKab":"2001","Kdprop":20,"NamaKab":"Sambas"},{"KdKab":"2002","Kdprop":20,"NamaKab":"Bengkayang"},{"KdKab":"2003","Kdprop":20,"NamaKab":"Landak"},{"KdKab":"2004","Kdprop":20,"NamaKab":"Kab. Pontianak"},{"KdKab":"2005","Kdprop":20,"NamaKab":"Sanggau"},{"KdKab":"2006","Kdprop":20,"NamaKab":"Ketapang"},{"KdKab":"2007","Kdprop":20,"NamaKab":"Sintang"},{"KdKab":"2008","Kdprop":20,"NamaKab":"Kapuas Hulu"},{"KdKab":"2009","Kdprop":20,"NamaKab":"Sekadau"},{"KdKab":"201 ","Kdprop":2,"NamaKab":"Nias"},{"KdKab":"2010","Kdprop":20,"NamaKab":"Melawi"},{"KdKab":"2011","Kdprop":20,"NamaKab":"Kota Pontianak"},{"KdKab":"2012","Kdprop":20,"NamaKab":"Kota Singkawang"},{"KdKab":"202 ","Kdprop":2,"NamaKab":"Mandailing Natal"},{"KdKab":"203 ","Kdprop":2,"NamaKab":"Tapanuli Selatan"},{"KdKab":"204 ","Kdprop":2,"NamaKab":"Tapanuli Tengah"},{"KdKab":"205 ","Kdprop":2,"NamaKab":"Tapanuli Utara"},{"KdKab":"206 ","Kdprop":2,"NamaKab":"Toba Samosir"},{"KdKab":"207 ","Kdprop":2,"NamaKab":"Labuhan Batu"},{"KdKab":"208 ","Kdprop":2,"NamaKab":"Asahan"},{"KdKab":"209 ","Kdprop":2,"NamaKab":"Simalungun"},{"KdKab":"210 ","Kdprop":2,"NamaKab":"Dairi"},{"KdKab":"2101","Kdprop":21,"NamaKab":"Kotawaringin Barat"},{"KdKab":"2102","Kdprop":21,"NamaKab":"Kotawaringin Timur"},{"KdKab":"2103","Kdprop":21,"NamaKab":"Kapuas"},{"KdKab":"2104","Kdprop":21,"NamaKab":"Barito Selatan"},{"KdKab":"2105","Kdprop":21,"NamaKab":"Barito Utara"},{"KdKab":"2106","Kdprop":21,"NamaKab":"Sukamara"},{"KdKab":"2107","Kdprop":21,"NamaKab":"Lamandau"},{"KdKab":"2108","Kdprop":21,"NamaKab":"Seruyan"},{"KdKab":"2109","Kdprop":21,"NamaKab":"Katingan"},{"KdKab":"211 ","Kdprop":2,"NamaKab":"Karo"},{"KdKab":"2110","Kdprop":21,"NamaKab":"Pulang Pisau"},{"KdKab":"2111","Kdprop":21,"NamaKab":"Gunung Mas"},{"KdKab":"2112","Kdprop":21,"NamaKab":"Barito Timur"},{"KdKab":"2113","Kdprop":21,"NamaKab":"Murung Raya"},{"KdKab":"2114","Kdprop":21,"NamaKab":"Kota Palangka Raya"},{"KdKab":"212 ","Kdprop":2,"NamaKab":"Deli Serdang"},{"KdKab":"213 ","Kdprop":2,"NamaKab":"Langkat"},{"KdKab":"214 ","Kdprop":2,"NamaKab":"Nias Selatan"},{"KdKab":"215 ","Kdprop":2,"NamaKab":"Humbang Hasundutan"},{"KdKab":"216 ","Kdprop":2,"NamaKab":"Pakpak Bharat"},{"KdKab":"217 ","Kdprop":2,"NamaKab":"Samosir"},{"KdKab":"218 ","Kdprop":2,"NamaKab":"Serdang Bedagai"},{"KdKab":"219 ","Kdprop":2,"NamaKab":"Kota Sibolga"},{"KdKab":"220 ","Kdprop":2,"NamaKab":"Kota Tanjung Balai"},{"KdKab":"2201","Kdprop":23,"NamaKab":"Pasir"},{"KdKab":"2202","Kdprop":23,"NamaKab":"Kutai Barat"},{"KdKab":"2203","Kdprop":23,"NamaKab":"Kutai Kertanegara"},{"KdKab":"2204","Kdprop":23,"NamaKab":"Kutai Timur"},{"KdKab":"2205","Kdprop":23,"NamaKab":"Berau"},{"KdKab":"2206","Kdprop":23,"NamaKab":"Malinau"},{"KdKab":"2207","Kdprop":23,"NamaKab":"Bulungan"},{"KdKab":"2208","Kdprop":23,"NamaKab":"Nunukan"},{"KdKab":"2209","Kdprop":23,"NamaKab":"Penajam Paser Utara"},{"KdKab":"221 ","Kdprop":2,"NamaKab":"Kota Pematang Siantar"},{"KdKab":"2210","Kdprop":23,"NamaKab":"Kota Balikpapan"},{"KdKab":"2211","Kdprop":23,"NamaKab":"Kota Samarinda"},{"KdKab":"2212","Kdprop":23,"NamaKab":"Kota Tarakan"},{"KdKab":"2213","Kdprop":23,"NamaKab":"Kota Bontang"},{"KdKab":"222 ","Kdprop":2,"NamaKab":"Kota Tebing Tinggi"},{"KdKab":"223 ","Kdprop":2,"NamaKab":"Kota Medan"},{"KdKab":"224 ","Kdprop":2,"NamaKab":"Kota Binjai"},{"KdKab":"225 ","Kdprop":2,"NamaKab":"Kota Padang Sidempuan"},{"KdKab":"2301","Kdprop":22,"NamaKab":"Tanah Laut"},{"KdKab":"2302","Kdprop":22,"NamaKab":"Kota Baru"},{"KdKab":"2303","Kdprop":22,"NamaKab":"Banjar"},{"KdKab":"2304","Kdprop":22,"NamaKab":"Barito Kuala"},{"KdKab":"2305","Kdprop":22,"NamaKab":"Tapin"},{"KdKab":"2306","Kdprop":22,"NamaKab":"Hulu Sungai Selatan"},{"KdKab":"2307","Kdprop":22,"NamaKab":"Hulu Sungai Tengah"},{"KdKab":"2308","Kdprop":22,"NamaKab":"Hulu Sungai Utara"},{"KdKab":"2309","Kdprop":22,"NamaKab":"Tabalong"},{"KdKab":"2310","Kdprop":22,"NamaKab":"Tanah Bumbu"},{"KdKab":"2311","Kdprop":22,"NamaKab":"Balangan"},{"KdKab":"2312","Kdprop":22,"NamaKab":"Kota Banjarmasin"},{"KdKab":"2313","Kdprop":22,"NamaKab":"Kota Banjar Baru"},{"KdKab":"2401","Kdprop":24,"NamaKab":"Bolaang Mongondow"},{"KdKab":"2402","Kdprop":24,"NamaKab":"Minahasa Selatan"},{"KdKab":"2403","Kdprop":24,"NamaKab":"Minahasa"},{"KdKab":"2404","Kdprop":24,"NamaKab":"Kepulauan Sangihe"},{"KdKab":"2405","Kdprop":24,"NamaKab":"Kepulauan Talaud"},{"KdKab":"2406","Kdprop":24,"NamaKab":"Minahasa Utara"},{"KdKab":"2407","Kdprop":24,"NamaKab":"Kota Tomohon"},{"KdKab":"2408","Kdprop":24,"NamaKab":"Kota Manado"},{"KdKab":"2409","Kdprop":24,"NamaKab":"Kota Bitung"},{"KdKab":"2501","Kdprop":25,"NamaKab":"Banggai Kepulauan"},{"KdKab":"2502","Kdprop":25,"NamaKab":"Banggai"},{"KdKab":"2503","Kdprop":25,"NamaKab":"Morowali"},{"KdKab":"2504","Kdprop":25,"NamaKab":"Poso"},{"KdKab":"2505","Kdprop":25,"NamaKab":"Donggala"},{"KdKab":"2506","Kdprop":25,"NamaKab":"Toli-Toli"},{"KdKab":"2507","Kdprop":25,"NamaKab":"Buol"},{"KdKab":"2508","Kdprop":25,"NamaKab":"Parigi Moutong"},{"KdKab":"2509","Kdprop":25,"NamaKab":"Tojo Una-Una"},{"KdKab":"2510","Kdprop":25,"NamaKab":"Kota Palu"},{"KdKab":"2601","Kdprop":26,"NamaKab":"Selayar"},{"KdKab":"2602","Kdprop":26,"NamaKab":"Bulukumba"},{"KdKab":"2603","Kdprop":26,"NamaKab":"Bantaeng"},{"KdKab":"2604","Kdprop":26,"NamaKab":"Jeneponto"},{"KdKab":"2605","Kdprop":26,"NamaKab":"Takalar"},{"KdKab":"2606","Kdprop":26,"NamaKab":"Gowa"},{"KdKab":"2607","Kdprop":26,"NamaKab":"Sinjai"},{"KdKab":"2608","Kdprop":26,"NamaKab":"Maros"},{"KdKab":"2609","Kdprop":26,"NamaKab":"Pangkajene Kepulauan"},{"KdKab":"2610","Kdprop":26,"NamaKab":"Barru"},{"KdKab":"2611","Kdprop":26,"NamaKab":"Bone"},{"KdKab":"2612","Kdprop":26,"NamaKab":"Soppeng"},{"KdKab":"2613","Kdprop":26,"NamaKab":"Wajo"},{"KdKab":"2614","Kdprop":26,"NamaKab":"Sidenreng Rappang"},{"KdKab":"2615","Kdprop":26,"NamaKab":"Pinrang"},{"KdKab":"2616","Kdprop":26,"NamaKab":"Enrekang"},{"KdKab":"2617","Kdprop":26,"NamaKab":"Luwu"},{"KdKab":"2618","Kdprop":26,"NamaKab":"Tana Toraja"},{"KdKab":"2619","Kdprop":26,"NamaKab":"Polewali Mamasa"},{"KdKab":"2620","Kdprop":26,"NamaKab":"Majene"},{"KdKab":"2621","Kdprop":26,"NamaKab":"Mamuju"},{"KdKab":"2622","Kdprop":26,"NamaKab":"Luwu Utara"},{"KdKab":"2623","Kdprop":26,"NamaKab":"Mamasa"},{"KdKab":"2624","Kdprop":26,"NamaKab":"Mamuju Utara"},{"KdKab":"2625","Kdprop":26,"NamaKab":"Luwu Timur"},{"KdKab":"2626","Kdprop":26,"NamaKab":"Kota Makasar"},{"KdKab":"2627","Kdprop":26,"NamaKab":"Kota Pare-Pare"},{"KdKab":"2628","Kdprop":26,"NamaKab":"Kota Palopo"},{"KdKab":"2701","Kdprop":27,"NamaKab":"Buton"},{"KdKab":"2702","Kdprop":27,"NamaKab":"Muna"},{"KdKab":"2703","Kdprop":27,"NamaKab":"Kendari"},{"KdKab":"2704","Kdprop":27,"NamaKab":"Kolaka"},{"KdKab":"2705","Kdprop":27,"NamaKab":"Konawe Selatan"},{"KdKab":"2706","Kdprop":27,"NamaKab":"Kolaka Utara"},{"KdKab":"2707","Kdprop":27,"NamaKab":"Wakatobi"},{"KdKab":"2708","Kdprop":27,"NamaKab":"Bombana"},{"KdKab":"2709","Kdprop":27,"NamaKab":"Kota Kendari"},{"KdKab":"2710","Kdprop":27,"NamaKab":"Kota Bau-bau"},{"KdKab":"2801","Kdprop":28,"NamaKab":"Boalemo"},{"KdKab":"2802","Kdprop":28,"NamaKab":"Gorontalo"},{"KdKab":"2803","Kdprop":28,"NamaKab":"Pohuwato"},{"KdKab":"2804","Kdprop":28,"NamaKab":"Bone Bolango"},{"KdKab":"2805","Kdprop":28,"NamaKab":"Kota Gorontalo"},{"KdKab":"2901","Kdprop":29,"NamaKab":"Maluku Tenggara Barat"},{"KdKab":"2902","Kdprop":29,"NamaKab":"Maluku Tenggara"},{"KdKab":"2903","Kdprop":29,"NamaKab":"Maluku Tengah"},{"KdKab":"2904","Kdprop":29,"NamaKab":"Buru"},{"KdKab":"2905","Kdprop":29,"NamaKab":"Kepulauan Aru"},{"KdKab":"2906","Kdprop":29,"NamaKab":"Seram Bagian Timur"},{"KdKab":"2907","Kdprop":29,"NamaKab":"Seram Bagian Barat"},{"KdKab":"2908","Kdprop":29,"NamaKab":"Kota Ambon"},{"KdKab":"3001","Kdprop":30,"NamaKab":"Halmahera Barat"},{"KdKab":"3002","Kdprop":30,"NamaKab":"Halmahera Tengah"},{"KdKab":"3003","Kdprop":30,"NamaKab":"Kepulauan Sula"},{"KdKab":"3004","Kdprop":30,"NamaKab":"Halmahera Selatan"},{"KdKab":"3005","Kdprop":30,"NamaKab":"Halmahera Utara"},{"KdKab":"3006","Kdprop":30,"NamaKab":"Halmahera Timur"},{"KdKab":"3007","Kdprop":30,"NamaKab":"Kota Ternate"},{"KdKab":"3008","Kdprop":30,"NamaKab":"Kota Tidore Kepulauan"},{"KdKab":"301 ","Kdprop":3,"NamaKab":"Kepulauan Mentawai"},{"KdKab":"302 ","Kdprop":3,"NamaKab":"Pesisir Selatan"},{"KdKab":"303 ","Kdprop":3,"NamaKab":"Solok"},{"KdKab":"304 ","Kdprop":3,"NamaKab":"Sawahlunto Sijunjung"},{"KdKab":"305 ","Kdprop":3,"NamaKab":"Tanah Datar"},{"KdKab":"306 ","Kdprop":3,"NamaKab":"Padang Pariaman"},{"KdKab":"307 ","Kdprop":3,"NamaKab":"Agam"},{"KdKab":"308 ","Kdprop":3,"NamaKab":"Lima Puluh Koto"},{"KdKab":"309 ","Kdprop":3,"NamaKab":"Pasaman"},{"KdKab":"310 ","Kdprop":3,"NamaKab":"Solok Selatan"},{"KdKab":"3101","Kdprop":31,"NamaKab":"Fak-Fak"},{"KdKab":"3102","Kdprop":31,"NamaKab":"Kab. Sorong"},{"KdKab":"3103","Kdprop":31,"NamaKab":"Manokwari"},{"KdKab":"3104","Kdprop":31,"NamaKab":"Kaimana"},{"KdKab":"3105","Kdprop":31,"NamaKab":"Sorong Selatan"},{"KdKab":"3106","Kdprop":31,"NamaKab":"Raja Ampat"},{"KdKab":"3107","Kdprop":31,"NamaKab":"Teluk Bintuni"},{"KdKab":"3108","Kdprop":31,"NamaKab":"Teluk Wondama"},{"KdKab":"3109","Kdprop":31,"NamaKab":"Kota Sorong"},{"KdKab":"311 ","Kdprop":3,"NamaKab":"Dharmas Raya"},{"KdKab":"312 ","Kdprop":3,"NamaKab":"Pasaman Barat"},{"KdKab":"313 ","Kdprop":3,"NamaKab":"Kota Padang"},{"KdKab":"314 ","Kdprop":3,"NamaKab":"Kota Solok"},{"KdKab":"315 ","Kdprop":3,"NamaKab":"Kota Sawah Lunto"},{"KdKab":"316 ","Kdprop":3,"NamaKab":"Kota Padang Panjang"},{"KdKab":"317 ","Kdprop":3,"NamaKab":"Kota Bukittinggi"},{"KdKab":"318 ","Kdprop":3,"NamaKab":"Kota Payakumbuh"},{"KdKab":"319 ","Kdprop":3,"NamaKab":"Kota Pariaman"},{"KdKab":"3201","Kdprop":32,"NamaKab":"Merauke"},{"KdKab":"3202","Kdprop":32,"NamaKab":"Jayawijaya"},{"KdKab":"3203","Kdprop":32,"NamaKab":"Jayapura"},{"KdKab":"3204","Kdprop":32,"NamaKab":"Nabire"},{"KdKab":"3205","Kdprop":32,"NamaKab":"Yapen Waropen"},{"KdKab":"3206","Kdprop":32,"NamaKab":"Biak Numfor"},{"KdKab":"3207","Kdprop":32,"NamaKab":"Paniai"},{"KdKab":"3208","Kdprop":32,"NamaKab":"Puncak Jaya"},{"KdKab":"3209","Kdprop":32,"NamaKab":"Mimika"},{"KdKab":"3210","Kdprop":32,"NamaKab":"Boven Digoel"},{"KdKab":"3211","Kdprop":32,"NamaKab":"Mappi"},{"KdKab":"3212","Kdprop":32,"NamaKab":"Asmat"},{"KdKab":"3213","Kdprop":32,"NamaKab":"Yahukimo"},{"KdKab":"3214","Kdprop":32,"NamaKab":"Pegunungan Bintang"},{"KdKab":"3215","Kdprop":32,"NamaKab":"Tolikara"},{"KdKab":"3216","Kdprop":32,"NamaKab":"Sarmi"},{"KdKab":"3217","Kdprop":32,"NamaKab":"Keerom"},{"KdKab":"3218","Kdprop":32,"NamaKab":"Waropen"},{"KdKab":"3219","Kdprop":32,"NamaKab":"Supiori"},{"KdKab":"3220","Kdprop":32,"NamaKab":"Kota Jayapura"},{"KdKab":"401 ","Kdprop":4,"NamaKab":"Kuantan Singingi"},{"KdKab":"402 ","Kdprop":4,"NamaKab":"Indagiri Hulu"},{"KdKab":"403 ","Kdprop":4,"NamaKab":"Indagiri Hilir"},{"KdKab":"404 ","Kdprop":4,"NamaKab":"Pelalawan"},{"KdKab":"405 ","Kdprop":4,"NamaKab":"Siak"},{"KdKab":"406 ","Kdprop":4,"NamaKab":"Kampar"},{"KdKab":"407 ","Kdprop":4,"NamaKab":"Rokan Hulu"},{"KdKab":"408 ","Kdprop":4,"NamaKab":"Bengkalis"},{"KdKab":"409 ","Kdprop":4,"NamaKab":"Rokan Hilir"},{"KdKab":"410 ","Kdprop":4,"NamaKab":"Kota Pekan Baru"},{"KdKab":"411 ","Kdprop":4,"NamaKab":"Kota Dumai"},{"KdKab":"501 ","Kdprop":5,"NamaKab":"Kerinci"},{"KdKab":"502 ","Kdprop":5,"NamaKab":"Merangin"},{"KdKab":"503 ","Kdprop":5,"NamaKab":"Sarolangun"},{"KdKab":"504 ","Kdprop":5,"NamaKab":"Batang Hari"},{"KdKab":"505 ","Kdprop":5,"NamaKab":"Muaro Jambi"},{"KdKab":"506 ","Kdprop":5,"NamaKab":"Tanjung Jabung Timur"},{"KdKab":"507 ","Kdprop":5,"NamaKab":"Tanjung Jabung Barat"},{"KdKab":"508 ","Kdprop":5,"NamaKab":"Tebo"},{"KdKab":"509 ","Kdprop":5,"NamaKab":"Bungo"},{"KdKab":"510 ","Kdprop":5,"NamaKab":"Kota Jambi"},{"KdKab":"601 ","Kdprop":6,"NamaKab":"Ogan Komering Ulu"},{"KdKab":"602 ","Kdprop":6,"NamaKab":"Ogan Komering Ilir"},{"KdKab":"603 ","Kdprop":6,"NamaKab":"Muara Enim"},{"KdKab":"604 ","Kdprop":6,"NamaKab":"Lahat"},{"KdKab":"605 ","Kdprop":6,"NamaKab":"Musi Rawas"},{"KdKab":"606 ","Kdprop":6,"NamaKab":"Musi Banyuasin"},{"KdKab":"607 ","Kdprop":6,"NamaKab":"Banyuasin"},{"KdKab":"608 ","Kdprop":6,"NamaKab":"Ogan Komering Ulu Timur"},{"KdKab":"609 ","Kdprop":6,"NamaKab":"Ogan Komering Ulu Selatan"},{"KdKab":"610 ","Kdprop":6,"NamaKab":"Ogan ilir"},{"KdKab":"611 ","Kdprop":6,"NamaKab":"Kota Palembang"},{"KdKab":"612 ","Kdprop":6,"NamaKab":"Kota Prabumulih"},{"KdKab":"613 ","Kdprop":6,"NamaKab":"Kota Pagar Alam"},{"KdKab":"614 ","Kdprop":6,"NamaKab":"Kota Lubuk Linggau"},{"KdKab":"701 ","Kdprop":7,"NamaKab":"Bengkulu Selatan"},{"KdKab":"702 ","Kdprop":7,"NamaKab":"Rejang Lebong"},{"KdKab":"703 ","Kdprop":7,"NamaKab":"Bengkulu Utara"},{"KdKab":"704 ","Kdprop":7,"NamaKab":"Kaur"},{"KdKab":"705 ","Kdprop":7,"NamaKab":"Seluma"},{"KdKab":"706 ","Kdprop":7,"NamaKab":"Muko-muko"},{"KdKab":"707 ","Kdprop":7,"NamaKab":"Lebong"},{"KdKab":"708 ","Kdprop":7,"NamaKab":"Kepahiang"},{"KdKab":"709 ","Kdprop":7,"NamaKab":"Kota Bengkulu"},{"KdKab":"801 ","Kdprop":8,"NamaKab":"Lampung Barat"},{"KdKab":"802 ","Kdprop":8,"NamaKab":"Tanggamus"},{"KdKab":"803 ","Kdprop":8,"NamaKab":"Lampung Selatan"},{"KdKab":"804 ","Kdprop":8,"NamaKab":"Lampung Timur"},{"KdKab":"805 ","Kdprop":8,"NamaKab":"Lampung Tengah"},{"KdKab":"806 ","Kdprop":8,"NamaKab":"Lampung Utara"},{"KdKab":"807 ","Kdprop":8,"NamaKab":"Way Kanan"},{"KdKab":"808 ","Kdprop":8,"NamaKab":"Tulang Bawang"},{"KdKab":"809 ","Kdprop":8,"NamaKab":"Kota Bandar Lampung"},{"KdKab":"810 ","Kdprop":8,"NamaKab":"Kota Metro"},{"KdKab":"901 ","Kdprop":9,"NamaKab":"Bangka"},{"KdKab":"902 ","Kdprop":9,"NamaKab":"Belitung"},{"KdKab":"903 ","Kdprop":9,"NamaKab":"Bangka Barat"},{"KdKab":"904 ","Kdprop":9,"NamaKab":"Bangka Tengah"},{"KdKab":"905 ","Kdprop":9,"NamaKab":"Bangka Selatan"},{"KdKab":"906 ","Kdprop":9,"NamaKab":"Belitung Timur"},{"KdKab":"907 ","Kdprop":9,"NamaKab":"Kota Pangkal Pinang"},{"KdKab":"9999","Kdprop":99,"NamaKab":"Masukkan Alamat"},{"KdKab":"1607","Kdprop":16,"NamaKab":"Tanggerang"},{"KdKab":"1810","Kdprop":18,"NamaKab":"Lombok Utara"},{"KdKab":"1226","Kdprop":12,"NamaKab":"Pangandaran"}]
};

class Province extends React.Component {
  
  onSelect = (event) => {
    this.props.onSelect(parseInt(event.target.value));
  }
  render() {

    return (
      <Field name="propinsi" component={FormSelect} onChange={this.onSelect} label="Jenis Pendaftaran *">
      <option>Pilih Jenis</option>
       <SelectProp data={this.props.data}/>  
     </Field>
      
    );
  }
}

class City extends React.Component {
  onSelect = (event) => {
    this.props.onSelect(parseInt(event.target.value));
  }
  render() {

    return (
      <Field name="kabupaten" component={FormSelect} onClick={this.onSelect} label="Jenis Pendaftaran *">
      <option>Pilih Jenis</option>
       <SelectKab data={this.props.data}/>  
     </Field>
    );
  }
}


class Address extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      provinces: data.provinces,
      Kdprop: null,
      cities: data.cities,
      cityId: null
    };
  }

  onSelectProvince = (provId) => {
    const selCities = data.cities.filter(c => c.Kdprop === provId);
    this.setState({
      Kdprop: provId,
      cities: selCities
    });
  }

  onSelectCity = (city) => {
    this.setState({
      cityId: city.id
    });
  }

  render() {
    
    return (
     <>
        <Province
          data={this.state.provinces}
          selectedId={this.state.Kdprop}
          onSelect={this.onSelectProvince} />
        
        <City
          data={this.state.cities}
          selectedId={this.state.cityId}
          onSelect={this.onSelectCity} />
     </>
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
                 <Address/>
                  <Row>
                  <Col md={12}>
                  <Field name="alamat" component={FormInput} type="text" label="Alamat Lengkap *" placeholder="Alamat lengkap anda" />
                  </Col>
                  </Row>

                  <Row>
                  <Col md={3}>
                  <Field name="rt" type="text" component={FormInput} label="RT *" placeholder="RT" maxLength="2" />   
                  </Col>
                  <Col md={3}>
                  <Field name="rw" type="text" component={FormInput} label="RW *" placeholder="RW" maxLength="2" />   
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
                <Col md={6}>
                <Field name="ibu" component={FormInput} type="text" label="Nama Ibu Kandung *" placeholder="Nama Ibu Kandung" />
                
                </Col>
                <Col md={6}>
                <Field name="telp_ortu" component={FormInput} type="text" label="Nomor HP Orang Tua *" placeholder="Nomor HP Orang Tua" />
                </Col>

                </Row>

        
     

                <Row>
                <Col md={12}>
                <Field name="alamat_ortu" component={FormInput} type="text" label="Alamat Lengkap*" placeholder="Alamat Orang Tua" value={props.values.alamat}/>
                </Col>
                </Row>

                <Row>
                <Col md={3}>
                <Field name="rt_ortu" type="text" component={FormInput} label="RT *" placeholder="RT" maxLength="2" value={props.values.rt} />   
                </Col>
                <Col md={3}>
                <Field name="rw_ortu" type="text" component={FormInput} label="RW *" placeholder="RW" maxLength="2" value={props.values.rw} />   
                </Col>
                <Col md={6}>      
                <Field name="kelurahan_ortu" type="text" component={FormInput} label="Desa/Kelurahan *" placeholder="Desa/Kelurahan" value={props.values.kelurahan}/>
                </Col>
                </Row>

                <Row>
                <Col md={6}>
                <Field name="kecamatan" type="text" component={FormInput} label="Kecamatan *" placeholder="Kecamatan" value={props.values.kecamatan}/>
                </Col>
                <Col md={6}>
                <Field name="kodepos_ortu" type="text" component={FormInput} label="Kode Pos *" placeholder="Kode Pos" value={props.values.kodepos}/>
                </Col>
                </Row>

                

                </Col>
                </Row>
              </Fragment>
            );
          }}
        </Wizard.Page>
        
       
        <Wizard.Page>
{props => {
  const {
    values,
    handleChange,
    setFieldValue
  } = props;
 console.log(props, "this props 1");
  return (
    
    <Fragment>
    <h3 style={{fontWeight:"700"}} className="mb-1">Jenis Pendaftaran</h3>
    <h5 className="mb-4">Jenis Pendaftaran Reguler dan Beasiswa</h5>

    <Container>
      <FormGroup>
      <h3 className="text-center mb-3">Apakah anda memiliki Kartu KIP-Kuliah? *</h3>
      
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
      {props.values.status_registrasi === "Bidikmisi" &&
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
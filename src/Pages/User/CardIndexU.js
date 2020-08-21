import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import moment from 'moment'

class CardIndexU extends Component {
    constructor(props) {
        super(props)
        this.state = {
            url: 'http://localhost/pmbamikompwt-server/assets/img/'
        }
    }
    componentDidMount = () => {
      console.log(this.props.data)
    }
    render() {
        const Row = this.props.data.map(r => (
        <tbody key={r.nodaf}>
        <tr>
            <td>Nomor Daftar</td>
            <td className="text-right" style={{fontWeight: "600"}}>{r.nodaf}</td>
        </tr>
        <tr>
            <td>Nomor Referensi</td>
            <td className="text-right" style={{fontWeight: "600"}}>{r.noref}</td>
        </tr>
        <tr>
            <td>Tanggal Daftar</td>
            <td className="text-right" style={{fontWeight: "600"}}>{moment(r.tgldaftar).format('DD-MM-YYYY')}</td>
        </tr>
        <tr>
            <td>Gelombang</td>
            <td className="text-right" style={{fontWeight: "600"}}>{r.gelombang}</td>
        </tr>
        <tr>
            <td>Jenis Mahasiswa</td>
            <td className="text-right" style={{fontWeight: "600"}}>{r.JENIS_MHS}</td>
        </tr>
        <tr>
            <td>Kelas</td>
            <td className="text-right" style={{fontWeight: "600"}}>{r.KELAS}</td>
        </tr>
        
        <tr>
            <td>Pilihan 1</td>
            <td className="text-right" style={{fontWeight: "600"}}>{r.pilihan1}</td>
        </tr>
        <tr>
            <td>Pilihan 2</td>
            <td className="text-right" style={{fontWeight: "600"}}>{r.pilihan2}</td>
        </tr>
        <tr>
            <td>Nama</td>
            <td className="text-right" style={{fontWeight: "600"}}>{r.nama}</td>
        </tr>
        <tr>
            <td>Email</td>
            <td className="text-right" style={{fontWeight: "600"}}>{r.email}</td>
        </tr>
        <tr>
            <td>NIK/KTP</td>
            <td className="text-right" style={{fontWeight: "600"}}>{r.nikktp}</td>
        </tr>
        <tr>
            <td>Jenis Kelamin</td>
            <td className="text-right" style={{fontWeight: "600"}}>{r.jk === "Pria" ? "Laki-Laki" : ""}{r.jk === "Wanita" ? "Perempuan" : ""}</td>
        </tr>
        <tr>
            <td>Tempat, Tanggal Lahir</td>
        <td className="text-right" style={{fontWeight: "600"}}>{r.tempatlahir}, {moment(r.tgllahir).format('DD-MM-YYYY')}</td>
        </tr>
        <tr>
            <td>Agama</td>
        <td className="text-right" style={{fontWeight: "600"}}>{r.AGAMA === "I" ? "Islam" : ""}{r.AGAMA === "P" ? "Protestan" : ""}{r.AGAMA === "K" ? "Katholik" : ""}{r.AGAMA === "B" ? "Budha" : ""}{r.AGAMA === "H" ? "Hindu" : ""}{r.AGAMA === "L" ? "Lainnya" : ""}</td>
        </tr>
        <tr>
            <td>Nomor Telp/HP</td>
            <td className="text-right" style={{fontWeight: "600"}}>{r.telepon}</td>
        </tr>
        <tr>
            <td>Asal Sekolah</td>
            <td className="text-right" style={{fontWeight: "600"}}>{r.sekolah}</td>
        </tr>
        <tr>
            <td>Jurusan</td>
            <td className="text-right" style={{fontWeight: "600"}}>{r.jurusan}</td>
        </tr>
        <tr>
            <td>Nilai NEM/UN</td>
            <td className="text-right" style={{fontWeight: "600"}}>{r.nem}</td>
        </tr>
        <tr>
            <td>Tahun Lulus</td>
            <td className="text-right" style={{fontWeight: "600"}}>{r.tahun_lulus}</td>
        </tr>
        <tr>
            <td>Alamat</td>
            <td className="text-right" style={{fontWeight: "600"}}>{r.alamat}<br/>
            {r.kelurahan} RT {r.rt}/RW {r.rw}<br/>
            Kec. {r.kecamatan}, Kab. {r.kabupaten}<br/>
            {r.propinsi} - {r.kodepos}
            </td>
        </tr>
        <tr>
            <td>Nama Ibu</td>
            <td className="text-right" style={{fontWeight: "600"}}>{r.NAMA_ORTU}</td>
        </tr>
        <tr>
            <td>No Telepon Orang TUa</td>
            <td className="text-right" style={{fontWeight: "600"}}>{r.TELP_ORTU}</td>
        </tr>
        <tr>
            <td>Alamat Orang Tua</td>
            <td className="text-right" style={{fontWeight: "600"}}>{r.ALAMATORTU}<br/>
            {r.KELURAHAN_ORTU} RT {r.RT_ORTU}/RW {r.RW_ORTU}<br/>
            Kec. {r.KECAMATAN_ORTU}, Kab. {r.KABUPATEN_ORTU}<br/>
            {r.PROPINSI_ORTU} - {r.KODEPOS_ORTU}
            </td>
        </tr>
        <tr>
            <td>Informasi Pendaftaran</td>
            <td className="text-right" style={{fontWeight: "600"}}>{r.komentar}</td>
        </tr>
        </tbody>
        ))
        return (
            <>
            <Card className="mt-5">
                <div className="mx-auto">
                <img
                alt="Foto"
                width="120"
                className="rounded-circle border mx-auto"
                src={'./logo2.jpg'} style={{marginTop: "-60px",objectFit: "cover",borderRadius: "50%",height: "120px",width: "120px"}}/>
                </div>
            
                <Card.Body>
                <Card.Title>Informasi Siswa</Card.Title>
                    <table className="table table-sm">
                    {Row}
                    </table>
                    
                </Card.Body>
                </Card>
               
            </>
        )
    }
}

export default CardIndexU
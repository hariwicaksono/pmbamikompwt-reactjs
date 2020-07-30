const validate = (values) => {
  const errors = {};
  if (!values.nama) {
    errors.nama = 'Nama Lengkap harus diisi';
  }

  if (!values.nik) {
    errors.nik = 'Nomor NIK/KTP harus diisi';
  }

  if (!values.tempatlahir) {
    errors.tempatlahir = 'Tempat lahir harus diisi';
  }

  if (!values.tgllahir) {
    errors.tgllahir = 'Tanggal lahir harus diisi';
  }

  if (!values.jk) {
    errors.jk = 'Jenis kelamin harus dipilih';
  }
  
  if (!values.agama) {
    errors.agama = 'Agama harus dipilih';
  }

  if (!values.telepon) {
    errors.telepon = 'Telp/Nomor HP harus diisi';
  }

  if (!values.email) {
    errors.email = 'Email harus diisi';
  }

  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = 'Invalid email address'
  }


  return errors;
};

export default validate;

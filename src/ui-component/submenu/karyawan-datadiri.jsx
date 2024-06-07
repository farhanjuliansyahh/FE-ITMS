import * as React from 'react';
import { useEffect, useState } from 'react';
import { Avatar, Grid, Stack } from '@mui/material';
import { LockOpenRounded } from '@mui/icons-material';
import ButtonOptional from '../../ui-component/button/ButtonOptional.jsx';
import EmpatKolomDataKaryawan from "../../ui-component/tables/empatkolomdatakaryawan.jsx";
// import DuaKolomDataKaryawan from "../../ui-component/tables/duakolomdatakaryawan.jsx";
import User1 from '../../../public/assets/images/users/user-round.svg';
import { Link } from 'react-router-dom';
import.meta.env.VITE_API_BASE_URL

function createData(colname1, coldata1, colname2, coldata2) {
  return { colname1, coldata1, colname2, coldata2 };
}

export default function DataDiriKaryawan({ photosize, spaces, statusButton }) {
  const url = import.meta.env.VITE_API_BASE_URL
  const nippos = sessionStorage.getItem('nippos');
  const [profile, setProfile] = useState([])

  const getprofile = () => {
    return fetch(url + `getprofile?nippos=${nippos}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        throw error;
      });
  };

  useEffect(() => {
    getprofile()
      .then((data) => {
        setProfile(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const toTitleCase = (str) => {
    return str.toLowerCase().split(' ').map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}-${month}-${year}`;
  };

  const mapGender = (gender) => {
    if (gender === 'F') return 'Perempuan';
    if (gender === 'M') return 'Laki-laki';
    return gender; 
  };

  const namaJabatan = profile.jabatan && profile.jabatan.nama_jabatan ? toTitleCase(profile.jabatan.nama_jabatan) : '';
  const namaBagian = profile.bagian && profile.bagian.nama_bagian ? toTitleCase(profile.bagian.nama_bagian) : '';
  const namaKantor = profile.nopend && profile.nopend.nama_kantor ? toTitleCase(profile.nopend.nama_kantor) : '';
  const nopendKantor = profile.nopend && profile.nopend.nopend ? toTitleCase(profile.nopend.nopend) : '';

  const rows_informasi = [
    createData(
      'Nama', profile.nama ? toTitleCase(profile.nama) : '', 
      'NIPPOS', profile.nippos || ''
    ),
    createData(
      'Tanggal Lahir', profile.tanggal_lahir ? formatDate(profile.tanggal_lahir) : '', 
      'Jenis Kelamin', profile.jenis_kelamin ? mapGender(profile.jenis_kelamin) : ''
    ),
    createData(
      'Agama', '', 
      'Email', profile.email),
  ];

  const rows_posisi = [
    createData(
      'Jabatan', namaJabatan, 
      'Bagian', namaBagian
    ),
    createData(
      'Tempat Kerja', namaKantor + ' ' + nopendKantor),
  ];

  // const rows_alamat = [
  //   createData('Alamat KTP', 'KP. MAYAK KALER \nRT : 002 / RW : 005, MAYAK - CIBEBER \nKAB. CIANJUR, JAWA BARAT - 43262'),
  //   createData('Alamat Domisili', 'JL PAHLAWAN NO 59 BANDUNG \nRT : 000 / RW : 000, SUKALUYU - CIBEUNYING KALER \nKOTA BANDUNG, JAWA BARAT - 41115'),
  // ];

  return (
    <Grid container>
      <Grid item xs={spaces[0]} marginRight={8}>
        <Stack direction="column" justifyContent="space-between" alignItems="center" >
          <Avatar alt="John Doe" src={User1} style={{ width: photosize, height: photosize, marginBottom: 24 }} />
          {statusButton && (
            <Link to='./change-password'>
              <ButtonOptional
                icon={LockOpenRounded}
                LabelName={'Ubah Kata Sandi'}
              />
            </Link>
          )}
        </Stack>
      </Grid>
      <Grid item xs={spaces[1]}>
        <EmpatKolomDataKaryawan tabletitle={'Informasi Pribadi'} rows={rows_informasi} widthDataCell={170} />
        {/* <DuaKolomDataKaryawan tabletitle={'Alamat'} rows={rows_alamat} widthDataCell={170} /> */}
        <EmpatKolomDataKaryawan tabletitle={'Posisi'} rows={rows_posisi} widthDataCell={170} />
      </Grid>
    </Grid>
  );
}

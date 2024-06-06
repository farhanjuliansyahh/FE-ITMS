import * as React from 'react';
import { Avatar, Grid, Stack } from '@mui/material';
import { LockOpenRounded } from '@mui/icons-material';
import ButtonOptional from '../../ui-component/button/ButtonOptional';
import EmpatKolomDataKaryawan from "../../ui-component/tables/empatkolomdatakaryawan";
import DuaKolomDataKaryawan from "../../ui-component/tables/duakolomdatakaryawan";
import User1 from '../../../public/assets/images/users/user-round.svg';
import { Link } from 'react-router-dom';

function createData(colname1, coldata1, colname2, coldata2) {
  return { colname1, coldata1, colname2, coldata2 };
}

const rows_informasi = [
  createData('Nama', 'Abang', 'NIPPOS', '990494379'),
  createData('Tanggal Lahir', '01-12-1990', 'Jenis Kelamin', 'Laki-laki'),
  createData('Agama', 'Islam', 'Email', '900494379@posindonesia.co.id'),
];

const rows_posisi = [
  createData('Jabatan', 'Manajer', 'Bagian', 'Performance Management'),
  createData('Tempat Kerja', 'KANTOR PUSAT BANDUNG 40005'),
];

const rows_alamat = [
  createData('Alamat KTP', 'KP. MAYAK KALER \nRT : 002 / RW : 005, MAYAK - CIBEBER \nKAB. CIANJUR, JAWA BARAT - 43262'),
  createData('Alamat Domisili', 'JL PAHLAWAN NO 59 BANDUNG \nRT : 000 / RW : 000, SUKALUYU - CIBEUNYING KALER \nKOTA BANDUNG, JAWA BARAT - 41115'),
];

export default function DataDiriKaryawan({ photosize, spaces, statusButton }) {
  const boxStyle = {
    padding: '20px',
    width: '100%',
    borderRadius: '12px',
  };

  return (
    <Grid container>
      <Grid item xs={spaces[0]}>
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

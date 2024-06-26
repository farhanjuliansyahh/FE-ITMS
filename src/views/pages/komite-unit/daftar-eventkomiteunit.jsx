import * as React from 'react';
import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { AddCircleOutlineRounded, CalendarMonthOutlined, FileDownloadOutlined, PersonPinOutlined, TaskOutlined } from '@mui/icons-material';
import notFoundImage from '../../../../public/assets/images/ilustration/notfound.png';
import MainCard from '../../../ui-component/cards/MainCard.jsx';
import KuotaKomiteUnitAlert from '../../../ui-component/cards/KuotaKomiteUnitAlert.jsx';
import DetailKaryawandiKomiteUnit from './detail-karyawandikomiteunit.jsx';
import.meta.env.VITE_API_BASE_URL

// ==============================|| DETAIL EVENT KOMITE UNIT ||============================== //
// ============|| yang ada tab "Daftar Karyawan" dan "Karyawan Terkualifikasi" ||============ //

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && (
        <Box sx={{ pt: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

export default function DetailEventKomiteUnit() {
  const { id } = useParams();
  const [value, setValue] = React.useState(0);
  const [eventaktif, seteventaktif] = useState([]);
  const [DaysLeft, setDaysLeft] = useState('');
  const [rowstrue, setRowstrue] = useState([]);
  const [rowsfalse, setRowsfalse] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const nippos = sessionStorage.getItem('nippos');
  const [kuota, setkuota] = useState('');
  const url = import.meta.env.VITE_API_BASE_URL

  const fetcheventdetail = () => {
    return fetch(url + `getoneevent?id=${id}`) // Replace with your actual endpoint
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        return data; // Return the parsed JSON data
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        throw error; // Rethrow the error to handle it elsewhere
      });
  };

  useEffect(() => {
    fetcheventdetail()
      .then((data) => {
        seteventaktif(data.event);
        // setLoading(false); // Move this line to the end of the .then block
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        // setLoading(false);
      });
  }, []);

  useEffect(() => {
    // Fetch data from API
    fetch(url + `getparameterkuota?id=1`)
      .then((response) => response.json())
      .then((data) => {
        // Initialize rows based on fetched score data
        const kuota = data['kuota'] || 0;
        // Set the initial values from the fetched data
        setkuota(kuota);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array to run effect only once

  const {
    eventid,
    nama_event,
    deskripsi,
    tipe_komite_talent,
    tipekomite,
    kode_rumpun,
    nama_rumpun,
    tanggal_mulai,
    tanggal_selesai,
    evenstatus_id
  } = eventaktif;

  useEffect(() => {
    // Convert 'tanggal_selesai' from ISO 8601 format to a Date object
    const endDate = new Date(tanggal_selesai);
    // Get the current date
    const currentDate = new Date();
    // Calculate the difference in milliseconds between the current date and the 'tanggal_selesai'
    const timeDifference = endDate.getTime() - currentDate.getTime();
    // Convert the difference from milliseconds to days
    const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    // Set the number of days left
    setDaysLeft(daysDifference);
  }, [tanggal_selesai]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const eventidactive = eventid;

  useEffect(() => {
    // Fetch data from API
    fetch(url + `getkandidatfalse?eventtalentid=${id}&nippos=${nippos}`)
      .then((response) => response.json())
      .then((datafalse) => {
        // Update state with API data
        setRowsfalse(datafalse.map((row, index) => ({ ...row, id: index + 1 })));
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array to run effect only once

  useEffect(() => {
    // Fetch data from API
    fetch(url + `getkandidattrue?eventtalentid=${id}&nippos=${nippos}`)
      .then((response) => response.json())
      .then((datatrue) => {
        // Update state with API data
        setRowstrue(datatrue.map((row, index) => ({ ...row, id: index + 1 })));
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array to run effect only once

  const boxStyle = {
    padding: '20px',
    width: '100%',
    borderRadius: '12px'
  };

  const FlexContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    paddingBottom: '24px'
  });

  const BoxContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column'
  });

  const FlexTitle = styled('div')({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    paddingBottom: 0
  });

  const CalendarIcon = styled(CalendarMonthOutlined)({
    fontSize: '1rem',
    color: '#1C2D5A'
  });

  const CountdownLabel = styled('div')({
    backgroundColor: '#FFEDED',
    color: '#F44336',
    padding: '8px 16px',
    borderRadius: '16px',
    fontWeight: 600,
    fontSize: '16px'
  });

  const totalLength = rowsfalse.length + rowstrue.length;
  const halfLength = Math.ceil((totalLength * kuota) / 100);
  return (
    <MainCard>
      <Box sx={boxStyle}>
        <FlexContainer>
          <BoxContainer>
            <FlexTitle style={{ paddingBottom: '8px' }}>
              <Typography style={{ fontSize: '24px', fontWeight: 'bold' }}>{nama_event}</Typography>
            </FlexTitle>

            <FlexTitle>
              <CalendarIcon style={{ color: '#828282' }} />
              <Typography style={{ fontSize: '14px', color: '#828282' }}>
                {tanggal_mulai &&
                  new Date(tanggal_mulai).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}{' '}
                -{' '}
                {tanggal_selesai &&
                  new Date(tanggal_selesai).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
              </Typography>
            </FlexTitle>
          </BoxContainer>

          <div style={{ flex: '1' }}> </div>

          {evenstatus_id !== 8 && <CountdownLabel>{DaysLeft !== null && DaysLeft > 0
                ? `${DaysLeft} hari lagi`
                : DaysLeft === 0
                  ? 'Hari Ini'
                  : `Terlewat ${Math.abs(DaysLeft)} hari`}</CountdownLabel>}
        </FlexContainer>
      </Box>

      <Box sx={{ borderBottom: 1, borderTop: 1, borderColor: 'divider', marginTop: -3 }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab icon={<PersonPinOutlined />} iconPosition="start" label="Daftar Karyawan" {...a11yProps(0)} />
          <Tab icon={<TaskOutlined />} iconPosition="start" label="Karyawan Terkualifikasi" {...a11yProps(1)} />
        </Tabs>
      </Box>

      {/* Daftar Karyawan */}
      <CustomTabPanel value={value} index={0}>
        <Box sx={boxStyle}>
          <KuotaKomiteUnitAlert totalKaryawan={totalLength} halfLength={halfLength} />
          <DetailKaryawandiKomiteUnit
            Title={'Tabel Karyawan'}
            Icon={AddCircleOutlineRounded}
            Label={'Tambah Data'}
            ActionForButton={true}
            id={id}
            rows={rowsfalse}
            source_kuota={halfLength}
            checkboxSelection={true}
            sudahdipilih={rowstrue.length}
            caption={'Belum ada karyawan untuk dipilih'}
          />
        </Box>
      </CustomTabPanel>

      {/* Karyawan Terkualifikasi*/}
      <CustomTabPanel value={value} index={1}>
        <Box sx={boxStyle}>
          <KuotaKomiteUnitAlert totalKaryawan={totalLength} halfLength={halfLength} />
          <DetailKaryawandiKomiteUnit
            Title={'Tabel Karyawan Terkualifikasi'}
            Icon={FileDownloadOutlined}
            Label={'Unduh Data'}
            id={id}
            rows={rowstrue}
            nippos={nippos}
            source_kuota={halfLength}
            checkboxSelection={false}
            sudahdipilih={rowstrue.length}
            caption={'Anda belum memiliki karyawan terkualifikasi'}
          />
        </Box>
      </CustomTabPanel>
    </MainCard>
  );
}

import * as React from 'react';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { useLocation, useParams } from 'react-router-dom';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import { CalendarMonthOutlined, EmojiEvents, Person, PersonPinOutlined, School, TaskOutlined } from '@mui/icons-material';

import MainCard from '../../../ui-component/cards/MainCard.jsx';
import CheckDataAlert from '../../../ui-component/cards/CheckDataAlert.jsx';
import AccordionKaryawan from '../../../ui-component/cards/AccordionKaryawan.jsx';
import RiwayatPendidikanKaryawan from '../../../ui-component/submenu/karyawan-riwayatpendidikan.jsx';
import KompetensiKaryawan from '../../../ui-component/submenu/karyawan-kompetensi.jsx';
import DataDiriKaryawan from '../../../ui-component/submenu/karyawan-datadiri.jsx';
import ProfileAccordion from '../../../ui-component/modal/profile-accordion.jsx';
import ConfirmationMessage from '../../../ui-component/cards/Alert-PI-CL.jsx';
import.meta.env.VITE_API_BASE_URL

// ==============================|| PROFIL KARYAWAN ||============================== //

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

export default function ProfileKaryawan() {
  const { id } = useParams();
  const [value, setValue] = React.useState(0);
  const [eventaktif, seteventaktif] = useState([]);
  const [DaysLeft, setDaysLeft] = useState('');
  const [infokaryawan, setInforkaryawan] = useState([])
  const  [statusprofile, setStatusproflie] = useState([])
  const url =import.meta.env.VITE_API_BASE_URL

  const nippos = sessionStorage.getItem('nippos'); 

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

  const fetchstatusprofile = () => {
    return fetch(url + `getallprofile?eventtalentid=${id}&nippos=${nippos}`) // Replace with your actual endpoint
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

  const fetchinforkaryawan = () => {
    return fetch(url + `getinforkaryawan?nippos=${nippos}`) // Replace with your actual endpoint
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

  const fetchprofile = () => {
    return fetch(url + `getinforkaryawan?nippos=${nippos}`) // Replace with your actual endpoint
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
        setLoading(false); // Move this line to the end of the .then block
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchinforkaryawan()
      .then((data) => {
        setInforkaryawan(data);
        setLoading(false); // Move this line to the end of the .then block
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchstatusprofile()
      .then((data) => {
        setStatusproflie(data);
        setLoading(false); // Move this line to the end of the .then block
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

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

  const eventidactive = eventid;

  const [isDisabled, setIsDisabled] = useState(true);

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
          <Tab icon={<PersonPinOutlined />} iconPosition="start" label="Data Diri" {...a11yProps(0)} />
          <Tab icon={<TaskOutlined />} iconPosition="start" label="Persetujuan Talent" {...a11yProps(1)} />
        </Tabs>
      </Box>

      {/* Data Diri */}
      <CustomTabPanel value={value} index={0}>
        <Box sx={boxStyle}>
          <CheckDataAlert />
          <AccordionKaryawan summary={'Data Diri'} icon={Person} content={<DataDiriKaryawan photosize={128} spaces={[2, 9]} />} />
          {/* <AccordionKaryawan summary={'Riwayat Pendidikan'} icon={School} content={<RiwayatPendidikanKaryawan />} disabled={isDisabled}/> */}
          {/* <AccordionKaryawan summary={'Kompetensi'} icon={EmojiEvents} content={<KompetensiKaryawan />} disabled={isDisabled}/> */}
        </Box>
      </CustomTabPanel>

      {/* Persetujuan Talent*/}
      <CustomTabPanel value={value} index={1}>
        <Box sx={boxStyle}>
          <ConfirmationMessage />
          <div style={{ marginTop: '24px' }}>
            <ProfileAccordion detail={infokaryawan} eventid={id} statusprofile={statusprofile}/>
          </div>
        </Box>
      </CustomTabPanel>
    </MainCard>
  );
}

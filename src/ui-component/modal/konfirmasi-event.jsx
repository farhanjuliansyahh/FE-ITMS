import React, { useEffect, useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, Divider } from '@mui/material';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs'; // Import dayjs for date manipulation

function KonfirmasiNextEvent({ open, handleClose, eventid, rumpun_jabatan, ketua }) {
  const [deadlinesource, setdeadlinesource] = useState('');
  const [activejoblevel, setactivejoblevel] = useState(['']);
  const [activejobfam, setactivejobfam] = useState('');
  const [isLoading, setLoading] = useState(true);

  const handleDateChange = (date) => {
    console.log(date); // Check the date value
    setdeadlinesource(date); // Update the state with the selected date
  };

  const ketuakomiterole = (nippos) => {
    return fetch('http://localhost:4000/assignroleketuakomite', {
      method: 'POST', // Specify the HTTP method (POST, GET, etc.)
      headers: {
        'Content-Type': 'application/json' // Specify the content type
      },
      body: JSON.stringify({
        // Include any data you want to send in the request body
        nippos: nippos
      }) // Convert the bodyData object to a JSON string
    })
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

  const postdeadlinesource = () => {
    return fetch('http://localhost:4000/createdeadline', {
      method: 'POST', // Specify the HTTP method (POST, GET, etc.)
      headers: {
        'Content-Type': 'application/json' // Specify the content type
      },
      body: JSON.stringify({
        // Include any data you want to send in the request body
        event_id: eventid,
        deadline_1: deadlinesource,
        deadline_2: null,
        deadline_3: null,
        deadline_4: null,
        deadline_5: null,
        deadline_6: null,
        startdate_1: new Date(),
        startdate_2: null,
        startdate_3: null,
        startdate_4: null,
        startdate_5: null,
        startdate_6: null,
        status: 2
      }) // Convert the bodyData object to a JSON string
    })
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

  const getactivejoblevel = () => {
    return fetch(`http://localhost:4000/getactivejoblevel?eventtalentid=${eventid}`, {
      method: 'GET', // Specify the HTTP method (POST, GET, etc.)
      headers: {
        'Content-Type': 'application/json' // Specify the content type
      },
      status: 2
    }) // Convert the bodyData object to a JSON string
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
    getactivejoblevel()
      .then((data) => {
        setactivejoblevel(data);
        setLoading(false); // Move this line to the end of the .then block
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const joblevelclean = activejoblevel.join(',');

  const posttalentsource = () => {
    return fetch(`http://localhost:4000/getfilterkaryawan?kode_rumpun_jabatan=${rumpun_jabatan}&job_level=${joblevelclean}`, {
      method: 'POST', // Specify the HTTP method (POST, GET, etc.)
      headers: {
        'Content-Type': 'application/json' // Specify the content type
      },
      body: JSON.stringify({
        // Include any data you want to send in the request body
        eventtalentid: eventid
      }) // Convert the bodyData object to a JSON string
    })
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

  const mapkomiteunit = () => {
    return fetch('http://localhost:4000/cariotomatis', {
      method: 'POST' // Specify the HTTP method (POST, GET, etc.)
    })
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

  const notifikasikomiteunit = () => {
    return fetch(`http://localhost:4000/notifkomiteunit`, {
      method: 'POST', // Specify the HTTP method (POST, GET, etc.)
      headers: {
        'Content-Type': 'application/json' // Specify the content type
      },
      body: JSON.stringify({
        // Include any data you want to send in the request body
        eventtalentid: eventid
      }) // Convert the bodyData object to a JSON string
    })
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

  const rolekomiteunit = () => {
    return fetch('http://localhost:4000/assignkomiteunit', {
      method: 'POST', // Specify the HTTP method (POST, GET, etc.)
      headers: {
        'Content-Type': 'application/json' // Specify the content type
      },
      body: JSON.stringify({
        // Include any data you want to send in the request body
        eventid: eventid
      }) // Convert the bodyData object to a JSON string
    })
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

  const mulaiButtonStyle = {
    backgroundColor: '#1C2D5A',
    color: '#fff',
    borderRadius: '12px',
    padding: '14px 24px',
    transition: 'background-color 0.3s'
  };

  const batalkanButtonStyle = {
    backgroundColor: '#D32F2F',
    color: '#fff',
    borderRadius: '12px',
    padding: '14px 24px',
    transition: 'background-color 0.3s',
    fontSize: '14px'
  };

  const hovermulaiStyle = {
    backgroundColor: '#122350' // Darker shade for hover
  };

  const hoverBatalkanStyle = {
    backgroundColor: '#B71C1C' // Darker shade for hover
  };

  const ButtonsContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: '0px 8px',
    gap: '16px',
    justifyContent: 'space-between'
  });

  const [isHoveredmulai, setIsHoveredmulai] = useState(false);
  const [isHoveredBatalkan, setIsHoveredBatalkan] = useState(false);

  const mulaiButton = (
    <Button
      endIcon={<ArrowForwardRoundedIcon />}
      style={isHoveredmulai ? { ...mulaiButtonStyle, ...hovermulaiStyle } : mulaiButtonStyle}
      onMouseEnter={() => setIsHoveredmulai(true)}
      onMouseLeave={() => setIsHoveredmulai(false)}
      onClick={async () => {
        try {
          await postdeadlinesource(); // Call the function to post deadline source
          await posttalentsource(); // Chain posttalentsource() after postdeadlinesource()
          await mapkomiteunit(); // Chain mapkomiteunit() after posttalentsource()
          await notifikasikomiteunit();
          await rolekomiteunit();
          await ketuakomiterole(ketua);
          window.location.href = `http://localhost:3000/talent/detail-event/${eventid}`;
          handleClose(); // Close the popup after all operations are finished
        } catch (error) {
          console.error('Error:', error);
          // Handle error if any of the promises reject
        }
      }}
    >
      Mulai Event
    </Button>
  );

  const batalkanButton = (
    <Button
      endIcon={<CancelOutlinedIcon />}
      style={isHoveredBatalkan ? { ...batalkanButtonStyle, ...hoverBatalkanStyle } : batalkanButtonStyle}
      onMouseEnter={() => setIsHoveredBatalkan(true)}
      onMouseLeave={() => setIsHoveredBatalkan(false)}
      onClick={handleClose}
    >
      Batalkan
    </Button>
  );

  const DividerContainer = styled('div')({
    width: '100%',
    textAlign: 'center',
    backgroundColor: '#E0E0E0'
  });

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        <Typography style={{ fontSize: '24px', fontWeight: '700', textAlign: 'center', marginTop: '10px' }}>
          Konfirmasi Mulai Event
        </Typography>
      </DialogTitle>
      <DividerContainer>
        <Divider orientation="horizontal" flexItem />
      </DividerContainer>
      <DialogContent>
        <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '500px' } }} noValidate autoComplete="off">
          <div>
            {/* <TextField
                            required
                            id="outlined-required"
                            label="Tanggal Berakhir Talent Profile"
                        /> */}
            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoItem>
                <DatePicker
                  views={['year', 'month', 'day']}
                  InputLabelProps={{ shrink: true }}
                  label="Tanggal Berakhir Talent Source *"
                  onChange={handleDateChange} // Add onChange handler
                  format="YYYY-MM-DD"
                  required
                />
              </DemoItem>
            </LocalizationProvider> */}

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoItem>
                <DatePicker
                  views={['year', 'month', 'day']}
                  InputLabelProps={{ shrink: true }}
                  label="Tanggal Berakhir Talent Source *"
                  onChange={handleDateChange}
                  format="YYYY-MM-DD"
                  required
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      // onBlur={() => setIsStartDateTouched(true)}
                      error={isStartDateTouched && !startdate}
                      helperText={isStartDateTouched && !startdate ? 'Tanggal Mulai harus diisi' : ''}
                    />
                  )}
                  minDate={dayjs()} // Set minimum date to today
                />
              </DemoItem>
            </LocalizationProvider>
            <Typography style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '14px', marginTop: '16px' }}>
              Apakah anda yakin memulai Event ini?
            </Typography>
            <Typography style={{ textAlign: 'center', color: '#828282', fontSize: '14px', marginTop: '16px' }}>
              Anda tidak dapat menghapus event setelah dimulai.
            </Typography>
          </div>
        </Box>
      </DialogContent>
      <DialogActions sx={{ padding: '0 24px 24px 24px ' }}>
        <ButtonsContainer>
          {batalkanButton}
          {mulaiButton}
        </ButtonsContainer>
      </DialogActions>
    </Dialog>
  );
}

export default KonfirmasiNextEvent;

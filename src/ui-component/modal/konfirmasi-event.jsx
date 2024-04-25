import React, { useState } from 'react';
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

function KonfirmasiNextEvent({ open, handleClose, eventid }) {
    const [deadlinesource, setdeadlinesource] = useState('');

    const handleDateChange = (date) => {
        console.log(date); // Check the date value
        setdeadlinesource(date); // Update the state with the selected date
    };

    const postdeadlinesource = () => {
        return fetch('http://localhost:4000/createdeadline', {
            method: 'POST', // Specify the HTTP method (POST, GET, etc.)
            headers: {
              'Content-Type': 'application/json', // Specify the content type
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
                status:2
            }) // Convert the bodyData object to a JSON string
          }) 
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            return data; // Return the parsed JSON data
          })
          .catch(error => {
            console.error('Error fetching data:', error);
            throw error; // Rethrow the error to handle it elsewhere
          });
      };

      const posttalentsource = () => {
        return fetch('http://localhost:4000/getfilterkaryawan?kode_rumpun_jabatan=9&job_level=C1,B1,C2', {
            method: 'POST', // Specify the HTTP method (POST, GET, etc.)
            headers: {
              'Content-Type': 'application/json', // Specify the content type
            },
            body: JSON.stringify({
                // Include any data you want to send in the request body
                eventtalentid: eventid
            }) // Convert the bodyData object to a JSON string
          }) 
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            return data; // Return the parsed JSON data
          })
          .catch(error => {
            console.error('Error fetching data:', error);
            throw error; // Rethrow the error to handle it elsewhere
          });
      };

      const mapkomiteunit = () => {
        return fetch('http://localhost:4000/cariotomatis', {
            method: 'POST', // Specify the HTTP method (POST, GET, etc.)
          }) 
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            return data; // Return the parsed JSON data
          })
          .catch(error => {
            console.error('Error fetching data:', error);
            throw error; // Rethrow the error to handle it elsewhere
          });
      };
    const mulaiButtonStyle = {
        backgroundColor: '#1C2D5A',
        color: '#fff',
        borderRadius: '12px',
        padding: '14px 24px',
        transition: 'background-color 0.3s',
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
            onClick={() => {
                postdeadlinesource() // Call the function to post deadline source
                    .then(() => posttalentsource()) // Chain posttalentsource() after postdeadlinesource()
                    .then(() => mapkomiteunit()) // Chain mapkomiteunit() after posttalentsource()
                    .then(() => handleClose()); // Close the popup after all operations are finished
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
                <Box
                    component="form"
                    sx={{ '& .MuiTextField-root': { m: 1, width: '500px' } }}
                    noValidate
                    autoComplete="off"
                >
                    <div>
                        {/* <TextField
                            required
                            id="outlined-required"
                            label="Tanggal Berakhir Talent Profile"
                        /> */}
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoItem>
                                <DatePicker
                                    views={['year', 'month', 'day']}
                                    InputLabelProps={{ shrink: true }}
                                    label="Tanggal Berakhir Talent Source *"
                                    onChange={handleDateChange} // Add onChange handler
                                    format='YYYY-MM-DD'
                                    required
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
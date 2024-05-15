import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, MenuItem } from '@mui/material';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import PropTypes from 'prop-types';
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
import { styled, useTheme } from '@mui/material/styles';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';


// import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function HapusEvent({ open, handleClose, eventid }) {
    const [selectedCommittee, setSelectedCommittee] = useState('');
    const [selectedJobLevel, setSelectedJobLevel] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);

    const hapusdata = async () => {
        try {
            // Make an HTTP DELETE request to your API endpoint
            const response = await fetch(`http://localhost:4000/hapusevent`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    // Add any other headers if needed
                },
                body: JSON.stringify({
                    // Include any data you want to send in the request body
                    eventid: eventid
                })
                // You can pass any data in the request body if required
                // body: JSON.stringify({}),
            });
    
            // Check if the request was successful (status code 200-299)
            if (response.ok) {
                // If successful, handle the response or perform any necessary actions
                console.log('Data deleted successfully');
            } else {
                // If not successful, throw an error or handle the error response
                throw new Error('Failed to delete data');
            }
        } catch (error) {
            // Handle any errors that occurred during the process
            console.error('Error deleting data:', error.message);
        }
    };
    

    const handleCommitteeChange = (event) => {
        setSelectedCommittee(event.target.value);
    };
    const handleJobLevel = (event) => {
        setSelectedJobLevel(event.target.value);
    };
    const JobLevelOption = ['A2','A1','B2','B1','C2','C1','D3','D2','D1','E3','E2','E1','F3','F2','F1']

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const mulaiButtonStyle = {
        border: '1px solid #EF4123',
        color: '#EF4123',
        borderRadius: '12px',
        paddingLeft: '12px',
        paddingRight: '12px'
        }

    const batalkanButtonStyle = {
        backgroundColor: '#D32F2F',
        color:'#fff',
        borderRadius: '12px',
        paddingLeft: '12px',
        paddingRight: '12px',
        transition: 'background-color 0.3s'
    }
    
    const hoverMulaiStyle = {
        backgroundColor: '#fff' // Darker shade for hover
      
    };
    
    const hoverBatalkanStyle = {
        backgroundColor: '#B71C1C' // Darker shade for hover
    };

    const ButtonsContainer = styled('div')({
        display: 'flex',
        alignItems: 'center',
        width:'100%',
        padding: '0px 8px',
        gap:'16px',
        justifyContent: 'space-between'
    });

    const [isHoveredMulai, setIsHoveredMulai] = useState(false);
    const [isHoveredBatalkan, setIsHoveredBatalkan] = useState(false);

  const mulaiButton = (
    <Button
      endIcon={<DeleteOutlineRoundedIcon />}
      style={isHoveredMulai ? { ...mulaiButtonStyle, ...hoverMulaiStyle } : mulaiButtonStyle}
      onMouseEnter={() => setIsHoveredMulai(true)}
      onMouseLeave={() => setIsHoveredMulai(false)}
      onClick={() => {
        hapusdata() // Call the function to post deadline source
            .then(() => handleClose()); // Close the popup after all operations are finished
    }}
    >
      Ya, Hapus Data
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

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
                <Typography style={{ fontSize: '24px', fontWeight: 'bold', textAlign:'center' }}>
                    Hapus Data
                </Typography>
            </DialogTitle>
            <DialogContent>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '500px' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <div>
                        {/* <TextField
                            required
                            id="outlined-required"
                            label="Nama Event"
                        /> */}
                    <Typography style={{textAlign:'center', fontWeight:'bold', fontSize:'14px', marginTop:'16px'}}>
                        Apakah anda yakin menghapus Event ini?
                    </Typography>
                    <Typography style={{textAlign:'center', color:'#828282', fontSize:'14px', marginTop:'16px'}}>
                        Anda tidak dapat mengembalikan data yang sudah dihapus

                    </Typography>
                    </div>
                </Box>
            </DialogContent>
            <DialogActions sx={{padding:'0 24px 24px 24px '}}>
                {/* <Button onClick={handleClose}>Batalkan</Button>
                <Button onClick={handleClose} variant="contained" sx={{ backgroundColor: '#1a2b5a', color: 'white' }}>
                    Add
                </Button> */}

                 <ButtonsContainer>
                    {batalkanButton}
                    {mulaiButton}
                </ButtonsContainer>
            </DialogActions>
        </Dialog>
    );
}

export default HapusEvent ;

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
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';


// import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function KonfirmasiTalentSource({ open, handleClose, eventid, onConfirmation }) {
    const [selectedCommittee, setSelectedCommittee] = useState('');
    const [selectedJobLevel, setSelectedJobLevel] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);

    const handleCommitteeChange = (event) => {
        setSelectedCommittee(event.target.value);
    };
    const handleJobLevel = (event) => {
        setSelectedJobLevel(event.target.value);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const mulaiButtonStyle = {
        backgroundColor: '#1C2D5A',
        color:'#fff',
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
        backgroundColor: '#122350' // Darker shade for hover
      
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
            endIcon={<CheckCircleOutlineRoundedIcon />}
            style={isHoveredMulai ? { ...mulaiButtonStyle, ...hoverMulaiStyle } : mulaiButtonStyle}
            onMouseEnter={() => setIsHoveredMulai(true)}
            onMouseLeave={() => setIsHoveredMulai(false)}
            onClick={async () => {
                try {
                    await onConfirmation();
                    handleClose();
                } catch (error) {
                    console.error("Error confirming:", error);
                    // Optionally, you can handle the error here, e.g., display an error message.
                }
            }}
        >
            Sudah Benar
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

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
                <Typography style={{ fontSize: '24px', fontWeight: 'bold', textAlign:'center' }}>
                    Konfirmasi Talent Source
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
                        Apakah anda yakin data karyawan yang dipilih sudah benar?
                    </Typography>
                    <Typography style={{textAlign:'center', color:'#828282', fontSize:'14px', marginTop:'16px'}}>
                        Anda tidak dapat membatalkan karyawan yang sudah dipilih

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

export default KonfirmasiTalentSource ;

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


// import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function KonfirmasiEvent({ open, handleClose }) {
    const [selectedCommittee, setSelectedCommittee] = useState('');
    const [selectedJobLevel, setSelectedJobLevel] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);

    const handleCommitteeChange = (event) => {
        setSelectedCommittee(event.target.value);
    };
    const handleJobLevel = (event) => {
        setSelectedJobLevel(event.target.value);
    };
    const JobLevelOption = ['A2', 'A1', 'B2', 'B1', 'C2', 'C1', 'D3', 'D2', 'D1', 'E3', 'E2', 'E1', 'F3', 'F2', 'F1']

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const mulaiButtonStyle = {
        backgroundColor: '#1C2D5A',
        color: '#fff',
        borderRadius: '12px',
        paddingLeft: '12px',
        paddingRight: '12px',
        transition: 'background-color 0.3s'
    }

    const batalkanButtonStyle = {
        backgroundColor: '#D32F2F',
        color: '#fff',
        borderRadius: '12px',
        paddingLeft: '12px',
        paddingRight: '12px',
        transition: 'background-color 0.3s',
    }

    const hoverMulaiStyle = {
        backgroundColor: '#2B468E' // Darker shade for hover

    };

    const hoverBatalkanStyle = {
        backgroundColor: '#B71C1C' // Darker shade for hover
    };

    const ButtonsContainer = styled('div')({
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        justifyContent: 'left',
        marginLeft: '50px'
    });

    const ButtonsContainer1 = styled('div')({
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        justifyContent: 'right',
        marginRight: '50px'
    });

    

    const [isHoveredMulai, setIsHoveredMulai] = useState(false);
    const [isHoveredBatalkan, setIsHoveredBatalkan] = useState(false);

    const mulaiButton = (
        <Button
            endIcon={<ArrowForwardRoundedIcon />}
            style={isHoveredMulai ? { ...mulaiButtonStyle, ...hoverMulaiStyle } : mulaiButtonStyle}
            onMouseEnter={() => setIsHoveredMulai(true)}
            onMouseLeave={() => setIsHoveredMulai(false)}
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

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
                <Typography style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold' }}>
                    Konfirmasi Mulai Event
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
                        <TextField
                            required
                            id="outlined-required"
                            label="Nama Event"
                        />
                        <Typography style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '14px', marginTop: '16px' }}>
                            Apakah anda yakin memulai Event ini?
                        </Typography>
                        <Typography style={{ textAlign: 'center', color: '#828282', fontSize: '14px', marginTop: '16px' }}>
                            Anda tidak dapat menghapus event setelah mulai

                        </Typography>
                    </div>
                </Box>
            </DialogContent>

            <ButtonsContainer>
                    {batalkanButton}
                </ButtonsContainer>

            <ButtonsContainer1>
                    {mulaiButton}
                </ButtonsContainer1>
                
            <DialogActions>
                <ButtonsContainer>
                </ButtonsContainer>
            </DialogActions>
        </Dialog>
    );
}

export default KonfirmasiEvent;

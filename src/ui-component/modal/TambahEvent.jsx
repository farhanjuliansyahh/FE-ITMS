import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, MenuItem } from '@mui/material';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function AddEventModal({ open, handleClose }) {
    const [selectedCommittee, setSelectedCommittee] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);

    const handleCommitteeChange = (event) => {
        setSelectedCommittee(event.target.value);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
                <Typography style={{ fontSize: '24px', fontWeight: 'bold' }}>
                    Tambah Event
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
                        <TextField
                            select
                            required
                            id="outlined-required"
                            label="Tipe Committee Talent"
                            value={selectedCommittee}
                            onChange={handleCommitteeChange}
                        >
                            <MenuItem value="committee1">Committee 1</MenuItem>
                            <MenuItem value="committee2">Committee 2</MenuItem>
                            <MenuItem value="committee3">Committee 3</MenuItem>
                        </TextField>

                        <TextField
                            select
                            required
                            id="outlined-required"
                            label="Job Level"
                            value={selectedCommittee}
                            onChange={handleCommitteeChange}
                        >
                            <MenuItem value="committee1">Committee 1</MenuItem>
                            <MenuItem value="committee2">Committee 2</MenuItem>
                            <MenuItem value="committee3">Committee 3</MenuItem>
                        </TextField>

                        <TextField
                            select
                            required
                            id="outlined-required"
                            label="Job Family"
                            value={selectedCommittee}
                            onChange={handleCommitteeChange}
                        >
                            <MenuItem value="committee1">Committee 1</MenuItem>
                            <MenuItem value="committee2">Committee 2</MenuItem>
                            <MenuItem value="committee3">Committee 3</MenuItem>
                        </TextField>

                        <TextField
                            select
                            required
                            id="outlined-required"
                            label="Head of Committee"
                            value={selectedCommittee}
                            onChange={handleCommitteeChange}
                        >
                            <MenuItem value="committee1">Committee 1</MenuItem>
                            <MenuItem value="committee2">Committee 2</MenuItem>
                            <MenuItem value="committee3">Committee 3</MenuItem>
                        </TextField>

                        <TextField
                            select
                            required
                            id="outlined-required"
                            label="Committee"
                            value={selectedCommittee}
                            onChange={handleCommitteeChange}
                        >
                            <MenuItem value="committee1">Committee 1</MenuItem>
                            <MenuItem value="committee2">Committee 2</MenuItem>
                            <MenuItem value="committee3">Committee 3</MenuItem>
                        </TextField>
                       
                        <TextField
                            select
                            required
                            id="outlined-required"
                            label="Pertanyaan"
                            value={selectedCommittee}
                            onChange={handleCommitteeChange}
                        >
                            <MenuItem value="committee1">Committee 1</MenuItem>
                            <MenuItem value="committee2">Committee 2</MenuItem>
                            <MenuItem value="committee3">Committee 3</MenuItem>
                        </TextField>

                        <TextField
                            id="outlined-required"
                            label="Kuota Talent"
                        />
                        {/* <TextField
                            required
                            id="outlined-required"
                            label="Tanggal Mulai Event"
                        /> */}

                        {/* <DatePicker
                            label="Tanggal Mulai Event"
                            value={selectedDate}
                            onChange={handleDateChange}
                            renderInput={(params) => <TextField {...params} />}
                            inputFormat="dd/MM/yyyy"
                        /> */}

                        {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker />
                        </LocalizationProvider> */}

                        <TextField
                            required
                            id="outlined-required"
                            label="Tanggal Berakhir Event"
                        />
                        <TextField
                            id="outlined-required"
                            label="Deskripsi"
                        />
                    </div>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleClose} variant="contained" sx={{ backgroundColor: '#1a2b5a', color: 'white' }}>
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default AddEventModal;

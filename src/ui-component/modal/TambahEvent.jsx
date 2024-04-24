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

import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


function AddEventModal({ open, handleClose }) {
    const [selectedCommittee, setSelectedCommittee] = useState('');
    const [selectedJobLevel, setSelectedJobLevel] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);

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
                        <Autocomplete
                            multiple
                            id="checkboxes-tags-demo"
                            options={JobLevelOption}
                            disableCloseOnSelect
                            getOptionLabel={(option) => option}
                            renderOption={(props, option, { selected }) => (
                                <li {...props}>
                                <Checkbox
                                    icon={icon}
                                    checkedIcon={checkedIcon}
                                    style={{ marginRight: 8 }}
                                    checked={selected}
                                />
                                {option}
                                </li>
                            )}
                            style={{ width: 500 }}
                            renderInput={(params) => (
                                <TextField {...params} label="Job Level" placeholder="Job Level" />
                              
                            )}
                        />

                        {/* <TextField
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
                        </TextField> */}

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

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoItem>
                            <DatePicker
                                disableFuture
                                views={['year', 'month', 'day']}
                                InputLabelProps={{ shrink: true }}
                                label="Tanggal Mulai Event *"
                                required
                            />
                            </DemoItem>
                        </LocalizationProvider>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoItem>
                            <DatePicker
                                disableFuture
                                views={['year', 'month', 'day']}
                                InputLabelProps={{ shrink: true }}
                                label="Tanggal Berakhir Event *"
                                required
                            />
                            </DemoItem>
                        </LocalizationProvider>

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

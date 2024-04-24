import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, MenuItem } from '@mui/material';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import PropTypes from 'prop-types';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;


function AddEventModal({ open, handleClose }) {
    const [selectedCommittee, setSelectedCommittee] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [jobLevelOptions, setJobLevelOptions] = useState([]);
    const [selectedJobLevel, setSelectedJobLevel] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedJobFamily, setSelectedJobFamily] = useState('');
    const [jobFamilyOptions, setJobFamilyOptions] = useState([]);
    const [selectedketuakomite, setselectedketuakomite] = useState('');
    const [committeememberOptions, setcommitteememberOptions] = useState([]);
    const [selectedcomitteemember, setSelectedCommitteemember] = useState([]);
    const [questionOption, setquestionOption] = useState([]);
    const [selectedquestion, setselectedquestion] = useState([]);

    const handleCommitteeChange = (event) => {
        setSelectedCommittee(event.target.value);
        setSelectedCommitteemember([])
        setSelectedJobLevel([])
        fetchJobLevels(event.target.value);
        fetchketuakomite(event.target.value);
        fetchcommitteemember(event.target.value);
    };

    const fetchJobLevels = async (selectedCommittee) => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:4000/getjoblevel?tipe_komite=${selectedCommittee}`);
            const data = await response.json();
            setJobLevelOptions(data.job_level);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching job levels:', error);
            setLoading(false);
        }
    };

    const handleJobLevelChange = (event) => {
        setSelectedJobLevel(event.target.value);
    };

    useEffect(() => {
        // Fetch job family data
        const fetchJobFamily = async () => {
            try {
                const response = await fetch('http://localhost:4000/getjobfamily');
                const data = await response.json();
                setJobFamilyOptions(data.fam);
            } catch (error) {
                console.error('Error fetching job family:', error);
            }
        };
        fetchJobFamily();
    }, []);

    const handleJobFamilyChange = (event) => {
        setSelectedJobFamily(event.target.value);
    };

    const fetchketuakomite = async (selectedCommittee) => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:4000/getheadcommit?id_komite_talent=${selectedCommittee}`);
            const data = await response.json();
            setselectedketuakomite(data[0]);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching job levels:', error);
            setLoading(false);
        }
    };

    const handleHeadOfCommitteeChange = (event) => {
        setselectedketuakomite(event.target.value);
    };

    const fetchcommitteemember = async (selectedCommittee) => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:4000/getcommite?id_komite_talent=${selectedCommittee}`);
            const data = await response.json();
            setcommitteememberOptions(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching job levels:', error);
            setLoading(false);
        }
    };

    const handleCommitteememberChange = (event) => {
        setSelectedCommitteemember(event.target.value);
    }

    useEffect(() => {
        // Fetch job family data
        const fetchquestion = async () => {
            try {
                const response = await fetch('http://localhost:4000/getquestion');
                const data = await response.json();
                setquestionOption(data.quest);
            } catch (error) {
                console.error('Error fetching job family:', error);
            }
        };
        fetchquestion();
    }, []);

    const handlequestionchange = (event) => {
        setselectedquestion(event.target.value)
    }

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
                            <MenuItem value="1">Committee 1</MenuItem>
                            <MenuItem value="2">Committee 2</MenuItem>
                            <MenuItem value="3">Committee 3</MenuItem>
                        </TextField>

                        <Autocomplete
                            multiple
                            id="checkboxes-tags-demo"
                            options={jobLevelOptions}
                            onChange={handleJobLevelChange}
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

                        <TextField
                            select
                            required
                            id="outlined-required"
                            label="Job Family"
                            onChange={handleJobFamilyChange}
                        >
                            {jobFamilyOptions.map((jobFamily) => (
                                <MenuItem value={jobFamily.id}>
                                    {jobFamily.nama_rumpun_jabatan}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            required
                            id="outlined-required"
                            label="Head of Committee"
                            value={selectedketuakomite.nama}
                            onChange={handleHeadOfCommitteeChange}
                        />

                        <Autocomplete
                            multiple
                            id="checkboxes-tags-demo"
                            options={committeememberOptions}
                            getOptionLabel={(option) => option.nama}
                            value={selectedcomitteemember}
                            disableCloseOnSelect
                            onChange={(event, newValue) => {
                                setSelectedCommitteemember(newValue);
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Committee"
                                    variant="outlined"
                                />
                            )}
                        />

                        <Autocomplete
                            multiple
                            id="checkboxes-tags-demo"
                            options={questionOption}
                            getOptionLabel={(option) => option.pertanyaan}
                            value={selectedquestion}
                            disableCloseOnSelect
                            onChange={(event, newValue) => {
                                setselectedquestion(newValue);
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Question"
                                    variant="outlined"
                                />
                            )}
                        />

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

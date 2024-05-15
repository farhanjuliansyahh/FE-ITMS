import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
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
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CancelOutlined from '@mui/icons-material/CancelOutlined';

import ButtonPrimary from '../../ui-component/button/ButtonPrimary';
import ButtonError from '../../ui-component/button/ButtonError';

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
    const [startdate, setstartdate] = useState('');
    const [enddate, setenddate] = useState('');
    const [eventName, setEventName] = useState('');
    const [quota, setquota] = useState('');
    const [deskripsi, setdeskripsi] = useState('');
    const [isDeskripsiTouched, setIsDeskripsiTouched] = useState(false);
    const [isHeadOfCommitteeFetched, setIsHeadOfCommitteeFetched] = useState(false);

    const handleEventNameChange = (event) => {
        setEventName(event.target.value); // Update state with input value
    };

    const handlequotachange = (event) => {
        setquota(event.target.value); // Update state with input value
    };

    const handledeskripsichange = (event) => {
        setdeskripsi(event.target.value); // Update state with input value
        setIsDeskripsiTouched(true);
    };

    const handleCommitteeChange = (event) => {
        setSelectedCommittee(event.target.value);
        setSelectedCommitteemember([]);
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

    const handleJobLevelChange = (event, newJobLevels) => {
        setSelectedJobLevel(newJobLevels);
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
        console.log(selectedquestion)
    }

    const fetchketuakomite = async (selectedCommittee) => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:4000/getheadcommit?id_komite_talent=${selectedCommittee}`);
            const data = await response.json();
            setselectedketuakomite(data[0]);
            setIsHeadOfCommitteeFetched(true); // Set to true when data is fetched
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

    const handleStartDateChange = (date) => {
        console.log(date); // Check the date value
        setstartdate(date); // Update the state with the selected date
    };

    const handleEndDateChange = (date) => {
        console.log(date); // Check the date value
        setenddate(date); // Update the state with the selected date
    };

    const postData = async () => {
        try {
            const arrayquestion = selectedquestion.map(selectedquestion => selectedquestion.id)
            const arraymember = selectedcomitteemember.map(selectedcomitteemember => selectedcomitteemember.nippos)

            console.log(startdate);
            // Make the POST request to the API endpoint
            const response = await fetch('http://localhost:4000/addevent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    // Include any data you want to send in the request body
                    nama_event: eventName,
                    tipe_komite: selectedCommittee,
                    nippos_ketua: selectedketuakomite.nippos,
                    kode_rumpun_jabatan: selectedJobFamily,
                    kuota: quota,
                    deskripsi: deskripsi,
                    tanggal_mulai: startdate,
                    tanggal_selesai: enddate,
                    level_jabatan: selectedJobLevel,
                    id_pertanyaan: arrayquestion,
                    nippos_komite: arraymember
                })
            });

            // Check if the request was successful
            if (!response.ok) {
                throw new Error('Failed to post data');
            }

            // If successful, handle the response data (if needed)
            const responseData = await response.json();
            console.log('Response data:', responseData);
        } catch (error) {
            // Handle any errors that occur during the API call
            console.error('Error posting data:', error.message);
        }
    };

    const CloseDialog = () => {
        setSelectedCommittee('')
        setJobLevelOptions([])
        setSelectedJobLevel([])
        setSelectedJobFamily('')
        setJobFamilyOptions([])
        setselectedketuakomite('')
        setcommitteememberOptions([])
        setSelectedCommitteemember([])
        setquestionOption([])
        setselectedquestion([])
        setstartdate('')
        setenddate('')
        setEventName('')
        setquota('')
        setdeskripsi('')
        setIsDeskripsiTouched(false)
        setIsHeadOfCommitteeFetched(false)

        handleClose()
    }

    return (
        <Dialog open={open} onClose={CloseDialog}>
            <DialogTitle sx={{ borderBottom: 1, borderColor: 'divider', textAlign: 'center' }}>
                <Typography style={{ fontSize: '24px', fontWeight: 'bold' }}>
                    Tambah Event
                </Typography>
            </DialogTitle>
            <DialogContent>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '500px' },
                        paddingTop: '32px',
                        paddingLeft: '12px',
                        paddingBottom: '12px',
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <div>
                        <TextField
                            required
                            id="outlined-required"
                            label="Nama Event"
                            value={eventName} // Set value from state
                            onChange={handleEventNameChange} // Handle input change
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
                                <MenuItem key={jobFamily.kode_rumpun_jabatan} value={jobFamily.kode_rumpun_jabatan}>
                                    {jobFamily.nama_rumpun_jabatan}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            required
                            id="outlined-required"
                            label="Head of Committee"
                            value={selectedketuakomite.nama || ''}
                            onChange={handleHeadOfCommitteeChange}
                            InputLabelProps={{ shrink: isHeadOfCommitteeFetched }} // Ensure label is always shrunk if data is fetched
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
                                    label="Questions"
                                    variant="outlined"
                                />
                            )}
                        />

                        <TextField
                            required
                            id="outlined-required"
                            label="Talent Pool Quota"
                            value={quota} // Set value from state
                            onChange={handlequotachange} // Handle input change
                            inputProps={{
                                inputMode: 'numeric',
                                pattern: '[0-9]*',
                                onKeyPress: (event) => {
                                    // Allow only numbers
                                    const keyCode = event.keyCode || event.which;
                                    const keyValue = String.fromCharCode(keyCode);
                                    const isValid = /\d/.test(keyValue);
                                    if (!isValid) {
                                        event.preventDefault();
                                    }
                                },
                            }}
                            // inputProps={{
                            //     inputMode: 'numeric',
                            //     pattern: '[0-9]*'
                            // }}
                        />

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoItem>
                                <DatePicker
                                    views={['year', 'month', 'day']}
                                    InputLabelProps={{ shrink: true }}
                                    label="Tanggal Mulai Event *"
                                    onChange={handleStartDateChange}
                                    format='YYYY-MM-DD'
                                    required
                                />
                            </DemoItem>
                        </LocalizationProvider>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoItem>
                                <DatePicker
                                    views={['year', 'month', 'day']}
                                    InputLabelProps={{ shrink: true }}
                                    label="Tanggal Berakhir Event *"
                                    onChange={handleEndDateChange}
                                    format='YYYY-MM-DD'
                                    required
                                />
                            </DemoItem>
                        </LocalizationProvider>

                        <TextField
                            id="outlined-required"
                            label="Deskripsi"
                            multiline
                            rows={4}
                            value={deskripsi} // Set value from state
                            onChange={handledeskripsichange} // Handle input change
                            required // Tandai bahwa field ini harus diisi
                            error={isDeskripsiTouched && !deskripsi} // Set error jika deskripsi kosong
                            helperText={isDeskripsiTouched && !deskripsi && "Deskripsi tidak boleh kosong"} // Tampilkan pesan error jika deskripsi kosong
                        />
                    </div>
                </Box>
            </DialogContent>
            <DialogActions sx={{ padding: '24px', justifyContent: 'space-between' }}>
                <ButtonError Color="#ffffff" icon={CancelOutlined} LabelName={'Batalkan'} onClick={CloseDialog} />
                <ButtonPrimary Color="#ffffff" icon={AddCircleOutlineIcon} LabelName={'Buat Event'} onClick={() => {
                    CloseDialog(); // Close the dialog
                    postData();   // Execute the postData function
                }} />
            </DialogActions>
        </Dialog>
    );
}

export default AddEventModal;

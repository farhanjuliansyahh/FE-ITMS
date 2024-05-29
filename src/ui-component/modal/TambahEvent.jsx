import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CancelOutlined from '@mui/icons-material/CancelOutlined';
import ButtonPrimary from '../../ui-component/button/ButtonPrimary';
import ButtonError from '../../ui-component/button/ButtonError';
import dayjs from 'dayjs'; // Import dayjs for date manipulation
import { toast } from 'react-toastify';
import AlertBerhasil from '../../ui-component/modal/alert-berhasil';
import IlustrasiBerhasil from '../../../public/assets/images/ilustration/berhasil.png';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function AddEventModal({ open, handleClose, setrefresh }) {
  const [selectedCommittee, setSelectedCommittee] = useState('');
  const [isCommitteeTouched, setIsCommitteeTouched] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [jobLevelOptions, setJobLevelOptions] = useState([]);
  const [selectedJobLevel, setSelectedJobLevel] = useState([]);
  const [isJobLevelTouched, setIsJobLevelTouched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedJobFamily, setSelectedJobFamily] = useState('');
  const [jobFamilyOptions, setJobFamilyOptions] = useState([]);
  const [isJobFamilyTouched, setIsJobFamilyTouched] = useState(false);
  const [selectedketuakomite, setselectedketuakomite] = useState('');
  const [isKetuaKomiteTouched, setIsKetuaKomiteTouched] = useState(false);
  const [committeememberOptions, setcommitteememberOptions] = useState([]);
  const [selectedcomitteemember, setSelectedCommitteemember] = useState([]);
  const [isComitteeMemberTouched, setIsComitteeMemberTouched] = useState(false);
  const [questionOption, setquestionOption] = useState([]);
  const [selectedquestion, setselectedquestion] = useState([]);
  const [isQuestionTouched, setIsQuestionTouched] = useState(false);
  const [startdate, setstartdate] = useState('');
  const [isStartDateTouched, setIsStartDateTouched] = useState(false);
  const [enddate, setenddate] = useState('');
  const [isEndDateTouched, setIsEndDateTouched] = useState(false); // State for end date touch
  const [eventName, setEventName] = useState('');
  const [isEventNameTouched, setIsEventNameTouched] = useState(false);
  const [quota, setquota] = useState('');
  const [quotaError, setQuotaError] = useState(false); // State to track quota error
  const [isQuotaTouched, setIsQoutaTouched] = useState(false);
  const [deskripsi, setdeskripsi] = useState('');
  const [isDeskripsiTouched, setIsDeskripsiTouched] = useState(false);
  const [isHeadOfCommitteeFetched, setIsHeadOfCommitteeFetched] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const handleEventNameChange = (event) => {
    setEventName(event.target.value); // Update state with input value
  };

  const handlequotachange = (event) => {
    console.log('event', event.target.value);
    const value = event.target.value;
    // Check if the value is a valid number
    if (/^\d*$/.test(value)) {
      setQuotaError(false);
      setquota(value); // Update state with input value
    } else {
      setQuotaError(true);
    }
  };

  useEffect(() => {
    console.log(isQuotaTouched, quotaError);
  }, [isQuotaTouched, quotaError]);

  const handledeskripsichange = (event) => {
    setdeskripsi(event.target.value); // Update state with input value
  };

  const handleCommitteeChange = (event) => {
    setSelectedCommittee(event.target.value);
    setSelectedCommitteemember([]);
    fetchJobLevels(event.target.value);
    fetchketuakomite(event.target.value);
    fetchcommitteemember(event.target.value);
    setSelectedJobLevel([]);
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
    console.log('joblevebl', newJobLevels);
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
  }, [open]);

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
  }, [open]);

  const handlequestionchange = (event) => {
    setselectedquestion(event.target.value);
    console.log(selectedquestion);
  };

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

  const handleStartDateChange = (date) => {
    // console.log(date); // Check the date value
    setstartdate(date); // Update the state with the selected date
  };

  const handleEndDateChange = (date) => {
    // console.log(date); // Check the date value
    setenddate(date); // Update the state with the selected date
  };

  useEffect(() => {
    console.log('enddate', enddate);
  }, [enddate]);
  
  const [openAlertBerhasil, setOpenAlertBerhasil] = useState(false);

  const postData = async () => {
    try {
      const arrayquestion = selectedquestion.map((selectedquestion) => selectedquestion.id);
      const arraymember = selectedcomitteemember.map((selectedcomitteemember) => selectedcomitteemember.nippos);

      // Menambahkan 1 hari pada startdate dan enddate
      const adjustedStartDate = dayjs(startdate).add(1, 'day');
      const adjustedEndDate = dayjs(enddate).add(1, 'day');

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
          tanggal_mulai: adjustedStartDate,
          tanggal_selesai: adjustedEndDate,
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

      // Show success toast notification
        // toast.success('Event berhasil dibuat.');
        setOpenAlertBerhasil(true);

      // Reload halaman setelah 2 detik agar data event diperbarui secara visual
        // window.location.reload();
        setrefresh(true);
 
      

    } catch (error) {
      // Handle any errors that occur during the API call
      console.error('Error posting data:', error.message);
    }
  };

    // Save all the changes of questions using Simpan Button and show Success Modal
    const handleCloseAlertBerhasil = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
        setOpenAlertBerhasil(false);
    };

  const CloseDialog = () => {
    setIsCommitteeTouched(false);
    setIsJobLevelTouched(false);
    setIsJobLevelTouched(false);
    setIsJobFamilyTouched(false);
    setIsKetuaKomiteTouched(false);
    setIsComitteeMemberTouched(false);
    setIsQuestionTouched(false);
    setIsStartDateTouched(false);
    setIsEndDateTouched(false);
    setIsEventNameTouched(false);
    setIsQoutaTouched(false);
    setIsDeskripsiTouched(false);
    setIsHeadOfCommitteeFetched(false);
    setSelectedCommittee('');
    setJobLevelOptions([]);
    setSelectedJobLevel([]);
    setSelectedJobFamily('');
    setJobFamilyOptions([]);
    setselectedketuakomite('');
    setcommitteememberOptions([]);
    setSelectedCommitteemember([]);
    setquestionOption([]);
    setselectedquestion([]);
    setstartdate('');
    setenddate('');
    setEventName('');
    setquota('');
    setdeskripsi('');

    handleClose();
  };

  useEffect(() => {
    const validateForm = () => {
      return (
        eventName &&
        selectedCommittee &&
        selectedJobLevel.length > 0 &&
        selectedJobFamily &&
        selectedketuakomite &&
        selectedcomitteemember.length > 0 &&
        selectedquestion.length > 0 &&
        quota &&
        !quotaError &&
        deskripsi &&
        startdate &&
        enddate
      );
    };

    setIsFormValid(validateForm());
  }, [
    eventName,
    selectedCommittee,
    selectedJobLevel,
    selectedJobFamily,
    selectedketuakomite,
    selectedcomitteemember,
    selectedquestion,
    quota,
    quotaError,
    deskripsi,
    startdate,
    enddate
  ]);

  const validateQuota = () => {
    if (isQuotaTouched) {
      if (quotaError) {
        return 'Talent Pool Quota harus berupa angka';
      } else if (!quota) {
        return 'Talent Pool Quota harus diisi';
      }
    } else {
      return '';
    }
  };

  return (
    <>
    <AlertBerhasil
      open={openAlertBerhasil}
      handleClose={handleCloseAlertBerhasil}
      Logo={IlustrasiBerhasil}
      Keterangan={'Berhasil'}
    />
    <Dialog open={open} onClose={CloseDialog}>
      <DialogTitle sx={{ borderBottom: 1, borderColor: 'divider', textAlign: 'center' }}>
        <Typography style={{ fontSize: '24px', fontWeight: 'bold' }}>Tambah Event</Typography>
      </DialogTitle>
      <DialogContent>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '500px' },
            paddingTop: '32px',
            paddingLeft: '12px',
            paddingBottom: '12px'
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
              onBlur={() => setIsEventNameTouched(true)}
              error={isEventNameTouched && !eventName}
              helperText={isEventNameTouched && !eventName ? 'Nama Event harus diisi' : ''}
            />
            <TextField
              select
              required
              id="outlined-required"
              label="Tipe Committee Talent"
              value={selectedCommittee}
              onChange={handleCommitteeChange}
              onBlur={() => setIsCommitteeTouched(true)}
              error={isCommitteeTouched && !selectedCommittee}
              helperText={isCommitteeTouched && !selectedCommittee ? 'Tipe Committee Talent harus diisi' : ''}
            >
              <MenuItem value="1">Committee 1</MenuItem>
              <MenuItem value="2">Committee 2</MenuItem>
              <MenuItem value="3">Committee 3</MenuItem>
            </TextField>

            <Autocomplete
              multiple
              id="checkboxes-tags-demo"
              options={jobLevelOptions}
              value={selectedJobLevel} // Ubah value menjadi selectedJobLevel
              onChange={handleJobLevelChange}
              disableCloseOnSelect
              getOptionLabel={(option) => option}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
                  {option}
                </li>
              )}
              style={{ width: 500 }}
              renderInput={(params) => (
                <TextField
                  required
                  onBlur={() => {
                    setIsJobLevelTouched(true);
                    console.log('params', params);
                  }}
                  error={isJobLevelTouched && !selectedJobLevel.length > 0}
                  helperText={isJobLevelTouched && !selectedJobLevel.length > 0 ? 'Job Level harus diisi' : ''}
                  {...params}
                  label="Job Level"
                  placeholder="Job Level"
                />
              )}
            />

            <TextField
              select
              required
              id="outlined-required"
              label="Job Family"
              onChange={handleJobFamilyChange}
              onBlur={() => setIsJobFamilyTouched(true)}
              error={isJobFamilyTouched && !selectedJobFamily}
              helperText={isJobFamilyTouched && !selectedJobFamily ? 'Job Family harus diisi' : ''}
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
              onBlur={() => setIsKetuaKomiteTouched(true)}
              error={isKetuaKomiteTouched && !selectedketuakomite}
              helperText={isKetuaKomiteTouched && !selectedketuakomite ? 'Head of Committe harus diisi' : ''}
            />

            <Autocomplete
              multiple
              id="checkboxes-tags-demo"
              options={committeememberOptions}
              getOptionLabel={(option) => option.nama}
              value={selectedcomitteemember}
              disableCloseOnSelect
              onChange={(event, newValue) => setSelectedCommitteemember(newValue)}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
                  {option.nama}
                </li>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Committee"
                  variant="outlined"
                  required
                  onBlur={() => setIsComitteeMemberTouched(true)}
                  error={isComitteeMemberTouched && !selectedcomitteemember.length > 0}
                  helperText={isComitteeMemberTouched && !selectedcomitteemember.length > 0 ? 'Committee harus diisi' : ''}
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
              onChange={(event, newValue) => setselectedquestion(newValue)}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
                  {option.pertanyaan}
                </li>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Questions"
                  variant="outlined"
                  required
                  onBlur={() => setIsQuestionTouched(true)}
                  error={isQuestionTouched && !selectedquestion.length > 0}
                  helperText={isQuestionTouched && !selectedquestion.length > 0 ? 'Questions harus diisi' : ''}
                />
              )}
            />

            <TextField
              required
              id="outlined-required"
              label="Talent Pool Quota"
              value={quota} // Set value from state
              onChange={handlequotachange} // Handle input change
              onFocus={() => {}}
              onBlur={() => {
                setIsQoutaTouched(true);
                console.log('touched');
                setQuotaError(false);
              }}
              error={(isQuotaTouched && quotaError) || (isQuotaTouched && !quota)} // Display error state if invalid
              helperText={validateQuota()}
              inputProps={{
                inputMode: 'numeric',
                pattern: '[0-9]*',
                onKeyPress: (event) => {
                  // Allow only numbers
                  const keyCode = event.keyCode || event.which;
                  const keyValue = String.fromCharCode(keyCode);
                  const isValid = /\d/.test(keyValue);
                  if (!isValid) {
                    setIsQoutaTouched(true);
                    setQuotaError(true);
                    event.preventDefault();
                  }
                }
              }}
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoItem>
                <DatePicker
                  views={['year', 'month', 'day']}
                  InputLabelProps={{ shrink: true }}
                  label="Tanggal Mulai Event *"
                  onChange={handleStartDateChange}
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

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoItem>
                <DatePicker
                  views={['year', 'month', 'day']}
                  InputLabelProps={{ shrink: true }}
                  label="Tanggal Berakhir Event *"
                  onChange={handleEndDateChange}
                  format="YYYY-MM-DD"
                  required
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      // onBlur={() => setIsEndDateTouched(true)}
                      error={isEndDateTouched && !enddate}
                      helperText={isEndDateTouched && !enddate ? 'Tanggal Berakhir harus diisi' : ''}
                    />
                  )}
                  // minDate={dayjs(startdate).add(1, 'day')} // Set minimum end date to the day after the start date
                  minDate={dayjs(startdate).isValid() ? dayjs(startdate).add(1, 'day') : dayjs()} // Set minimum end date to the day after the start date or today if start date is invalid
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
              onBlur={() => setIsDeskripsiTouched(true)}
              error={isDeskripsiTouched && !deskripsi} // Set error jika deskripsi kosong
              helperText={isDeskripsiTouched && !deskripsi && 'Deskripsi harus diisi'} // Tampilkan pesan error jika deskripsi kosong
            />
          </div>
        </Box>
      </DialogContent>
      <DialogActions sx={{ padding: '24px', justifyContent: 'space-between' }}>
        <ButtonError Color="#ffffff" icon={CancelOutlined} LabelName={'Batalkan'} onClick={CloseDialog} />
        <ButtonPrimary
          Color="#ffffff"
          icon={AddCircleOutlineIcon}
          LabelName={'Buat Event'}
          disabled={!isFormValid}
          onClick={() => {
            CloseDialog(); // Close the dialog
            postData(); // Execute the postData function
          }}
        />
      </DialogActions>
    </Dialog>
  </>
  );
}

export default AddEventModal;

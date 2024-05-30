import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Typography, MenuItem } from '@mui/material';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CancelOutlined from '@mui/icons-material/CancelOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import dayjs from 'dayjs';

import ButtonPrimary from '../../ui-component/button/ButtonPrimary';
import ButtonError from '../../ui-component/button/ButtonError';
import AlertBerhasil from '../../ui-component/modal/alert-berhasil';
import IlustrasiBerhasil from '../../../public/assets/images/ilustration/berhasil.png';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function EditEvent({ open, handleClose, eventid, nama, koderumpun, jobfam, quotaawal, mulai, selesai, deskripsiawal, setrefresh }) {
  const [originalData, setOriginalData] = useState({}); // State to store original data
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedJobFamily, setSelectedJobFamily] = useState(koderumpun);
  const [jobFamilyOptions, setJobFamilyOptions] = useState([]);
  const [startdate, setstartdate] = useState(dayjs(mulai));
  const [enddate, setenddate] = useState(dayjs(selesai));
  const [eventName, setEventName] = useState(nama);
  const [quota, setquota] = useState(quotaawal);
  const [deskripsi, setdeskripsi] = useState(deskripsiawal);
  const [isDeskripsiTouched, setIsDeskripsiTouched] = useState(false);

  const [isEventNameTouched, setIsEventNameTouched] = useState(false);
  const [isJobFamilyTouched, setIsJobFamilyTouched] = useState(false);
  const [quotaError, setQuotaError] = useState(false); // State to track quota error
  const [isQuotaTouched, setIsQoutaTouched] = useState(false);

  const [formChanged, setFormChanged] = useState(false); // State to track form changes
  const [changesSaved, setChangesSaved] = useState(false); // State to track if changes have been saved

  console.log("CREATE EDIT DIALOG");
  useEffect(() => {
    // Save original data when dialog opens
    setOriginalData({ 
      eventName: nama, 
      selectedJobFamily: koderumpun, 
      quota: quotaawal, 
      deskripsi: deskripsiawal, 
      startdate: dayjs(mulai), 
      enddate: dayjs(selesai) 
    });
  }, [open]);

  const handlequotachange = (event) => {
    console.log('event', event.target.value);
    const value = event.target.value;
    // Check if the value is a valid number
    if (/^\d*$/.test(value)) {
      setQuotaError(false);
      setquota(event.target.value); // Update state with input value
    } else {
      setQuotaError(true);
    }
  };

  useEffect(() => {
    console.log(isQuotaTouched, quotaError);
  }, [isQuotaTouched, quotaError]);

    // Function to check if the form has changed
    const checkFormChanges = () => {
      if (
        eventName !== nama ||
        selectedJobFamily !== koderumpun ||
        quota !== quotaawal ||
        deskripsi !== deskripsiawal ||
        !dayjs(startdate).isSame(mulai) ||
        !dayjs(enddate).isSame(selesai)
      ) {
        setFormChanged(true);
      } else {
        setFormChanged(false);
      }
    };

    useEffect(() => {
      checkFormChanges(); // Check form changes when component mounts
    }, []);
  
    useEffect(() => {
      checkFormChanges(); // Check form changes whenever form data changes
    }, [eventName, selectedJobFamily, quota, deskripsi, startdate, enddate]);

  // Function to reset form to original data
  const resetForm = () => {
    setEventName(originalData.eventName);
    setSelectedJobFamily(originalData.selectedJobFamily);
    setquota(originalData.quota);
    setdeskripsi(originalData.deskripsi);
    setstartdate(originalData.startdate);
    setenddate(originalData.enddate);
    setIsDeskripsiTouched(false);
    setIsEventNameTouched(false);
    setIsJobFamilyTouched(false);
    setIsQoutaTouched(false);
    setQuotaError(false);
    setFormChanged(false);
  };

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

  const handleEventNameChange = (event) => {
    setEventName(event.target.value); // Update state with input value
  };

  // const handlequotachange = (event) => {
  //   setquota(event.target.value); // Update state with input value
  // };

  const handledeskripsichange = (event) => {
    setdeskripsi(event.target.value); // Update state with input value
    setIsDeskripsiTouched(true);
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

  const handleStartDateChange = (date) => {
    setstartdate(date); // Update the state with the selected date
  };

  const handleEndDateChange = (date) => {
    setenddate(date); // Update the state with the selected date
  };

  // Save all the changes of questions using Simpan Button and show Success Modal
  const [openAlertBerhasil, setOpenAlertBerhasil] = useState(false);
  const handleCloseAlertBerhasil = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
      setOpenAlertBerhasil(false);
  };

  const updateData = async () => {
    try {
      // Make the POST request to the API endpoint
      const response = await fetch('http://localhost:4000/updateevent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          // Include any data you want to send in the request body
          eventid: eventid,
          nama_event: eventName,
          kode_rumpun_jabatan: selectedJobFamily,
          kuota: quota,
          deskripsi: deskripsi,
          tanggal_mulai: startdate,
          tanggal_selesai: enddate
        })
      });

      // Check if the request was successful
      if (response.ok) {
        setOpenAlertBerhasil(true);
        console.log("CALLED SETREFRESH FROM EDIT");
        setrefresh(true);
      } else {
        throw new Error('Failed to delete data');
      }
    } catch (error) {
      // Handle any errors that occur during the API call
      console.error('Error posting data:', error.message);
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
    <Dialog 
      open={open}
      onClose={() => {
        resetForm(); // Reset form to original data
        handleClose(); // Close the dialog
      }} 
    >
      <DialogTitle sx={{ borderBottom: 1, borderColor: 'divider', textAlign: 'center' }}>
        <Typography style={{ fontSize: '24px', fontWeight: 'bold' }}>Edit Detail Event</Typography>
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
              defaultValue={nama}
              onBlur={() => setIsEventNameTouched(true)}
              error={isEventNameTouched && !eventName}
              helperText={isEventNameTouched && !eventName ? 'Nama Event harus diisi' : ''}
            />

            <TextField 
              select required id="outlined-required" 
              value={selectedJobFamily} 
              label="Job Family" 
              onChange={handleJobFamilyChange}
              onBlur={() => setIsJobFamilyTouched(true)}
              error={isJobFamilyTouched && !selectedJobFamily}
              helperText={isJobFamilyTouched && !selectedJobFamily ? 'Job Family harus diisi' : ''}
              >
              <MenuItem value="">Select an option</MenuItem> {/* Placeholder */}
              {jobFamilyOptions.map((jobFamily) => (
                <MenuItem key={jobFamily.kode_rumpun_jabatan} value={jobFamily.kode_rumpun_jabatan}>
                  {jobFamily.nama_rumpun_jabatan}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              required
              id="outlined-required"
              label="Talent Pool Quota"
              value={quota} // Set value from state
              onChange={handlequotachange} // Handle input change
              defaultValue={quotaawal}
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
                  value={startdate} // Use existing date data
                  onChange={handleStartDateChange}
                  format="YYYY-MM-DD"
                  required
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
                  value={enddate} // Use existing date data
                  onChange={handleEndDateChange}
                  format="YYYY-MM-DD"
                  required
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
              helperText={isDeskripsiTouched && !deskripsi && 'Deskripsi tidak boleh kosong'} // Tampilkan pesan error jika deskripsi kosong
            />
          </div>
        </Box>
      </DialogContent>
      <DialogActions sx={{ padding: '24px', justifyContent: 'space-between' }}>
        <ButtonError 
            Color="#ffffff" 
            icon={CancelOutlined} 
            LabelName={'Batalkan'} 
            onClick={() => {
              resetForm(); // Reset form to original data
              handleClose(); // Close the dialog
            }}  
        />
        <ButtonPrimary
          Color="#ffffff"
          icon={SaveOutlinedIcon}
          LabelName={'Simpan Perubahan'}
          disabled={!formChanged} // Disable button if no changes in form
          onClick={() => {
            updateData(); // Execute the postData function
            setChangesSaved(true); // Set changes as saved
            handleClose(); // Close the dialog
          }}
        />
      </DialogActions>
    </Dialog>
  </>
  );
}

export default EditEvent;

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

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function EditEvent({ open, handleClose, eventid, nama, koderumpun, jobfam, quotaawal, mulai, selesai, deskripsiawal }) {
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

  const quotas = 'abc';

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

  return (
    <Dialog open={open} onClose={handleClose}>
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
            />

            <TextField select required id="outlined-required" value={selectedJobFamily} label="Job Family" onChange={handleJobFamilyChange}>
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
              inputProps={{
                inputMode: 'numeric',
                pattern: '[0-9]*'
              }}
              defaultValue={quotas}
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
              helperText={isDeskripsiTouched && !deskripsi && 'Deskripsi tidak boleh kosong'} // Tampilkan pesan error jika deskripsi kosong
            />
          </div>
        </Box>
      </DialogContent>
      <DialogActions sx={{ padding: '24px', justifyContent: 'space-between' }}>
        <ButtonError Color="#ffffff" icon={CancelOutlined} LabelName={'Batalkan'} onClick={handleClose} />
        <ButtonPrimary
          Color="#ffffff"
          icon={SaveOutlinedIcon}
          LabelName={'Simpan Perubahan'}
          onClick={() => {
            updateData(); // Execute the postData function
            handleClose(); // Close the dialog
          }}
        />
      </DialogActions>
    </Dialog>
  );
}

export default EditEvent;

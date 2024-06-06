import React, { useEffect, useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Box, Button, MenuItem, TextField, Typography, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { CreateOutlined } from '@mui/icons-material';
import.meta.env.VITE_API_BASE_URL;

function UbahStatusTalent({ open, nippos, eventid, handleClose }) {
  const [selectedStatus, setselectedStatus] = useState('');
  const url = import.meta.env.VITE_API_BASE_URL;

  const handleStatusChange = (event) => {
    setselectedStatus(event.target.value); // Update the selected status state
  };

  const updatestatus = (eventid, nippos, status) => {
    return fetch(url + `updatestatuspool`, {
      method: 'POST', // Specify the HTTP method (POST, GET, etc.)
      headers: {
        'Content-Type': 'application/json' // Specify the content type
      },
      body: JSON.stringify({
        // Include any data you want to send in the request body
        eventtalentid: eventid,
        nippos: nippos,
        status: status
      }) // Convert the bodyData object to a JSON string
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        return data; // Return the parsed JSON data
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        throw error; // Rethrow the error to handle it elsewhere
      });
  };

  const handleUbah = () => {
    updatestatus(eventid, nippos, selectedStatus); // Update the selected status state
    handleClose();
    setselectedStatus('')
  };

  const UbahButtonStyle = {
    backgroundColor: '#1C2D5A',
    color: '#fff',
    borderRadius: '12px',
    padding: '14px 24px',
    transition: 'background-color 0.3s',
    fontSize: '14px'
  };

  const batalkanButtonStyle = {
    backgroundColor: '#D32F2F',
    color: '#fff',
    borderRadius: '12px',
    padding: '14px 24px',
    transition: 'background-color 0.3s',
    fontSize: '14px'
  };

  const hoverUbahStyle = {
    backgroundColor: '#122350' // Darker shade for hover
  };

  const hoverBatalkanStyle = {
    backgroundColor: '#B71C1C' // Darker shade for hover
  };

  const ButtonsContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: '0px 8px',
    gap: '256px',
    justifyContent: 'space-between'
  });

  const [IsHoverUbah, setIsHoverUbah] = useState(false);
  const [isHoveredBatalkan, setIsHoveredBatalkan] = useState(false);

  const UbahButton = (
    <Button
      endIcon={<CreateOutlined />}
      style={IsHoverUbah ? { ...UbahButtonStyle, ...hoverUbahStyle } : UbahButtonStyle}
      onMouseEnter={() => setIsHoverUbah(true)}
      onMouseLeave={() => setIsHoverUbah(false)}
      onClick={handleUbah}
    >
      Ubah
    </Button>
  );

  const batalkanButton = (
    <Button
      endIcon={<CancelOutlinedIcon />}
      style={isHoveredBatalkan ? { ...batalkanButtonStyle, ...hoverBatalkanStyle } : batalkanButtonStyle}
      onMouseEnter={() => setIsHoveredBatalkan(true)}
      onMouseLeave={() => setIsHoveredBatalkan(false)}
      onClick={() => {
        handleClose();
        setselectedStatus('');
      }}
    >
      Batalkan
    </Button>
  );

  const DividerContainer = styled('div')({
    width: '100%',
    textAlign: 'center',
    backgroundColor: '#E0E0E0'
  });

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        <Typography style={{ fontSize: '24px', fontWeight: '700', textAlign: 'center', marginTop: '10px' }}>
          Ubah Status Talent Pool
        </Typography>
      </DialogTitle>
      <DividerContainer>
        <Divider orientation="horizontal" flexItem />
      </DividerContainer>
      <DialogContent>
        <Box>
          <TextField
            select
            required
            id="status-talent"
            label="Status Talent"
            value={selectedStatus} // Bind the selected status state to the TextField value
            onChange={handleStatusChange} // Call the handleStatusChange function on selection change
            sx={{ width: '100%', marginBottom: '16px' }}
          >
            <MenuItem value="1">Talent</MenuItem>
            <MenuItem value="0">Non Talent</MenuItem>
          </TextField>
          <Typography style={{ textAlign: 'center', color: '#828282', fontSize: '14px', marginTop: '16px', marginBottom: '24px' }}>
            Anda dapat kembali mengubah status selama masa Talent Pool aktif.
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ padding: '0 24px 24px 24px ' }}>
        <ButtonsContainer>
          {batalkanButton}
          {UbahButton}
        </ButtonsContainer>
      </DialogActions>
    </Dialog>
  );
}

export default UbahStatusTalent;

import React from 'react';
import { useState, useEffect } from 'react';
import { Box, Button, IconButton, Modal, Typography } from '@mui/material';
import { CloseOutlined } from '@mui/icons-material';
import KomiteUnitListTable from '../tables/komiteunittable.jsx';
import.meta.env.VITE_API_BASE_URL

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'white',
  border: '2px solid #fff',
  boxShadow: 24,
  p: 4,
  maxWidth: "md",
  borderRadius: '12px'

};

export default function KomiteUnitListButton({ eventid }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [komiteunit, setkomiteunit] = useState([''])
  const url = import.meta.env.VITE_API_BASE_URL

  useEffect(() => {
    // Fetch data from API
    fetch(url + `getkomiteunitlist?eventtalentid=${eventid}`)
      .then(response => response.json())
      .then(data => {
        // Update state with API data
        setkomiteunit(data.map((row, index) => ({ ...row, id: index + 1 })));
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array to run effect only once

  let sudahMemilihCount = 0;
  let belumMemilihCount = 0;
  const totalkomite = komiteunit.length

  // Iterate over the array and count the occurrences of each status
  komiteunit.forEach(item => {
    if (item["Status Memilih"] === "Sudah Memilih") {
      sudahMemilihCount++;
    } else if (item["Status Memilih"] === "Belum Memilih") {
      belumMemilihCount++;
    }
  });

  return (
    <>
      <Button
        onClick={handleOpen}
        variant="contained"
        style={{
          color: '#2196F3',
          borderRadius: '15px',
          borderColor: '#EAF8FF',
          backgroundColor: '#EAF8FF',
          boxShadow: 'none',
        }}
      >
        {sudahMemilihCount} /  {totalkomite} Komite Unit
      </Button>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Box sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
            <Typography style={{ fontSize: '24px', fontWeight: '700' }}>
              Daftar Komite Unit
            </Typography>
            <div style={{ flex: '1' }}> </div>
            <IconButton onClick={handleClose} sx={{ color: '#F44336' }}>
              <CloseOutlined />
            </IconButton>
          </Box>
          <Box sx={{ mt: 2, position: 'relative', width: '100%', height: 'calc(100% - 50px)' }}>
            <KomiteUnitListTable rows={komiteunit} />
          </Box>
        </Box>
      </Modal>
    </>
  );
}
import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal';
import { useState,useEffect } from 'react';
// import { height } from '@mui/system';
import KomiteUnitListTable from '../tables/komiteunittable';
import CloseIcon from '@mui/icons-material/Close';
import.meta.env.VITE_API_BASE_URL
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600, // Width of the modal
  height: 500, // Height of the modal
  bgcolor: 'white',
  border: '2px solid #fff',
  boxShadow: 24,
  p: 4,
};

export default function KomiteUnitListButton({eventid}) {
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center'}}>
            <Typography variant="h3" sx={{ fontFamily: 'Roboto', fontWeight: 'bold' }}>
              Daftar Komite Unit 
            </Typography>
            <Button
                onClick={handleClose}
                sx={{ marginLeft: '300px' , color :'red'}}
              >
                <CloseIcon/>
            </Button>
          </Box>
          <Box sx={{ mt: 2, position: 'relative',width: '100%', height: 'calc(100% - 50px)' }}>
            <KomiteUnitListTable width={style.width-80} height={style.height - 50} rows={komiteunit}/>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
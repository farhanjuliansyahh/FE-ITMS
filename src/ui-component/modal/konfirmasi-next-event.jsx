import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, Divider } from '@mui/material';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs'; // Import dayjs for date manipulation
import { toast } from 'react-toastify';

const steps = ['Talent Source', 'Talent Profile', 'Talent Qualification', 'Talent Days', 'Talent Cluster', 'Talent Pool'];

function KonfirmasiNextEvent({ open, handleClose, handleConfirmation, currentstep, eventid, status, refresh, eventStartDate }) {
  const [selectedDate, setSelectedDate] = useState(null);

  const currenteventstatus = status;
  const handleDateChange = (date) => {
    setSelectedDate(date); // Update the state with the selected date
  };

  useEffect(() => {
    if (!open) {
      // Reset selectedDate when the modal is closed
      setSelectedDate(null);
    }
  }, [open]);

  const handleLanjutkan = () => {
    switch (currenteventstatus) {
      case 2:
        posttalentprofile()
          .then(() => updatedeadline(eventactive))
          .then(() => notifikasikaryawan(eventactive))
          .then(() => handleConfirmation(selectedDate))
          .then(() => rolekaryawan(eventactive))
          .then(() => {
            refresh();
            toast.success('Talent Profile telah selesai!');
          })
          .catch(() => {
            toast.error('Gagal menyelesaikan Talent Profile.');
          });
        break;
      case 3:
        posttalentqual()
          .then(() => updatedeadline(eventactive))
          .then(() => handleConfirmation(selectedDate))
          .then(() => {
            refresh();
            toast.success('Talent Qualification telah selesai!');
          })
          .catch(() => {
            toast.error('Gagal menyelesaikan Talent Qualification.');
          });
        break;
      case 4:
        posttalentdays()
          .then(() => updatedeadline(eventactive))
          .then(() => handleConfirmation(selectedDate))
          .then(() => {
            refresh();
            toast.success('Talent Days telah selesai!');
          })
          .catch(() => {
            toast.error('Gagal menyelesaikan Talent Days.');
          });
        break;
      case 5:
        posttalentcluster()
          .then(() => updatedeadline(eventactive))
          .then(() => mapcluster(eventactive))
          .then(() => handleConfirmation(selectedDate))
          .then(() => notifikasiketuakomite(eventactive))
          .then(() => {
            refresh();
            toast.success('Talent Cluster telah selesai!');
          })
          .catch(() => {
            toast.error('Gagal menyelesaikan Talent Cluster.');
          });
        break;
      case 6:
        posttalentpool()
          .then(() => updatedeadline(eventactive))
          .then(() => handleConfirmation(selectedDate))
          .then(() => {
            refresh();
            toast.success('Talent Pool telah selesai!');
          })
          .catch(() => {
            toast.error('Gagal menyelesaikan Talent Pool.');
          });
        break;
      default:
        // Handle default case
        break;
    }
  };

  const eventactive = parseInt(eventid);

  const updatedeadline = (eventid) => {
    console.log('event active', eventactive);
    return fetch('http://localhost:4000/updatedeadline', {
      method: 'POST', // Specify the HTTP method (POST, GET, etc.)
      headers: {
        'Content-Type': 'application/json' // Specify the content type
      },
      body: JSON.stringify({
        // Include any data you want to send in the request body
        eventid: eventid,
        status: currenteventstatus,
        date: selectedDate
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

  const notifikasikaryawan = () => {
    console.log('event active', eventactive);
    return fetch('http://localhost:4000/notifkaryawan', {
      method: 'POST', // Specify the HTTP method (POST, GET, etc.)
      headers: {
        'Content-Type': 'application/json' // Specify the content type
      },
      body: JSON.stringify({
        // Include any data you want to send in the request body
        eventtalentid: eventid
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


  const notifikasiketuakomite = (eventid) => {
    return fetch('http://localhost:4000/notifketuakomite', {
      method: 'POST', // Specify the HTTP method (POST, GET, etc.)
      headers: {
        'Content-Type': 'application/json' // Specify the content type
      },
      body: JSON.stringify({
        // Include any data you want to send in the request body
        eventtalentid: eventid
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

  const posttalentprofile = () => {
    return fetch('http://localhost:4000/createtalentprofile', {
      method: 'POST', // Specify the HTTP method (POST, GET, etc.)
      headers: {
        'Content-Type': 'application/json' // Specify the content type
      },
      body: JSON.stringify({
        // Include any data you want to send in the request body
        eventtalentid: eventid
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

  const posttalentqual = () => {
    return fetch('http://localhost:4000/createqualificationtable', {
      method: 'POST', // Specify the HTTP method (POST, GET, etc.)
      headers: {
        'Content-Type': 'application/json' // Specify the content type
      },
      body: JSON.stringify({
        // Include any data you want to send in the request body
        eventtalentid: eventid
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

  const posttalentdays = () => {
    return fetch('http://localhost:4000/createtdays', {
      method: 'POST', // Specify the HTTP method (POST, GET, etc.)
      headers: {
        'Content-Type': 'application/json' // Specify the content type
      },
      body: JSON.stringify({
        // Include any data you want to send in the request body
        eventtalentid: eventid
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

  const posttalentcluster = () => {
    return fetch('http://localhost:4000/createcluster', {
      method: 'POST', // Specify the HTTP method (POST, GET, etc.)
      headers: {
        'Content-Type': 'application/json' // Specify the content type
      },
      body: JSON.stringify({
        // Include any data you want to send in the request body
        eventtalentid: eventid
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

  const mapcluster = () => {
    return fetch('http://localhost:4000/updateskorcluster', {
      method: 'POST', // Specify the HTTP method (POST, GET, etc.)
      headers: {
        'Content-Type': 'application/json' // Specify the content type
      },
      body: JSON.stringify({
        // Include any data you want to send in the request body
        eventtalentid: eventid
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

  const posttalentpool = () => {
    return fetch(`http://localhost:4000/createpool?eventtalentid=${eventid}`, {
      method: 'POST', // Specify the HTTP method (POST, GET, etc.)
      headers: {
        'Content-Type': 'application/json' // Specify the content type
      },
      body: JSON.stringify({
        // Include any data you want to send in the request body
        eventtalentid: eventid
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

  const rolekaryawan = () => {
    console.log('event active', eventactive);
    return fetch('http://localhost:4000/assignkaryawan', {
      method: 'POST', // Specify the HTTP method (POST, GET, etc.)
      headers: {
        'Content-Type': 'application/json' // Specify the content type
      },
      body: JSON.stringify({
        // Include any data you want to send in the request body
        eventid: eventid
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

  const lanjutkanButtonStyle = {
    backgroundColor: selectedDate ? '#1C2D5A' : '#CCCCCC', // Change color based on selectedDate
    color: '#fff',
    borderRadius: '12px',
    padding: '14px 24px',
    transition: 'background-color 0.3s'
  };

  const batalkanButtonStyle = {
    backgroundColor: '#D32F2F',
    color: '#fff',
    borderRadius: '12px',
    padding: '14px 24px',
    transition: 'background-color 0.3s',
    fontSize: '14px'
  };

  const hoverLanjutkanStyle = {
    backgroundColor: selectedDate ? '#122350' : '#CCCCCC' // Change hover color based on selectedDate
  };

  const hoverBatalkanStyle = {
    backgroundColor: '#B71C1C' // Darker shade for hover
  };

  const ButtonsContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: '0px 8px',
    gap: '16px',
    justifyContent: 'space-between'
  });

  const [isHoveredLanjutkan, setIsHoveredLanjutkan] = useState(false);
  const [isHoveredBatalkan, setIsHoveredBatalkan] = useState(false);

  const lanjutkanButton = (
    <Button
      endIcon={<ArrowForwardRoundedIcon />}
      style={isHoveredLanjutkan ? { ...lanjutkanButtonStyle, ...hoverLanjutkanStyle } : lanjutkanButtonStyle}
      onMouseEnter={() => setIsHoveredLanjutkan(true)}
      onMouseLeave={() => setIsHoveredLanjutkan(false)}
      onClick={handleLanjutkan}
      disabled={!selectedDate} // Disable button when no date is selected
    >
      Lanjutkan
    </Button>
  );

  const batalkanButton = (
    <Button
      endIcon={<CancelOutlinedIcon />}
      style={isHoveredBatalkan ? { ...batalkanButtonStyle, ...hoverBatalkanStyle } : batalkanButtonStyle}
      onMouseEnter={() => setIsHoveredBatalkan(true)}
      onMouseLeave={() => setIsHoveredBatalkan(false)}
      onClick={handleClose}
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
          Konfirmasi {steps[currentstep]}
        </Typography>
      </DialogTitle>
      <DividerContainer>
        <Divider orientation="horizontal" flexItem />
      </DividerContainer>
      <DialogContent>
        <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '500px' } }} noValidate autoComplete="off">
          <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoItem>
                <DatePicker
                  disablePast
                  views={['year', 'month', 'day']}
                  InputLabelProps={{ shrink: true }}
                  label={`Tanggal Berakhir ${steps[currentstep + 1]} *`}
                  required
                  format="YYYY-MM-DD"
                  onChange={handleDateChange}
                />
              </DemoItem>
            </LocalizationProvider>
            <Typography style={{ textAlign: 'center', color: '#828282', fontSize: '14px', marginTop: '16px', marginBottom: '24px' }}>
              Anda tidak dapat kembali ke tahap sebelumnya jika melanjutkan.
            </Typography>
          </div>
        </Box>
      </DialogContent>
      <DialogActions sx={{ padding: '0 24px 24px 24px ' }}>
        <ButtonsContainer>
          {batalkanButton}
          {lanjutkanButton}
        </ButtonsContainer>
      </DialogActions>
    </Dialog>
  );
}

export default KonfirmasiNextEvent;

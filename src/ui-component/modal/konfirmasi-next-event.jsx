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
import.meta.env.VITE_API_BASE_URL

const steps = ['Talent Source', 'Talent Profile', 'Talent Qualification', 'Talent Days', 'Talent Cluster', 'Talent Pool'];

function KonfirmasiNextEvent({ open, handleClose, handleConfirmation, currentstep, eventid, status, refresh, eventStartDate }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  const url = import.meta.env.VITE_API_BASE_URL

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
    setIsFetching(true);
    switch (currenteventstatus) {
      case 2:
        posttalentprofile()
          .then(() => updatedeadline(eventactive))
          .then(() => notifikasikaryawan(eventactive))
          .then(() => handleConfirmation(selectedDate))
          .then(() => rolekaryawan(eventactive))
          .then(() => {
            refresh();
            toast.success('Talent Profile telah dimulai!');
            setIsFetching(false);
          })
          .catch(() => {
            toast.error('Gagal memulai Talent Profile.');
            setIsFetching(false);
          });
        break;
      case 3:
        posttalentqual()
          .then(() => updatedeadline(eventactive))
          .then(() => handleConfirmation(selectedDate))
          .then(() => {
            refresh();
            toast.success('Talent Qualification telah dimulai!');
            setIsFetching(false);
          })
          .catch(() => {
            toast.error('Gagal memulai Talent Qualification.');
            setIsFetching(false);
          });
        break;
      case 4:
        posttalentdays()
          .then(() => updatedeadline(eventactive))
          .then(() => handleConfirmation(selectedDate))
          .then(() => {
            refresh();
            toast.success('Talent Days telah dimulai!');
            setIsFetching(false);
          })
          .catch(() => {
            toast.error('Gagal memulai Talent Days.');
            setIsFetching(false);
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
            toast.success('Talent Cluster telah dimulai!');
            setIsFetching(false);
          })
          .catch(() => {
            toast.error('Gagal memulai Talent Cluster.');
            setIsFetching(false);
          });
        break;
      case 6:
        posttalentpool()
          .then(() => updatedeadline(eventactive))
          .then(() => handleConfirmation(selectedDate))
          .then(() => {
            refresh();
            toast.success('Talent Pool telah dimulai!');
            setIsFetching(false);
          })
          .catch(() => {
            toast.error('Gagal memulai Talent Pool.');
            setIsFetching(false);
          });
        break;
      default:
        // Handle default case
        setIsFetching(false);
        break;
    }
  };

  const eventactive = parseInt(eventid);

  const updatedeadline = (eventid) => {
    return fetch(url + 'updatedeadline', {
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
    return fetch(url + 'notifkaryawan', {
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
    return fetch(url + 'notifketuakomite', {
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
    return fetch(url + 'createtalentprofile', {
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
    return fetch(url + 'createqualificationtable', {
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
    const requestBody = {
      // Your request body data here
      eventtalentid: eventid
    };
    return fetch(url + 'createtdays', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        eventtalentid: eventid
      })
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        data;
        return fetch(url + `createdaysbpj`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestBody)
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
            throw error;
          });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        throw error;
      });
  };

  const posttalentcluster = () => {
    return fetch(url + 'createcluster', {
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
    return fetch(url + 'updateskorcluster', {
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
    return fetch(url + `createpool?eventtalentid=${eventid}`, {
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
    return fetch(url + 'assignkaryawan', {
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
    backgroundColor: selectedDate && !isFetching ? '#1C2D5A' : '#CCCCCC', // Change color based on selectedDate and isFetching
    color: '#fff',
    borderRadius: '12px',
    padding: '14px 24px',
    transition: 'background-color 0.3s',
    cursor: isFetching ? 'not-allowed' : 'pointer' // Change cursor style when fetching
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
    backgroundColor: selectedDate && !isFetching ? '#122350' : '#CCCCCC' // Change hover color based on selectedDate and isFetching
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
    disabled={!selectedDate || isFetching} // Disable button when no date is selected or fetching is in progress
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
                  format="DD-MM-YYYY"
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

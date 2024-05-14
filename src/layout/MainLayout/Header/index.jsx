import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, ButtonBase } from '@mui/material';

// project imports
import LogoSection from '../LogoSection';
import ProfileSection from './ProfileSection';
import NotificationSection from './NotificationSection';

// assets
import { IconMenu2 } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = ({ handleLeftDrawerToggle }) => {
  const theme = useTheme();
  const nippos = sessionStorage.getItem('nippos');
  const [notificationList, setNotificationList] = useState([])
  
  const updatenotifstatus = (nippos, eventid, jenisnotif) => {
    return fetch('http://localhost:4000/updatestatusnotif', {
      method: 'POST', // Specify the HTTP method (POST, GET, etc.)
      headers: {
        'Content-Type': 'application/json', // Specify the content type
      },
      body: JSON.stringify({
          // Include any data you want to send in the request body
          nippos: nippos,
          eventid: eventid,
          jenis_notifikasi: jenisnotif
      }) // Convert the bodyData object to a JSON string
    }) 
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      return data; // Return the parsed JSON data
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      throw error; // Rethrow the error to handle it elsewhere
    });
  }

  const handleToggleReadStatus = (index, notif) => {
    setNotificationList((prevNotificationList) => {
      const updatedNotificationList = [...prevNotificationList];
      const currentStatus = updatedNotificationList[index].read_status;
      // Check if the current status is unread before toggling
      if (!currentStatus) {
        updatedNotificationList[index].read_status = true; // Toggle read_status to true
  
        // Call API to update notification status
        updatenotifstatus(notif.nippos, notif.eventtalentid, notif.id_referensi_notifikasi)
          .then((response) => {
            // Handle success response if needed
            console.log('Notification status updated successfully:', response);
          })
          .catch((error) => {
            // Handle error if needed
            console.error('Error updating notification status:', error);
          });
      }
      return updatedNotificationList;
    });
  };
  


  const fetchnotification = (nippos) => {
    return fetch(`http://localhost:4000/getnotification?nippos=${nippos}`) // endpoint
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        return data; // Return the parsed JSON data
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        throw error; // Rethrow the error to handle it elsewhere
      });
  };

  useEffect(() => {
    fetchnotification(nippos)
      .then(data => {
        setNotificationList(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  console.log("lets see", notificationList);

  return (
    <>
      {/* logo & toggler button */}
      <Box
        sx={{
          width: 228,
          display: 'flex',
          [theme.breakpoints.down('md')]: {
            width: 'auto'
          }
        }}
      >
        <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}>
          <LogoSection />
        </Box>
        <ButtonBase sx={{ borderRadius: '12px', overflow: 'hidden', height: '36px', margin: 'auto' }}>
          <Avatar
            variant="rounded"
            sx={{
              ...theme.typography.commonAvatar,
              ...theme.typography.mediumAvatar,
              transition: 'all .2s ease-in-out',
              background: theme.palette.primary.light,
              color: theme.palette.primary.dark,
              '&:hover': {
                background: theme.palette.primary.dark,
                color: theme.palette.primary.light
              }
            }}
            onClick={handleLeftDrawerToggle}
            color="inherit"
          >
            <IconMenu2 stroke={1.5} size="1.3rem" />
          </Avatar>
        </ButtonBase>
      </Box>

      {/* header search */}
 
      <Box sx={{ flexGrow: 1 }} />

      {/* notification & profile */}
      <NotificationSection notiflist={notificationList} onToggleReadStatus={handleToggleReadStatus} />
      <ProfileSection />
    </>
  );
};

Header.propTypes = {
  handleLeftDrawerToggle: PropTypes.func
};

export default Header;

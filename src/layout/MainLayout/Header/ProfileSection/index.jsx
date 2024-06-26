import { useState, useRef, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Avatar,
  Box,
  Chip,
  ClickAwayListener,
  Divider,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  Stack,
  Typography
} from '@mui/material';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import MainCard from '../../../../ui-component/cards/MainCard.jsx';
import Transitions from '../../../../ui-component/extended/Transitions.jsx';
import User1 from '../../../../../public/assets/images/users/Profile-Default.svg';

// assets
import { IconLogout, IconSettings, IconUser } from '@tabler/icons-react';

import.meta.env.VITE_API_BASE_URL

// ==============================|| PROFILE MENU ||============================== //


const ProfileSection = () => {

  const theme = useTheme();
  const customization = useSelector((state) => state.customization);
  const navigate = useNavigate();
  const token = sessionStorage.getItem('token');
  // const nippos = sessionStorage.getItem('nippos');
  const [resultProfile, setResultProfile] = useState(null);

  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [open, setOpen] = useState(false);
  const url = import.meta.env.VITE_API_BASE_URL
  /**
   * anchorRef is used on different componets and specifying one type leads to other components throwing an error
   * */
  const anchorRef = useRef(null);
  const handleLogout = async () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('nippos');
    sessionStorage.removeItem('role');
    navigate('/');
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleListItemClick = (event, index, route = '') => {
    setSelectedIndex(index);
    handleClose(event);

    if (route && route !== '') {
      navigate(route);
    }
  };
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const responseProfile = await fetch(url + 'getkaryawan', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const resultProfile = await responseProfile.json();

        // Extract the user data
        const user = resultProfile.decoded.user;

        // Set the user profile in state
        setResultProfile(user);

        // Store the nippos in session storage
        // sessionStorage.setItem('nippos', user.nippos);

        // Extract nama_role values
        // const namaRoles = user.nipposrole.map((role) => role.roleid.nama_role);

        // Store the nama_roles in session storage
        // sessionStorage.setItem('role', JSON.stringify(namaRoles));
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    if (token) {
      fetchProfile();
    } else {
      navigate('/');
    }
  }, [token, navigate]);

  const handleAccessProfile = () => {
    navigate('/profile'); // Navigate to the '/profile' route when clicked
  };

  return (
    <>
      <Chip
        sx={{
          height: '48px',
          alignItems: 'center',
          borderRadius: '27px',
          transition: 'all .2s ease-in-out',
          borderColor: theme.palette.primary.light,
          backgroundColor: theme.palette.primary.light,
          '&[aria-controls="menu-list-grow"], &:hover': {
            borderColor: theme.palette.primary.main,
            background: `${theme.palette.primary.main}!important`,
            color: theme.palette.primary.light,
            '& svg': {
              stroke: theme.palette.primary.light
            }
          },
          '& .MuiChip-label': {
            lineHeight: 0
          }
        }}
        icon={
          <Avatar
            src={User1}
            sx={{
              ...theme.typography.mediumAvatar,
              margin: '8px 0 8px 8px !important',
              cursor: 'pointer'
            }}
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            color="inherit"
          />
        }
        label={<IconSettings stroke={1.5} size="1.5rem" color={theme.palette.primary.main} />}
        variant="outlined"
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        color="primary"
      />
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 14]
              }
            }
          ]
        }}
      >
        {({ TransitionProps }) => (
          <Transitions in={open} {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                  <Box sx={{ paddingTop: '24px', paddingLeft: '24px', paddingRight: '24px' }}>
                    <Stack>
                      <Stack direction="row" spacing={0.5} alignItems="center" marginBottom={'4px'}>
                        <Typography variant="h4">{resultProfile.nama}</Typography>
                      </Stack>
                      {/* Check if nipposrole exists and has at least one element */}
                      {resultProfile.nipposrole && resultProfile.nipposrole.length > 0 && (
                        <Stack marginBottom={'12px'}>
                          {resultProfile.nipposrole.map((role, index) => (
                            <Typography key={index} variant="title1">
                              {role.roleid.nama_role}
                            </Typography>
                          ))}
                        </Stack>
                      )}
                    </Stack>
                    <Divider />
                  </Box>
                  <PerfectScrollbar style={{ height: '100%', maxHeight: 'calc(100vh - 250px)', overflowX: 'hidden' }}>
                    <Box sx={{ paddingTop: '12px', paddingLeft: '24px', paddingRight: '24px', paddingBottom: '24px' }}>
                      <List
                        component="nav"
                        sx={{
                          width: '100%',
                          maxWidth: 450,
                          minWidth: 300,
                          backgroundColor: theme.palette.background.paper,
                          borderRadius: '12px',
                          [theme.breakpoints.down('md')]: {
                            minWidth: '100%'
                          },
                          // '& .MuiListItemButton-root': {
                          //   mt: 0.5
                          // }
                        }}
                      >
                        {/* <ListItemButton
                          sx={{ borderRadius: `${customization.borderRadius}px` }}
                          selected={selectedIndex === 0}
                          onClick={(event) => handleListItemClick(event, 0, '#')}
                        >
                          <ListItemIcon>
                            <IconSettings stroke={1.5} size="1.3rem" />
                          </ListItemIcon>
                          <ListItemText primary={<Typography variant="body2">Account Settings</Typography>} />
                        </ListItemButton> */}

                        {/* <ListItemButton
                          sx={{ borderRadius: `${customization.borderRadius}px` }}
                          selected={selectedIndex === 1}
                          onClick={(event) => handleListItemClick(event, 1, '#')}
                        >
                          <ListItemIcon>
                            <IconUser stroke={1.5} size="1.3rem" />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Grid container spacing={1} justifyContent="space-between">
                                <Grid item>
                                  <Typography variant="body2">Social Profile</Typography>
                                </Grid>
                                <Grid item>
                                  <Chip
                                    label="02"
                                    size="small"
                                    sx={{
                                      bgcolor: theme.palette.warning.dark,
                                      color: theme.palette.background.default
                                    }}
                                  />
                                </Grid>
                              </Grid>
                            }
                          />
                        </ListItemButton> */}

                        <ListItemButton
                          sx={{ borderRadius: `${customization.borderRadius}px` }}
                          selected={selectedIndex === 3}
                          onClick={handleAccessProfile}
                        >
                          <ListItemIcon>
                            <IconUser stroke={1.5} size="1.3rem" />
                          </ListItemIcon>
                          <ListItemText primary={<Typography variant="body2">Profile</Typography>} />
                        </ListItemButton>

                        <ListItemButton
                          sx={{ borderRadius: `${customization.borderRadius}px` }}
                          selected={selectedIndex === 4}
                          onClick={handleLogout}
                        >
                          <ListItemIcon>
                            <IconLogout stroke={1.5} size="1.3rem" />
                          </ListItemIcon>
                          <ListItemText primary={<Typography variant="body2">Logout</Typography>} />
                        </ListItemButton>
                      </List>
                    </Box>
                  </PerfectScrollbar>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </>
  );
};

export default ProfileSection;

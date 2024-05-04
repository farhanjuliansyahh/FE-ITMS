import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box, Button, Grid, Menu, MenuItem, Typography, Stack } from '@mui/material';

// project imports
import MainCard from '../../ui-component/cards/MainCard';
import SkeletonEarningCard from './Skeleton/EarningCard';

// assets
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: '#fff',
  color: '#fff',
  overflow: 'hidden',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 180,
    height: 180,
    background: `rgba(28, 45, 90, 0.5)`,
    borderRadius: '50%',
    bottom: -135,
    right: -50,
    [theme.breakpoints.down('sm')]: {
      bottom: -105,
      right: -140
    }
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    width: 150,
    height: 150,
    background: theme.palette.primary[800],
    borderRadius: '50%',
    bottom: -120,
    right: 30,
    opacity: 0.5,
    [theme.breakpoints.down('sm')]: {
      bottom: -155,
      right: -70
    }
  }
}));

// ===========================|| DASHBOARD DEFAULT - EARNING CARD ||=========================== //

const DashboardCard = ({ isLoading, icon, title, content }) => {
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {isLoading ? (
        <SkeletonEarningCard />
      ) : (
        <CardWrapper border={false} content={false}>
          <Box sx={{ p: 2.25 }}>


            <Grid container spacing={2} justifyContent={"space-between"}>
              <Grid container spacing={2} item xs={4}>
                <Grid item>
                  <Stack direction="row" spacing={2}>
                    <Avatar
                      variant="rounded"
                      sx={{
                        ...theme.typography.commonAvatar,
                        ...theme.typography.largeAvatar,
                        backgroundColor: '#F5F8FF',
                        color: '#1C2D5A',
                        width: 72,
                        height: 72,
                        '& svg': { 
                          fontSize: '3rem',
                        },
                      }}
                    >
                      {icon} {/* <GroupsIcon fontSize='large'/> */}
                    </Avatar>
                    <Grid item>
                      <Typography
                        sx={{
                          fontSize: '1rem',
                          fontWeight: 500,
                          color: '#1C2D5A',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {title}
                      </Typography>
                      <Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mt: 1, color:'#EF4123' }}>
                        {content}
                      </Typography>
                </Grid>
                  </Stack>
                  
                </Grid>
                
              </Grid>
              <Grid item justifyContent={"center"} alignItems={"center"}>
                <Button variant="contained" sx={{borderRadius:"12px", backgroundColor:'#1C2D5A', boxShadow:"none"}} endIcon={<InfoOutlinedIcon />}>
                  Detail
                </Button>
              </Grid>

            </Grid>

          </Box>
        </CardWrapper>
      )}
    </>
  );
};

DashboardCard.propTypes = {
  isLoading: PropTypes.bool
};

export default DashboardCard;

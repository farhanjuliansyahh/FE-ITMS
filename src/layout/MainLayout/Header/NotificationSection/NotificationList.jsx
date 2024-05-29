import { useTheme, styled } from '@mui/material/styles';
import { Link } from 'react-router-dom'
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Stack,
  Typography
} from '@mui/material';
import { IconBrandTelegram, IconBuildingStore, IconMailbox, IconPhoto } from '@tabler/icons-react';
import User1 from '../../../../assets/images/users/user-round.svg';

// styles
const ListItemWrapper = styled('div')(({ theme }) => ({
  cursor: 'pointer',
  padding: 16,
  '&:hover': {
    background: theme.palette.primary.light
  },
  '& .MuiListItem-root': {
    padding: 0
  }
}));

const NotificationList = ({ notiflist, onToggleReadStatus }) => {
  const getLinkPath = (id) => {
    switch (id) {
      case 2:
        return "event-komiteunit";
      case 4:
        return "event-karyawan";
      case 5:
        return "event-ketua-komite-talent";
      default:
        return "/";
    }
  };
  const theme = useTheme();


  const chipSX = {
    height: 24,
    padding: '0 6px'
  };
  const chipErrorSX = {
    ...chipSX,
    color: theme.palette.orange.dark,
    backgroundColor: theme.palette.orange.light,
    marginRight: '5px'
  };

  const chipWarningSX = {
    ...chipSX,
    color: theme.palette.warning.dark,
    backgroundColor: theme.palette.warning.light
  };

  const chipSuccessSX = {
    ...chipSX,
    color: theme.palette.success.dark,
    backgroundColor: theme.palette.success.light,
    height: 28
  };

  const replacePlaceholders = (message, notif) => {
    const TipeBPJ = {
      1: "Wawancara",
      2: "Sidang Jabatan"
    };
  
    const formattedDate = notif.tanggal_bpj
      ? new Date(notif.tanggal_bpj).toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        })
      : '';
  
    const BPJtipe = TipeBPJ[parseInt(notif.jenis_bpj)]
    return message
      .replace('{nama_event}', notif.nama_event)
      .replace('{jenisbpj}', BPJtipe)
      .replace('{tanggalbpj}', formattedDate)
      .replace('{lokasibpj}', notif.lokasi_bpj);
  };
  
  

  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 330,
        py: 0,
        borderRadius: '10px',
        [theme.breakpoints.down('md')]: {
          maxWidth: 300
        },
        '& .MuiListItemSecondaryAction-root': {
          top: 8,
        },
        '& .MuiDivider-root': {
          my: 0
        },
        '& .list-container': {
          pl: 7
        }
      }}
    >
      {notiflist.map((notif, index) => (
        <div key={index}>
          <ListItemWrapper>
            <ListItem alignItems="center">
              <ListItemAvatar>
                <Avatar alt="Notification" src={User1} />
              </ListItemAvatar>
              <Grid container >
                <Grid item>
                  <Typography variant="caption" display="block" gutterBottom style={{ marginTop: '4px' }}> 
                    {/* {new Date(notif.dibuat_pada).toLocaleTimeString()} */}
                    {new Date(notif.dibuat_pada).toLocaleString('id-ID', {
                      year: 'numeric',
                      month: 'long',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true,
                      timeZone: 'Asia/Jakarta'
                    }).replace('pukul', ',')}
                  </Typography>
                </Grid>
                <Grid item>
                  <ListItemText primary={notif.keterangan} style={{ marginBottom: '8px',textAlign: 'justify' }}/>
                </Grid>
              </Grid>
              {/* <ListItemText primary={notif.keterangan} /> */}
              {/* <ListItemSecondaryAction>
                <Grid container justifyContent="flex-end">
                  <Grid item xs={15}>
                    <Typography variant="caption" display="block" gutterBottom>
                      {new Date(notif.dibuat_pada).toLocaleTimeString()}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItemSecondaryAction> */}
            </ListItem>
            <Grid container direction="column" className="list-container">
              <Grid item xs={12} sx={{ pb: 2 }}>
                <Typography variant="subtitle2">
                <Link
                to={{
                  pathname: getLinkPath(notif.id_referensi_notifikasi),
                }}
                style={{ color: 'inherit' }}
                onClick={() => onToggleReadStatus(index, notif)}
              >
                    {replacePlaceholders(notif.pesan, notif)}
              </Link>
              </Typography>
              </Grid>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item>
                  <Chip
  label={notif.read_status ? 'Read' : 'Unread'}
  sx={notif.read_status ? chipSuccessSX : chipErrorSX}
  onClick={() => onToggleReadStatus(index, notif)}
/>                  
</Grid>
                </Grid>
              </Grid>
            </Grid>
          </ListItemWrapper>
          {index < notiflist.length - 1 && <Divider />}
        </div>
      ))}
    </List>
  );
};

export default NotificationList;

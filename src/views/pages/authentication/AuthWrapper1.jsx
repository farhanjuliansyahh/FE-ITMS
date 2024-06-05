// material-ui
import { styled } from '@mui/material/styles';
import BackgroundLogin from '../../../../public/assets/images/background/Background Login 2.png';

// ==============================|| AUTHENTICATION 1 WRAPPER ||============================== //

const AuthWrapper1 = styled('div')(({ theme }) => ({
  // backgroundColor: theme.palette.primary.light,
  // minHeight: '100vh',
  backgroundImage: `url(${BackgroundLogin})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center'
}));

export default AuthWrapper1;

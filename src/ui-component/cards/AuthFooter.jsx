// material-ui
import { Link, Typography, Stack } from '@mui/material';
// import logobumn from '../../../public/assets/images/logo/Logobumn.png';
// import logopos from '../../../public/assets/images/logo/logoposind-putih.png';

// ==============================|| FOOTER - AUTHENTICATION 2 & 3 ||============================== //

const AuthFooter = () => (
  <Stack direction="row" justifyContent="space-between">
    <Typography variant="subtitle2" component={Link} href="https://www.posindonesia.co.id/id" target="_blank" underline="hover">
      ITMS Nova
      {/* <img src={logobumn} alt="Logo BUMN" style={{ width: '100px', height: 'auto' }} /> */}
    </Typography>
    <Typography variant="subtitle2" component={Link} href="https://www.posindonesia.co.id/id" target="_blank" underline="hover">
      &copy; Pos Indonesia
      {/* <img src={logopos} alt="Logo Pos Indonesia" style={{ width: '120px', height: 'auto' }} /> */}
    </Typography>
  </Stack>
);

export default AuthFooter;

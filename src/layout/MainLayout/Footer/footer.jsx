// material-ui
import { Link, Typography, Stack, Box } from '@mui/material';
import logopos from './../../../../public/assets/images/logo/logoposind-maincolor.png';

// ==============================|| FOOTER - AUTHENTICATION 2 & 3 ||============================== //

const AuthFooter = () => (
  <Box sx={{ backgroundColor: 'white', py: '24px', px: '24px', borderRadius: '12px' }}>
    <Stack direction="row" justifyContent="space-between" alignItems='center' >
        <img src={logopos} alt="Logo Pos Indonesia" style={{ width: 'auto', height: '48px' }} />
        <Typography variant="subtitle1" component={Link} href="https://www.posindonesia.co.id/id" target="_blank" underline="hover">
            &copy; Pos Indonesia | ITMS Nova 2024
        </Typography>
    </Stack>
  </Box>
);

export default AuthFooter;

// material-ui
import { useTheme } from '@mui/material/styles';


  // if you want to use image instead of <svg> uncomment following.
 
  // import logoDark from 'assets/images/logo-dark.svg';
  import logo from '../../public/assets/images/logo/logo.svg';
 
 

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
  const theme = useTheme();

  return (

    //if you want to use image instead of svg uncomment following, and comment out <svg> element.
  
    <img src={logo} alt="ITMS" width="228" height="96" />
    
     
  
  );
};

export default Logo;

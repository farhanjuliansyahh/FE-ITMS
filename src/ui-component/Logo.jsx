// material-ui
import { useTheme } from '@mui/material/styles';


  // if you want to use image instead of <svg> uncomment following.
 
  // import logoDark from 'assets/images/logo-dark.svg';
  import logo from '../assets/images/logo.svg';
 
 

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
  const theme = useTheme();

  return (

    //if you want to use image instead of svg uncomment following, and comment out <svg> element.
  
    <img src={logo} alt="ITMS" width="92" height="32" />
    
     
  
  );
};

export default Logo;

// material-ui
import { Typography } from '@mui/material';

// project imports
import NavGroup from './NavGroup';
import getMenuItems from '../../../../menu-items';
import { useEffect, useState } from 'react';
// import menuItems from '../../../../menu-items';

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
  const [menuItems, setMenuItems] = useState([]);
  useEffect(() => {
    setMenuItems(getMenuItems(sessionStorage.getItem('role')));
  }, []);
  console.log(menuItems);
  const navItems = menuItems.map((item) => {
    switch (item.type) {
      case 'group':
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return <>{navItems}</>;
};

export default MenuList;

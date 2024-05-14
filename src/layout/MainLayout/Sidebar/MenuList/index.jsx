// material-ui
import { Typography } from '@mui/material';

// project imports
import NavGroup from './NavGroup';
import menuItems from '../../../../menu-items';

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
  // Ensure menuItems is used as an array
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
  console.log('ini menu item', menuItems);

  return <>{navItems}</>;
};

export default MenuList;

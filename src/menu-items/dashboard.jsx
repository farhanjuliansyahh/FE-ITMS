// assets
import Dashboard from '@mui/icons-material/DashboardRounded';

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: 'dashboard',
  // title: 'Dashboard',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard',
      icon: Dashboard,
      breadcrumbs: false
    }
  ]
};

export default dashboard;

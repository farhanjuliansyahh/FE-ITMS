import { lazy } from 'react';

// project imports
import MainLayout from '../layout/MainLayout';
import Loadable from '../ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('../views/pages/dashboard/dashboard')));

// talent identification routing
const DaftarEvent = Loadable(lazy(() => import('../views/pages/talent-identification/daftar-event')));
const ParamenterEvent = Loadable(lazy(() => import('../views/pages/talent-identification/parameter')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      element: <DashboardDefault />

    },
    {
      path: 'talent',
      children: [
        {
          path: 'event',
          element: <DaftarEvent />
        },
        {
          path: 'parameter',
          element: <ParamenterEvent />
        }
      ]
    }
  ]
};

export default MainRoutes;

import { lazy } from 'react';

// project imports
import MainLayout from '../layout/MainLayout';
import Loadable from '../ui-component/Loadable';
// import DaftarPengguna from 'views/pages/manajemen-pengguna/daftar-pengguna';
// import SecondLayout from '../layout/SecondLayout';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('../views/pages/dashboard/dashboard')));

// talent identification routing
const DaftarEvent = Loadable(lazy(() => import('../views/pages/talent-identification/daftar-event')));
const ParamenterEvent = Loadable(lazy(() => import('../views/pages/talent-identification/parameter')));
const DetailEvent = Loadable(lazy(() => import('../views/pages/talent-identification/detail-event')));
const EventKomiteUnit = Loadable(lazy(() => import('../views/pages/komite-unit/event-komiteunit')));
const DaftarEventKomiteUnit = Loadable(lazy(() => import('../views/pages/komite-unit/daftar-eventkomiteunit')));
const DaftarPengguna = Loadable(lazy(() => import('../views/pages/manajemen-pengguna/daftar-pengguna')));

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
        },
        {
          path: 'detail-event',
          element: <DetailEvent/>
        },
      ]
    },
    // {
    //   path: '/',
    //   element: <EventKomiteTalent />
    // },
    {
      path: 'event-komiteunit',
      element: <EventKomiteUnit />,
      children: [
        {
          path: 'daftar-eventkomiteunit',
          element: <DaftarEventKomiteUnit />
        },
      ]
    },
    {
      path: 'manajemen-pengguna',
      children: [
        {
          path: 'daftar-pengguna',
          element: <DaftarPengguna />
        },
      ]
    },
  ]
};

export default MainRoutes;

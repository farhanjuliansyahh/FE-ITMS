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
const EventKomiteTalent = Loadable(lazy(() => import('../views/pages/komite-talent/event-komitetalent')));

const DaftarPengguna = Loadable(lazy(() => import('../views/pages/manajemen-pengguna/daftar-pengguna')));
const EventKaryawan = Loadable(lazy(() => import('../views/pages/karyawan/event-karyawan')));

const ProfileKaryawan = Loadable(lazy(() => import('../views/pages/karyawan/profile-karyawan')));

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
          element: <DaftarEvent />,
        },
        {
          path: 'parameter',
          element: <ParamenterEvent />
        },
        {
          path: 'detail-event/:id',
          element: <DetailEvent/>
        },
      ]
    },
    // {
    //   path: '/',
    //   element: <EventKomiteTalent />
    // },
    {
      path: 'event-komitetalent',
      element: <EventKomiteTalent />
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
    {
      path: 'event-karyawan',
      element: <EventKaryawan />
    },
    {
      path: 'event-karyawan/talent-profile',
      element: <ProfileKaryawan/>
    },
  ]
};

export default MainRoutes;

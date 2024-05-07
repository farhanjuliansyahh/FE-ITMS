import { lazy } from 'react';

// project imports
import MainLayout from '../layout/MainLayout';
import Loadable from '../ui-component/Loadable';
import AuthGuard from './AuthGuard';

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
const EventKaryawan = Loadable(lazy(() => import('../views/pages/karyawan/event-karyawan')));

const ProfileKaryawan = Loadable(lazy(() => import('../views/pages/karyawan/profile-karyawan')));
const EventKetuaKomiteTalent = Loadable(lazy(() => import('../views/pages/ketua-komite-talent/event-ketuakomitetalent')));
const ClusterKetuaKomiteTalent = Loadable(lazy(() => import('../views/pages/ketua-komite-talent/cluster-ketuakomitetalent')));
const AuthLogin3 = Loadable(lazy(() => import('../views/pages/authentication/authentication3/Login3')));
const AuthRegister3 = Loadable(lazy(() => import('../views/pages/authentication/authentication3/Register3')));
const TalentDetail = Loadable(lazy(() => import('../views/pages/dashboard/talent-detail')));
// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <AuthGuard element={<DashboardDefault />} />
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
    {
      path: 'event-komiteunit',
      element: <EventKomiteUnit />
    },
    {
      path: 'event-komiteunit/daftar-eventkomiteunit/:id',
      element: <DaftarEventKomiteUnit />
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
      path: 'event-karyawan/talent-profile/:id',
      element: <ProfileKaryawan/>
    },
    {
      path: 'event-ketua-komite-talent',
      element: <EventKetuaKomiteTalent />
    },
    {
      path: 'event-ketua-komite-talent/talent-cluster',
      element: <ClusterKetuaKomiteTalent />
    },
    {
      path: 'dashboard/detail-talent',
      element: <TalentDetail/>
    },
  ]
};

export default MainRoutes;

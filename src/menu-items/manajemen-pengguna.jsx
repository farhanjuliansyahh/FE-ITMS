// assets
// import PersonSearchRoundedIcon from '@mui/icons-material/PersonSearchRounded';
// import EventNoteRounded from '@mui/icons-material/EventNoteRounded';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import GroupsIcon from '@mui/icons-material/Groups';

// ==============================|| DASHBOARD MENU TATENT IDENTIFICATION ||============================== //

const ManajemenPengguna = {

  id: 'manajemen-pengguna',
  // title: 'Manajemen Pengguna',
  // caption: 'Pages Caption',
  type: 'group',
  children: [
    {
      id: 'manajemen-pengguna',
      title: 'Manajemen Pengguna',
      type: 'collapse',
      icon: ManageAccountsIcon,

      children: [
        {
          id: 'daftar-pengguna',
          title: 'Daftar Pengguna',
          type: 'item',
          icon: GroupsIcon,
          url: '/manajemen-pengguna/daftar-pengguna',
          target: false
        },
      ]
    }
  ]
};

export default ManajemenPengguna;
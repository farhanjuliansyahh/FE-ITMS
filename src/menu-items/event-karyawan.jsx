// assets
import EventSeatRoundedIcon from '@mui/icons-material/EventSeatRounded';

// ==============================|| EVENT KARYAWAN MENU ITEMS ||============================== //

const eventkomitetalent = {
  id: 'event-karyawan',
  // title: 'Karyawan',
  type: 'group',
  children: [
    {
      id: 'karyawan',
      title: 'Karyawan',
      type: 'item',
      url: '/event-karyawan',
      icon: EventSeatRoundedIcon,
      breadcrumbs: true
    }
  ]
};

export default eventkomitetalent;

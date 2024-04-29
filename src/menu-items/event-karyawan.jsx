// assets
import EventNoteIcon from '@mui/icons-material/EventNote';

// ==============================|| EVENT KARYAWAN MENU ITEMS ||============================== //

const eventkomitetalent = {
  id: 'event-karyawan',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Karyawan',
      type: 'item',
      url: '/event-karyawan',
      icon: EventNoteIcon,
      breadcrumbs: false
    }
  ]
};

export default eventkomitetalent;

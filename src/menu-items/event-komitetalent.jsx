// assets
import EventNoteIcon from '@mui/icons-material/EventNote';

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const eventkomitetalent = {
  id: 'event-komitetalent',
  // title: 'Dashboard',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Event',
      type: 'item',
      url: '/event-komitetalent',
      icon: EventNoteIcon,
      breadcrumbs: false
    }
  ]
};

export default eventkomitetalent;

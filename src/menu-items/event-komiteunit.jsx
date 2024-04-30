// assets
import EventNoteIcon from '@mui/icons-material/EventNote';

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const eventkomiteunit = {
  id: 'event-komiteunit',
  // title: 'Dashboard',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Event',
      type: 'item',
      url: '/event-komiteunit',
      icon: EventNoteIcon,
      breadcrumbs: false
    }
  ]
};

export default eventkomiteunit;

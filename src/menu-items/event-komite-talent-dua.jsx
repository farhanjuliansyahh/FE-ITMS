// assets
import EventNoteIcon from '@mui/icons-material/EventNote';

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const EventKomiteTalentDua = {
  id: 'event-komite-talent-dua',
  // title: 'Dashboard',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Event - Komite Talent',
      type: 'item',
      url: '/event-komite-talent-dua',
      icon: EventNoteIcon,
      breadcrumbs: false
    }
  ]
};

export default EventKomiteTalentDua;

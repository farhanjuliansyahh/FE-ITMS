// assets
import EventNoteIcon from '@mui/icons-material/EventNote';

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const EventKomiteTalentDua = {
  id: 'event-ketua-komite-talent',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Ketua Komite Talent',
      type: 'item',
      url: '/event-ketua-komite-talent',
      icon: EventNoteIcon,
      breadcrumbs: false
    }
  ]
};

export default EventKomiteTalentDua;

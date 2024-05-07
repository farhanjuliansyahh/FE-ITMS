// assets
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const EventKomiteTalentDua = {
  id: 'event-ketua-komite-talent',
  // title: 'Ketua Komite Talent',
  type: 'group',
  children: [
    {
      id: 'ketuakomitalent',
      title: 'Ketua Komite Talent',
      type: 'item',
      url: '/event-ketua-komite-talent',
      icon: GroupsRoundedIcon,
      breadcrumbs: true
    }
  ]
};

export default EventKomiteTalentDua;

// assets
import AccountTreeRoundedIcon from '@mui/icons-material/AccountTreeRounded';

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const eventkomiteunit = {
  id: 'event-komiteunit',
  // title: 'Komite Unit',
  type: 'group',
  children: [
    {
      id: 'komiteunit',
      title: 'Komite Unit',
      type: 'item',
      url: '/event-komiteunit',
      icon: AccountTreeRoundedIcon,
      breadcrumbs: true
    }
  ]
};

export default eventkomiteunit;

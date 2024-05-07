// assets
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const DashboardDetailTalent = {
  id: 'dashboard-detail-talent',
  // title: 'Ketua Komite Talent',
  type: 'group',
  children: [
    {
      id: 'detail-talent',
      title: 'Detail Talent',
      type: 'item',
      url: '/dashboard/detail-talent',
      icon: GroupsRoundedIcon,
      breadcrumbs: false
    }
  ]
};

export default DashboardDetailTalent;
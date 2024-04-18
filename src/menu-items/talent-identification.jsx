// assets
import PersonSearchRoundedIcon from '@mui/icons-material/PersonSearchRounded';
import EventNoteRounded from '@mui/icons-material/EventNoteRounded';
import TuneRounded from '@mui/icons-material/TuneRounded';


// ==============================|| DASHBOARD MENU TATENT IDENTIFICATION ||============================== //

const TalentIdentification = {

  id: 'talent',
  // title: 'Talent Management',
  // caption: 'Pages Caption',
  type: 'group',
  children: [
    {
      id: 'talent',
      title: 'Talent Identification',
      type: 'collapse',
      icon: PersonSearchRoundedIcon,

      children: [
        {
          id: 'event',
          title: 'Event',
          type: 'item',
          icon: EventNoteRounded,
          url: '/talent/event',
          target: false
        },
        {
          id: 'parameter',
          title: 'Parameter Event',
          type: 'item',
          icon: TuneRounded,
          url: '/talent/parameter',
          target: false
        },
      ]
    }
  ]
};

export default TalentIdentification;

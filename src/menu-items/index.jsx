import dashboard from './dashboard';
import TalentIdentification from './talent-identification';
import EventKomiteTalent from './event-komitetalent';
import ManajemenPengguna from './manajemen-pengguna';
import EventKaryawan from './event-karyawan';
import EventKetuaKomiteTalent from './event-ketuakomitetalent';

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  items: [
    dashboard, 
    TalentIdentification, 
    EventKomiteTalent, 
    ManajemenPengguna, 
    EventKaryawan, 
    EventKetuaKomiteTalent]
};

export default menuItems;

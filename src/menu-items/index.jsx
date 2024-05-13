import dashboard from './dashboard';
import TalentIdentification from './talent-identification';
import EventKomiteUnit from './event-komiteunit';
import ManajemenPengguna from './manajemen-pengguna';
import EventKaryawan from './event-karyawan';
import EventKetuaKomiteTalent from './event-ketuakomitetalent';

const filterMenuItems = (role) => {
  switch (role) {
    case 'Admin':
      return [dashboard, TalentIdentification, ManajemenPengguna];
    case 'Karyawan':
      return [EventKaryawan];
    case 'Komite Unit':
      return [EventKomiteUnit];
    case 'Ketua Komite Talent':
      return [EventKetuaKomiteTalent];
    default:
      return [];
  }
};

const roleString = sessionStorage.getItem('role');
const role = roleString ? JSON.parse(roleString) : null;
let menuItems = [];
if (role) {
  const menuByRole = role.map((i) => {
    return filterMenuItems(i);
  });
  const lat = menuByRole.flat();
  const sets = [...new Set(lat)];

  menuItems = { items: sets };
}

export default menuItems;

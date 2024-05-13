import dashboard from './dashboard';
import TalentIdentification from './talent-identification';
import EventKomiteUnit from './event-komiteunit';
import ManajemenPengguna from './manajemen-pengguna';
import EventKaryawan from './event-karyawan';
import EventKetuaKomiteTalent from './event-ketuakomitetalent';

const filterMenuItems = (role) => {
  switch (role) {
    case 'Admin':
      return {
        items: [dashboard, TalentIdentification, ManajemenPengguna]
      };
    case 'Karyawan':
      return {
        items: [EventKaryawan]
      };
    case 'Komite Unit':
      return {
        items: [EventKomiteUnit]
      };
    case 'Ketua Komite Talent':
      return {
        items: [EventKetuaKomiteTalent]
      };
    default:
      return {
        items: [dashboard]
      };
  }
};

const roleString = sessionStorage.getItem('role');
const role = JSON.parse(roleString)[0]; // Parse the string back to an array and get the first element

console.log('inirole', role);

const menuItems = filterMenuItems(role);

export default menuItems;

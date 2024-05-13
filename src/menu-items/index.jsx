import dashboard from './dashboard';
import TalentIdentification from './talent-identification';
import EventKomiteUnit from './event-komiteunit';
import ManajemenPengguna from './manajemen-pengguna';
import EventKaryawan from './event-karyawan';
import EventKetuaKomiteTalent from './event-ketuakomitetalent';

// const filterMenuItems = (role) => {
//   switch (role) {
//     case 'Admin':
//       return {
//         items: [dashboard, TalentIdentification, ManajemenPengguna]
//       };
//     case 'Karyawan':
//       return {
//         items: [EventKaryawan]
//       };
//     case 'Komite Unit':
//       return {
//         items: [EventKomiteUnit]
//       };
//     case 'Ketua Komite Talent':
//       return {
//         items: [EventKetuaKomiteTalent]
//       };
//     default:
//       return {
//         items: [dashboard]
//       };
//   }
// };

// const roleString = sessionStorage.getItem('role');
// const role = roleString ? JSON.parse(roleString)[0] : null;

// console.log('inirole', role);

// const menuItems = filterMenuItems(role);

const menuItems = {
  items: [dashboard, TalentIdentification, EventKetuaKomiteTalent, EventKomiteUnit, EventKaryawan, ManajemenPengguna]
};

export default menuItems;

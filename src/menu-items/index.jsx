import dashboard from './dashboard';
import TalentIdentification from './talent-identification';
import EventKomiteUnit from './event-komiteunit';
import ManajemenPengguna from './manajemen-pengguna';
import EventKaryawan from './event-karyawan';
import EventKetuaKomiteTalent from './event-ketuakomitetalent';

const filterMenuItems = (role) => {
  switch (role) {
    case 'Super Admin':
      return [dashboard, TalentIdentification, ManajemenPengguna, ManajemenPengguna];
    case 'Admin Talent':
      return [dashboard, TalentIdentification];
    case 'Karyawan':
      return [EventKaryawan];
    case 'Komite Unit':
      return [EventKomiteUnit];
    case 'HCBP':
      return [dashboard];
    default:
      return [EventKetuaKomiteTalent];
  }
};

const getMenuItems = (roleString) => {
  // const roleString = sessionStorage.getItem('role');
  const role = roleString ? JSON.parse(roleString) : null;
  let menuItems = [];

  if (role) {
    const menuByRole = role.map((i) => {
      return filterMenuItems(i);
    });
    const lat = menuByRole.flat();
    const sets = [...new Set(lat)];

    menuItems = sets;
    return menuItems;
  }

  // const menuItems = {
  //   items: [dashboard, TalentIdentification, EventKetuaKomiteTalent, EventKomiteUnit, EventKaryawan, ManajemenPengguna]
  // };
};

export default getMenuItems;

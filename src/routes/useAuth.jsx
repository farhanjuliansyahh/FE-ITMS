import { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

export const useAuth = () => {
  const navigate = useNavigate();
  const [resultProfile, setResultProfile] = useState(null);

  const doLoginSide = async (nippos, password) => {
    const headers = {
      'Content-Type': 'application/json'
    };

    const content = JSON.stringify({
      nippos: nippos,
      password: password
    });

    const responseApi = await fetch('http://localhost:4000/loginadmin', {
      method: 'POST',
      headers: headers,
      body: content
    });

    const response = await responseApi.json();
    sessionStorage.setItem('token', response.token);

    if (response.token) {
      toast.success(response.message);
      setTimeout(function () {
        navigate('/dashboard');
      }, 1000); // 1000 milliseconds = 1 second
      alert(response.message);

      try {
        const responseProfile = await fetch('http://localhost:4000/getkaryawan', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${response.token}`
          }
        });

        const resultProfile = await responseProfile.json();

        // Extract the user data
        const user = resultProfile.decoded.user;

        // Set the user profile in state
        setResultProfile(user);

        // Store the nippos in session storage
        sessionStorage.setItem('nippos', user.nippos);

        // Extract nama_role values
        const namaRoles = user.nipposrole.map((role) => role.roleid.nama_role);

        // Store the nama_roles in session storage
        sessionStorage.setItem('role', JSON.stringify(namaRoles));

        const role = JSON.parse(sessionStorage.getItem('role'));
        console.log('ini dia role:', role);

        setTimeout(() => {
          if (role.includes('Super Admin') || role.includes('HCBP')) {
            navigate('/dashboard');
          } else if (role.includes('Komite Unit')) {
            navigate('/event-komiteunit');
          } else if (role.includes('Ketua Komite Talent')) {
            navigate('/event-ketua-komite-talent');
          } else if (role.includes('Karyawan')) {
            navigate('/event-karyawan');
          }
        }, 1000); // 1000 milliseconds = 1 second
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      }
    } else {
      toast.error('Salah NIPPOS atau Kata Sandi!');
    }
  };

  return { doLoginSide, resultProfile };
};

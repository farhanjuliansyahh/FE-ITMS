import { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

export const useAuth = () => {
  const navigate = useNavigate();
  const [resultProfile, setResultProfile] = useState(null);
  const url = import.meta.env.VITE_API_BASE_URL;
  const [performance, setPerformance] = useState([]);

  const UpdatePerformance = async (nippos) => {
    try {
      const response = await fetch(`/backend/api9/${nippos}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // add other headers if necessary
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      
      // Assuming data.message is an array and you want the first element
      const performanceData = data.message[0];
      
      console.log('Data fetched successfully:', performanceData);
      return performanceData;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  const updatePerformanceToDB = (nippos, nki_score, year) => {
    return fetch(url + 'updatenki', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({
        nippos: nippos,
        nki_score: nki_score,
        year: year
      }), 
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        return data; 
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        throw error; 
      });
  };

  const doLoginSide = async (nippos, password) => {
    const headers = {
      'Content-Type': 'application/json'
    };

    // Check the value of nippos
    if (nippos.startsWith('9')) {
      // If nippos starts with '9', call 'login-sso' API
      var loginAPI = 'login-sso';
    } else if (nippos.startsWith('3')) {
      // If nippos starts with '3', call 'loginadmin' API
      var loginAPI = 'loginadmin';
    } else {
      // Handle other cases if needed
      toast.error('Invalid nippos format');
      return;
    }

    const content = JSON.stringify({
      nippos: nippos,
      password: password
    });

    try {
      const responseApi = await fetch(url + loginAPI, {
        method: 'POST',
        headers: headers,
        body: content
      });

      const response = await responseApi.json();
      sessionStorage.setItem('token', response.token);

      if (response.token) {
        toast.success('Login Berhasil !');
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);

        try {
          const responseProfile = await fetch(url + 'getkaryawan', {
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

          // Call updateperformance
          try {
            const performanceData = await UpdatePerformance(user.nippos);
            setPerformance(performanceData);
            console.log("ini pushan", performanceData.nippos, performanceData.nki_score, performanceData.year);
            updatePerformanceToDB(performanceData.nippos, performanceData.nki_score, performanceData.year)
          } catch (error) {
            console.error('Failed to update performance:', error);
          }

          const role = JSON.parse(sessionStorage.getItem('role'));

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
          }, 1000);
        } catch (error) {
          console.error('Failed to fetch user profile:', error);
        }
      } else {
        toast.error('NIPPOS atau Kata Sandi salah !');
      }
    } catch (error) {
      console.error('Failed to login:', error);
      toast.error('Login failed. Please try again.');
    }
  };

  return { doLoginSide, resultProfile, performance };
};

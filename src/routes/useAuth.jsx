import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

export const useAuth = () => {
  const navigate = useNavigate();

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
    } else {
      toast.error('Salah NIPPOS atau Kata Sandi!');
    }
  };

  return { doLoginSide };
};

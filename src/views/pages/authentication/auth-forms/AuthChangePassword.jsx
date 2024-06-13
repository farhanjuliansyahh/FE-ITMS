import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Box, FormControl, FormHelperText, IconButton, InputAdornment, OutlinedInput, Stack, Typography } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useAuth } from '../../../../routes/useAuth.jsx';
import { useNavigate } from 'react-router';
import { styled } from '@mui/material/styles';
import { shouldForwardProp } from '@mui/system';
import ButtonPrimary from '../../../../ui-component/button/ButtonPrimary.jsx';
import { LockOpenRounded, LockOutlined, LockResetOutlined, PublishedWithChangesOutlined, SyncLockOutlined } from '@mui/icons-material';
import KonfirmasiUbahKataSandi from '../../../../ui-component/modal/konfirmasi-ubah-kata-sandi.jsx';

const OutlineInputStyle = styled(OutlinedInput, { shouldForwardProp })(({ theme }) => ({
  width: '100%',
  paddingLeft: 16,
  paddingRight: 16,
  background: '#FFFFFF',
  '& input': {
    background: '#FFFFFF',
    height: '24px'
  },
  '& input::placeholder': {
    fontFamily: 'Roboto',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '20px',
    letterSpacing: '0.5px',
    textAlign: 'left'
  },
  [theme.breakpoints.down('md')]: {
    width: '100%',
    marginLeft: 4,
    background: '#fff'
  }
}));

export default function ResetPassword() {
  const { doLoginSide } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [passwordLama, setPasswordLama] = useState('');
  const [passwordBaru, setPasswordBaru] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [turnoff, setTurnoff] = useState(true);

  useEffect(() => {
    setTurnoff(passwordBaru !== passwordRepeat || passwordBaru === '');
  }, [passwordBaru, passwordRepeat]);

  const handleChangePassword = () => {
    setDialogOpen(true);
  };

  const handleChangeOld = (event) => {
    setPasswordLama(event.target.value);
  };

  const handleChangeNew = (event) => {
    setPasswordBaru(event.target.value);
  };

  const handleChangeRepeat = (event) => {
    setPasswordRepeat(event.target.value);
  };

  return (
    <>
      {/* Formik Form */}
      <Formik
        initialValues={{ oldPassword: '', newPassword: '', repeatNewPassword: '' }}
        validationSchema={Yup.object().shape({
          oldPassword: Yup.string().required('Kata sandi lama diperlukan'),
          newPassword: Yup.string().required('Kata sandi baru diperlukan'),
          repeatNewPassword: Yup.string().required('Konfirmasi kata sandi baru diperlukan')
        })}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            {/* Old Password Input */}
            <FormControl fullWidth error={Boolean(touched.oldPassword && errors.oldPassword)}>
              <Stack direction="row" alignItems="center" spacing={2} sx={{ marginBottom: '24px' }}>
                <SyncLockOutlined sx={{ color: '#2196F3' }} />
                <Typography
                  variant="h6" // Adjust variant as needed
                  sx={{
                    fontFamily: 'Roboto',
                    fontSize: '16px',
                    fontWeight: 600,
                    lineHeight: '24px',
                    letterSpacing: '0.5px',
                    textAlign: 'left',
                    color: '#2196F3'
                  }}
                >
                  Masukkan Kata Sandi Lama
                </Typography>
              </Stack>
              <OutlineInputStyle
                required
                id="old-password"
                type={showPassword ? 'text' : 'password'}
                value={passwordLama}
                name="password"
                onBlur={handleBlur}
                onChange={handleChangeOld}
                placeholder={'Kata Sandi Lama *'}
                sx={{ marginBottom: '48px' }}
                startAdornment={
                  <InputAdornment position="start">
                    <LockResetOutlined stroke={1.5} size="1rem" color="#828282" />
                  </InputAdornment>
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility} onMouseDown={(event) => event.preventDefault()} edge="end" size="large">
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText error>{touched.oldPassword && errors.oldPassword}</FormHelperText>
            </FormControl>

            {/* New Password Input */}
            <FormControl fullWidth error={Boolean(touched.newPassword && errors.newPassword)}>
              <Stack direction="row" alignItems="center" spacing={2} sx={{ marginBottom: '24px' }}>
                <PublishedWithChangesOutlined sx={{ color: '#2196F3' }} />
                <Typography
                  variant="h6" // Adjust variant as needed
                  sx={{
                    fontFamily: 'Roboto',
                    fontSize: '16px',
                    fontWeight: 600,
                    lineHeight: '24px',
                    letterSpacing: '0.5px',
                    textAlign: 'left',
                    color: '#2196F3'
                  }}
                >
                  Masukkan Kata Sandi Baru
                </Typography>
              </Stack>
              <OutlineInputStyle
                required
                id="new-password"
                type={showPassword ? 'text' : 'password'}
                value={passwordBaru}
                name="password"
                onBlur={handleBlur}
                onChange={handleChangeNew}
                placeholder={'Kata Sandi Baru *'}
                sx={{ marginBottom: '24px' }}
                startAdornment={
                  <InputAdornment position="start">
                    <LockOutlined stroke={1.5} size="1rem" color="#828282" />
                  </InputAdornment>
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility} onMouseDown={(event) => event.preventDefault()} edge="end" size="large">
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText error>{touched.newPassword && errors.newPassword}</FormHelperText>
            </FormControl>

            {/* Konfirmasi New Password Input */}
            <FormControl fullWidth error={Boolean(touched.repeatNewPassword && errors.repeatNewPassword)}>
              <OutlineInputStyle
                required
                id="repeat-new-password"
                type={showPassword ? 'text' : 'password'}
                value={passwordRepeat}
                name="password"
                onBlur={handleBlur}
                onChange={handleChangeRepeat}
                placeholder={'Ulangi Kata Sandi Baru *'}
                startAdornment={
                  <InputAdornment position="start">
                    <LockOpenRounded stroke={1.5} size="1rem" color="#828282" />
                  </InputAdornment>
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility} onMouseDown={(event) => event.preventDefault()} edge="end" size="large">
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText error>{touched.repeatNewPassword && errors.repeatNewPassword}</FormHelperText>
            </FormControl>

            {/* Submit Button */}
            <Box display="flex" justifyContent="flex-end" width="100%" marginTop={'48px'}>
              <ButtonPrimary icon={LockOpenRounded} LabelName={'Ubah Kata Sandi'} onClick={handleChangePassword} disabled={turnoff} />
            </Box>

            {/* Submit Error */}
            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}
          </form>
        )}
      </Formik>

      <KonfirmasiUbahKataSandi
        open={dialogOpen}
        handleClose={() => setDialogOpen(false)}
        nippos={sessionStorage.getItem('nippos')}
        passwordLama={passwordLama}
        passwordBaru={passwordBaru}
      />
    </>
  );
}

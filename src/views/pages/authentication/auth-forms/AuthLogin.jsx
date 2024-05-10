import React, { useState } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { useAuth } from '../../../../routes/useAuth';
import { useNavigate } from 'react-router';

const FirebaseLogin = () => {
  const { doLoginSide } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <>
      <Grid container direction="column" justifyContent="center" spacing={2}>
        {/* Divider */}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
          </Box>
        </Grid>

        {/* Nippos Sign In */}
        <Grid item xs={12} container alignItems="center" justifyContent="center">
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">Sign in with your credentials</Typography>
          </Box>
        </Grid>
      </Grid>

      {/* Formik Form */}
      <Formik
        initialValues={{ nippos: '', password: '' }}
        validationSchema={Yup.object().shape({
          nippos: Yup.string()
            .matches(/^[0-9]{9}$/, 'Must be 9 digits')
            .required('Nippos is required'),
          password: Yup.string().required('Password is required')
        })}
        onSubmit={async (values, { setErrors, setSubmitting }) => {
          try {
            await doLoginSide(values.nippos, values.password);
            navigate('/');
          } catch (error) {
            console.error(error);
            setErrors({ submit: 'Invalid nippos or password' });
          }
          setSubmitting(false);
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            {/* Nippos Input */}
            <FormControl fullWidth error={Boolean(touched.nippos && errors.nippos)}>
              <InputLabel htmlFor="outlined-adornment-nippos-login">Nippos</InputLabel>
              <OutlinedInput
                id="outlined-adornment-nippos-login"
                type="text"
                inputMode="numeric" // Add this line to restrict input to numeric characters
                value={values.nippos}
                name="nippos"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Nippos"
              />
              <FormHelperText error>{touched.nippos && errors.nippos}</FormHelperText>
            </FormControl>

            {/* Password Input */}
            <FormControl fullWidth error={Boolean(touched.password && errors.password)}>
              <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-login"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility} onMouseDown={(event) => event.preventDefault()} edge="end" size="large">
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
              <FormHelperText error>{touched.password && errors.password}</FormHelperText>
            </FormControl>

            {/* Submit Button */}
            <Box sx={{ mt: 2 }}>
              <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="secondary">
                Sign in
              </Button>
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
    </>
  );
};

export default FirebaseLogin;

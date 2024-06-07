import React, { useState } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Box, Button, FormControl, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useAuth } from '../../../../routes/useAuth.jsx';
import { useNavigate } from 'react-router';
import { styled } from '@mui/material/styles';
import { shouldForwardProp } from '@mui/system';
import ButtonPrimary from '../../../../ui-component/button/ButtonPrimary.jsx';
import { LockOpenRounded, LockOutlined, LockResetOutlined } from '@mui/icons-material';


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
        textAlign: 'left',
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
            // onSubmit={async (values, { setErrors, setSubmitting }) => {
            //     try {
            //         await doLoginSide(values.oldPassword, values.newPassword, values.repeatNewPassword);
            //         navigate('/');
            //     } catch (error) {
            //         console.error(error);
            //         setErrors({ submit: 'NIPPOS atau Kata Sandi Tidak Valid' });
            //     }
            //     setSubmitting(false);
            // }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        {/* Old Password Input */}
                        <FormControl fullWidth error={Boolean(touched.oldPassword && errors.oldPassword)}>
                            <OutlineInputStyle
                                required
                                id="old-password"
                                type={showPassword ? 'text' : 'password'}
                                value={values.oldPassword}
                                name="password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                placeholder={'Kata Sandi Lama *'}
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
                        <FormControl fullWidth error={Boolean(touched.oldPassword && errors.oldPassword)}>
                            <OutlineInputStyle
                                required
                                id="old-password"
                                type={showPassword ? 'text' : 'password'}
                                value={values.oldPassword}
                                name="password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                placeholder={'Kata Sandi Baru *'}
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
                            <FormHelperText error>{touched.oldPassword && errors.oldPassword}</FormHelperText>
                        </FormControl>

                        {/* Konfirmasi New Password Input */}
                        <FormControl fullWidth error={Boolean(touched.oldPassword && errors.oldPassword)}>
                            <OutlineInputStyle
                                required
                                id="old-password"
                                type={showPassword ? 'text' : 'password'}
                                value={values.oldPassword}
                                name="password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                placeholder={'Konfirmasi Kata Sandi Baru *'}
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
                            <FormHelperText error>{touched.oldPassword && errors.oldPassword}</FormHelperText>
                        </FormControl>

                        {/* Submit Button */}
                        <Box display="flex" justifyContent="flex-end" width="100%" marginTop={'48px'}>
                            <ButtonPrimary
                                icon={LockOpenRounded}
                                LabelName={'Ubah Kata Sandi'}
                            />
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

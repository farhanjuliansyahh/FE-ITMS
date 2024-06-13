import * as React from 'react';
import { Box, Divider, Grid, Typography } from '@mui/material';
import AlertUbahSandi from '../../../ui-component/cards/AlertUbahSandi.jsx';
import ResetPassword from '../authentication/auth-forms/AuthChangePassword.jsx';

export default function UbahKataSandi() {
  return (
    <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px' }}>
      <div style={{ display: 'block', backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '16px 24px', gap: '16px' }}>
        <Typography style={{ fontSize: '24px', fontWeight: 'bold' }}>Ubah Kata Sandi</Typography>
      </div>

      <Divider orientation="horizontal" flexItem sx={{ borderColor: '#E0E0E0' }} />

      <div style={{ display: 'block', backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '48px 96px', gap: '16px' }}>
        <Grid container>
          <Grid item xs={5}>
            <AlertUbahSandi />
          </Grid>
          <Grid item xs={6}>
            <Box ml={6}>
              <ResetPassword />
            </Box>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

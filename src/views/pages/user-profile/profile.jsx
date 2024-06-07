import * as React from 'react';
import { Divider, Typography } from '@mui/material';
import DataDiriKaryawan from '../../../ui-component/submenu/karyawan-datadiri.jsx';

export default function UserProfile() {
    return (
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px' }}>
            <div style={{ display: 'block', backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '16px 24px', gap: '16px' }}>
                <Typography style={{ fontSize: '24px', fontWeight: 'bold' }}>Profil</Typography>
            </div>
            <Divider orientation="horizontal" flexItem sx={{ borderColor: '#E0E0E0' }}/>
            <div style={{ display: 'block', backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '48px 96px', gap: '16px' }}>
                <DataDiriKaryawan photosize={200} spaces={[3, 8]} statusButton={false}/>
            </div>
        </div>
    )
}
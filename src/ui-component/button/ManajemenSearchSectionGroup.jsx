import React, { useEffect, useState } from 'react';
import { Grid,  Stack,  Box, } from '@mui/material';
import { gridSpacing } from '../../store/constant';
import SearchResetButton from './SearchResetButton';
import SearchIcon from '@mui/icons-material/Search';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SearchEventButton from './SearchEventButton';
const ManajemenSearchSectionGroup= () => {
    return (
        <Box>
            <Grid container spacing={gridSpacing}>
                {/* Your component JSX code here */}
                <Grid item xs={12}>
                    <Stack direction="row"  justifyContent="start" alignItems="center">
                    <div style={{ display: 'flex', justifyContent: 'flex-start', paddingLeft:'10' }}>
                        <div style={{ marginRight: '170px' }}>
                            <SearchEventButton PlaceHolder={'Nama'} inputWidth={'250px'} />
                        </div>
                        <div style={{ marginRight: '170px' }}>
                            <SearchEventButton PlaceHolder={'NIPPOS'} inputWidth={'250px'} />
                        </div>
                        <div style={{ marginRight: '170px' }}>
                            <SearchEventButton PlaceHolder={'Peran'} inputWidth={'250px'} />
                        </div>
                        <div style={{ marginRight: '18px' }}>
                            <SearchResetButton outlineColor="#1C2D5A" icon={SearchIcon} LabelName={'Cari'} />
                        </div>
                        <div style={{ marginRight: '0px' }}>
                            <SearchResetButton outlineColor="#D32F2F" icon={RestartAltIcon} LabelName={'Reset'} />
                        </div>
                    </div>
                    </Stack>
                </Grid>
                {/* Other components and sections */}
            </Grid>
        </Box>
    );
};

export default ManajemenSearchSectionGroup;

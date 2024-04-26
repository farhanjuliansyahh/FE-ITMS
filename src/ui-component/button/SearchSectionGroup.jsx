import React, { useEffect, useState } from 'react';
import { Grid, Container, Stack, Typography, Box, Button } from '@mui/material';
import { gridSpacing } from '../../store/constant';
// import GroupsIcon from '@mui/icons-material/Groups';
// import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import EventDetailSearchSection from './EventDetailSearchSection';
import SearchResetButton from './SearchResetButton';
import SearchIcon from '@mui/icons-material/Search';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SearchEventButton from './SearchEventButton';
const SearchSectionGroup= () => {
    return (
        <Box>
            <Grid container spacing={gridSpacing}>
                {/* Your component JSX code here */}
                <Grid item xs={12}>
                    <Stack direction="row"  justifyContent="start" alignItems="center">
                    <div style={{ display: 'flex', justifyContent: 'flex-start', paddingLeft:'10' }}>
                        <div style={{ marginRight: '120px' }}>
                            <SearchEventButton PlaceHolder={'Nama'} inputWidth={'200px'} />
                        </div>
                        <div style={{ marginRight: '120px' }}>
                            <SearchEventButton PlaceHolder={'NIPPOS'} inputWidth={'200px'} />
                        </div>
                        <div style={{ marginRight: '180px' }}>
                            <SearchEventButton PlaceHolder={'Job Level'} inputWidth={'200px'} />
                        </div>
                        <div style={{ marginRight: '15px' }}>
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

export default SearchSectionGroup;

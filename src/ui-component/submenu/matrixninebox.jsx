import * as React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
// import Matrix from '../../../ui-component/submenu/matrix';

export default function MatrixNineBox() {
    const boxStyle = {
        // border: '1px solid #E0E0E0', 
        padding: '20px', 
        width: '100%',
        borderRadius:'12px',
    };

    const ButtonIcon = styled('div')({
        backgroundColor: '#1C2D5A',
        color: '#1C2D5A',
        padding: '8px 14px',
        borderRadius: '12px',
        minWidth: '10px',
    });

    const FlexContainer = styled('div')({
        display: 'flex',
        alignItems: 'center',
        gap: '16px', 
        paddingBottom: '24px',
    });

    const EmployeeSum = styled('div')({
        backgroundColor: '#EAF8FF',
        color: '#2196F3',
        padding: '8px 16px',
        borderRadius: '24px',
        fontWeight: 600,
        fontSize:'16px'
    });

    const IconContainer = styled('div')({
        display: 'flex',
        alignItems: 'center',
        gap:'16px'
    });

    const BoxContainer = styled('div')({
        display: 'flex',
        alignItems: 'center',
        gap:'8px'
    });

    return (
        <Box sx={boxStyle}>
            <FlexContainer>
                <Typography variant='h3'>Matrix Nine Box</Typography>
                <div style={{ flex: '1' }}> </div>
                <IconContainer>
                    <EmployeeSum>40 Karyawan</EmployeeSum>
                    <BoxContainer>
                        <ButtonIcon>9</ButtonIcon>
                        <Typography sx={{ fontWeight: 400, fontSize: '14px', lineHeight: '20px' }}>Jumlah Karyawan</Typography>
                    </BoxContainer>
                </IconContainer>
            </FlexContainer>
        </Box>  
    )
}
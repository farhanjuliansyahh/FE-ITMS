import * as React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Matriks from '../../../src/ui-component/submenu/matriks.jsx';

export default function MatrixNineBox({eventid, totalrows}) {
    const activeStep = eventid
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
        height: '36px',
        width: '36px'
    });

    const FlexContainer = styled('div')({
        display: 'flex',
        alignItems: 'center',
        gap: '16px', 
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
                <Typography variant='h2'>Matrix Nine Box</Typography>
                <div style={{ flex: '1' }}> </div>
                <IconContainer>
                    <EmployeeSum>{totalrows} Karyawan</EmployeeSum>
                    <BoxContainer>
                        <ButtonIcon></ButtonIcon>
                        <Typography sx={{ fontWeight: 400, fontSize: '14px', lineHeight: '20px' }}>Jumlah Karyawan</Typography>
                    </BoxContainer>
                </IconContainer>
            </FlexContainer>

            <FlexContainer>
                <Typography variant='h4' style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>Capacity</Typography>
                <Matriks eventid={activeStep}/>
            </FlexContainer>
        </Box>  
    )
}
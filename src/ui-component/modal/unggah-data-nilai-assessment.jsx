import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, 
    FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { CancelOutlined, UploadFileOutlined, AttachFileOutlined } from '@mui/icons-material';
import { Box } from '@mui/system';

function UnggahDataNilaiAssessment({ open, handleClose }) {    
    const batalkanButtonStyle = {
        backgroundColor: '#D32F2F',
        color:'#fff',
        borderRadius: '12px',
        padding : '14px 24px',
        transition: 'background-color 0.3s',
        fontSize: '14px'
    };
    
    const hoverBatalkanStyle = {
        backgroundColor: '#B71C1C' // Darker shade for hover
    };

    const [isHoveredBatalkan, setIsHoveredBatalkan] = useState(false);

    const batalkanButton = (
        <Button
            endIcon={<CancelOutlined />}
            style={{
                ...isHoveredBatalkan ? { ...batalkanButtonStyle, ...hoverBatalkanStyle } : batalkanButtonStyle,
                width: '100%' 
            }}
            onMouseEnter={() => setIsHoveredBatalkan(true)}
            onMouseLeave={() => setIsHoveredBatalkan(false)}
            onClick={handleClose}
        >
            Batalkan
        </Button>
    );

    const DividerContainer = styled('div')({
        width: '100%',
        textAlign: 'center',
        backgroundColor: '#E0E0E0'
    });

    const UploadBox = styled('div')({
        width: '500px',
        height: 'fit-content',
        padding: '24px 0',
        gap: '16px',
        borderRadius: '12px',
        border: '2px dashed #1C2D5A',
        backgroundColor: '#F5F8FF',
        opacity: 1,
        verticalAlign: 'center',
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
    });

    const StyledUploadFileOutlined = styled(UploadFileOutlined)({
        width: '48px',
        height: '48px',
        color: '#1C2D5A'
    });

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    const handleDrop = (event) => {
        event.preventDefault();
        const files = event.dataTransfer.files;
        // Handle the dropped files here, e.g., upload or process them
        console.log('Dropped files:', files);
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
                <Typography style={{ fontSize: '24px', fontWeight: '700', textAlign:'center', marginTop: '10px' }}>
                    Unggah Data Nilai Assesment
                </Typography>
            </DialogTitle>
            <DividerContainer>
                <Divider orientation="horizontal" flexItem /> 
            </DividerContainer>
            <DialogContent>
                <UploadBox onDrop={handleDrop} onDragOver={(event) => event.preventDefault()}>
                    <StyledUploadFileOutlined />
                    <Typography style={{ fontSize: '16px', fontWeight: '400', textAlign:'center' }}>
                        Drop file csv atau
                    </Typography>
                    <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        sx={{ 
                            color: '#ffffff',  
                            backgroundColor: '#1C2D5A', 
                            borderRadius: '12px', 
                            fontSize: '14px', 
                            padding: '14px 24px', 
                            boxShadow: 'none',
                            '&:hover': {
                            color: '#ffffff', 
                            backgroundColor: '#122350', 
                            }
                        }} 
                        tabIndex={-1}
                        endIcon={<AttachFileOutlined />}
                        >
                        Pilih file
                        <VisuallyHiddenInput type="file" />
                    </Button>
                </UploadBox>
                <Box sx={{marginTop: '24px', paddingLeft: '5px'}}>
                    <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label">
                            <Typography style={{ fontSize: '16px', fontWeight: '600', textAlign: 'left', marginBottom: '10px' }}>
                                Kategori Nilai Assessment 
                                <span style={{ color: '#F44336' }}> *</span>
                            </Typography>
                        </FormLabel>
                        <RadioGroup
                            defaultValue="kompetensiBUMN"
                            name="radio-buttons-group"
                            style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: '24px' }}
                        >
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <FormControlLabel value="kompetensiBUMN" control={<Radio />} label="Kompetensi BUMN" />
                                <FormControlLabel value="kompetensiLeadership" control={<Radio />} label="Kompetensi Leadership" />
                                <FormControlLabel value="kompetensiTeknis" control={<Radio />} label="Kompetensi Teknis" />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <FormControlLabel value="Potensi" control={<Radio />} label="Potensi" />
                                <FormControlLabel value="AKHLAK" control={<Radio />} label="AKHLAK" />
                                <FormControlLabel value="learningAgility" control={<Radio />} label="Learning Agility" />
                            </div>   
                        </RadioGroup>
                    </FormControl>
                </Box>
            </DialogContent>
            <DialogActions sx={{padding:'24px 24px 24px 24px '}}>
                {batalkanButton}
            </DialogActions>
        </Dialog>
    );
}

export default UnggahDataNilaiAssessment;
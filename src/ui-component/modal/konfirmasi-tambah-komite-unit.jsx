// Draft Popup

import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, Divider, 
    FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';

import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { CancelOutlined, CheckCircleOutlineOutlined } from '@mui/icons-material';
import ButtonPrimary from '../button/ButtonPrimary.jsx';
import ButtonError from '../button/ButtonError.jsx';

function KonfirmasiTambahKomiteUnit({ open, onClose, onConfirm }) {    
    const [selectedOption, setSelectedOption] = useState(null);

    const ButtonsContainer = styled('div')({
        display: 'flex',
        alignItems: 'center',
        width:'100%',
        padding: '0px 8px',
        gap:'16px',
        justifyContent: 'space-between'
    });

    const DividerContainer = styled('div')({
        width: '100%',
        textAlign: 'center',
        backgroundColor: '#E0E0E0'
    });

    const OptionnBox = styled('div')({
        width: '500px',
        height: 'fit-content',
        padding: '24px 24px',
        gap: '16px',
        borderRadius: '12px',
        backgroundColor: '#F5F8FF',
        opacity: 1,
        verticalAlign: 'center',
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'left', 
        justifyContent: 'center',
    });

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    // Conditionally enable/disable the "Tambah" button
    const isButtonDisabled = selectedOption === null;

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>
                <Typography style={{ fontSize: '24px', fontWeight: '700', textAlign:'center', marginTop: '10px' }}>
                    Konfirmasi Tambah Komite Unit
                </Typography>
            </DialogTitle>
            <DividerContainer>
                <Divider orientation="horizontal" flexItem /> 
            </DividerContainer>
            <DialogContent>
                <OptionnBox>
                <FormControl component="fieldset">
                    <FormLabel component="legend">
                        <Typography style={{ color: '#1F1F1F', fontSize: '16px', fontWeight: '600', textAlign: 'left', marginBottom: '10px' }}>
                            Penyimpanan Komite Unit
                            <span style={{ color: '#F44336' }}> *</span>
                        </Typography>
                    </FormLabel>
                    <RadioGroup
                        name="radio-buttons-group"
                        style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: '24px' }}
                        value={selectedOption}
                        onChange={handleOptionChange} // Update selectedOption when a radio button is selected
                    >
                        <FormControlLabel value={false} control={<Radio />} label="Event Ini Saja" />
                        <FormControlLabel value={true} control={<Radio />} label="Permanent Semua Event" />
                    </RadioGroup>
                </FormControl>
                </OptionnBox>
                <Box>
                    <div>
                        <Typography style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '14px', marginTop: '24px' }}>
                            Apakah anda yakin menambah komite unit yang anda pilih?                        
                        </Typography>
                        <Typography style={{ textAlign:'center', color:'#828282', fontSize:'14px', marginTop:'16px', marginBottom: '24px'}}>
                            Anda tidak dapat membatalkan komite unit yang sudah dipilih.
                        </Typography>
                    </div>
                </Box>
            </DialogContent>
            <DialogActions sx={{padding:'0 24px 24px 24px '}}>
                <ButtonsContainer>
                    <ButtonError LabelName={'Batalkan'} icon={CancelOutlined} onClick={onClose}/>
                    <ButtonPrimary LabelName={'Tambah'} icon={CheckCircleOutlineOutlined} onClick={() => onConfirm(selectedOption)} disabled={isButtonDisabled}/>

                </ButtonsContainer>
            </DialogActions>
        </Dialog>
    );
}

export default KonfirmasiTambahKomiteUnit;
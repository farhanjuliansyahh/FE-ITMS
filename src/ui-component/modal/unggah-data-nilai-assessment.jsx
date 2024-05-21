import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, 
    FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { CancelOutlined, FileUploadOutlined, UploadFileOutlined, AttachFileOutlined } from '@mui/icons-material';
import { Box } from '@mui/system';
import Papa from 'papaparse';

function UnggahDataNilaiAssessment({ open, handleClose }) {    
    const unggahDataButtonStyle = {
        backgroundColor: '#1C2D5A',
        color: '#fff',
        borderRadius: '12px',
        padding: '14px 24px',
        transition: 'background-color 0.3s',
        fontSize: '14px'
    };
    
    const batalkanButtonStyle = {
        backgroundColor: '#D32F2F',
        color:'#fff',
        borderRadius: '12px',
        padding : '14px 24px',
        transition: 'background-color 0.3s',
        fontSize: '14px'
    };
    
    const hoverUnggahDataButtonStyle = {
        backgroundColor: '#122350' // Darker shade for hover
    };

    const hoverBatalkanStyle = {
        backgroundColor: '#B71C1C' // Darker shade for hover
    };

    const [isHoveredBatalkan, setIsHoveredBatalkan] = useState(false);
    const [IsHoverUnggahData, setIsHoverUnggahData] = useState(false);

    const ButtonsContainer = styled('div')({
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        padding: '0px 8px',
        gap: '128px',
        justifyContent: 'space-between'
    });

    const batalkanButton = (
        <Button
            endIcon={<CancelOutlined />}
            style={{ ...isHoveredBatalkan ? { ...batalkanButtonStyle, ...hoverBatalkanStyle } : batalkanButtonStyle }}
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

    // ini untuk record selected value di radio button
    const [selectedValue, setSelectedValue] = useState('kompetensiBUMN');
    const handleChange = (event) => {
        const newValue = event.target.value;
        setSelectedValue(newValue);
    };

    // untuk handle upload file
    const [parsedData, setParsedData] = useState([]);
    const [namaFile, setNamaFile] = useState('')

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        setNamaFile(files.map(file => file.name)[0]);
        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const text = e.target.result;
                Papa.parse(text, {
                    header: true,
                    complete: (result) => {
                        setParsedData(result.data);
                    }
                });
            };
            reader.readAsText(file);
        });
    };    

    // untuk handle drop file
    const handleDrop = (event) => {
        event.preventDefault();
        const files = Array.from(event.dataTransfer.files);
        setNamaFile(files.map(file => file.name)[0]);
        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const text = e.target.result;
                Papa.parse(text, {
                    header: true,
                    complete: (result) => {
                        setParsedData(result.data);
                    }
                });
            };
            reader.readAsText(file);
        });
    };

    const uploadskor = () => {
        // Map the data based on selectedValue
        let modifiedData;
        if (selectedValue === "AKHLAK") {
            modifiedData = parsedData.map(item => ({
                Berlaku_Mulai: item['START DATE'],
                Berlaku_Hingga: item['END DATE'],
                nippos: item['NIPPOS'],
                skor: item['VALUE']
            }));
        } else {
            modifiedData = parsedData;
        }

        return fetch('http://localhost:4000/addskorakhlak', {
            method: 'POST', // Specify the HTTP method (POST, GET, etc.)
            headers: {
                'Content-Type': 'application/json', // Specify the content type
            },
            body: JSON.stringify({
                data: modifiedData
            }) 
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Upload successful:', data);
                handleClose(); // Close the dialog after successful upload
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                // Optionally, you can handle the error by showing a message to the user
            });
    };

    const unggahDataButton = (
        <Button
            endIcon={<FileUploadOutlined />}
            style={IsHoverUnggahData ? { ...unggahDataButtonStyle, ...hoverUnggahDataButtonStyle } : unggahDataButtonStyle}
            onMouseEnter={() => setIsHoverUnggahData(true)}
            onMouseLeave={() => setIsHoverUnggahData(false)}
            onClick={uploadskor}
        >
            Unggah Data
        </Button>
    );

    
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
                {namaFile === '' ? (
                    <UploadBox onDrop={handleDrop} onDragOver={(event) => event.preventDefault()}>
                        <StyledUploadFileOutlined />
                        <Typography style={{ fontSize: '16px', fontWeight: '400', textAlign: 'center' }}>
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
                            <VisuallyHiddenInput 
                                type="file" 
                                onChange={handleFileChange} 
                            />
                        </Button>
                    </UploadBox>
                ) : (
                    <UploadBox onDrop={handleDrop} onDragOver={(event) => event.preventDefault()}>
                        <StyledUploadFileOutlined />
                        <Typography style={{ fontSize: '16px', fontWeight: '400', textAlign: 'center' }}>
                            {namaFile}
                        </Typography>
                    </UploadBox>
                )}
                <Box sx={{marginTop: '24px', paddingLeft: '5px'}}>
                    <Typography style={{ fontSize: '16px', fontWeight: '600', textAlign: 'left', marginBottom: '10px' }}>
                        Kategori Nilai Assessment 
                        <span style={{ color: '#F44336' }}> *</span>
                    </Typography>
                    <FormControl>
                        <RadioGroup
                            defaultValue="kompetensiBUMN"
                            name="radio-buttons-group"
                            style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: '24px' }}
                            value={selectedValue}
                            onChange={handleChange}
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
                <ButtonsContainer>
                    {batalkanButton}
                    {unggahDataButton}
                </ButtonsContainer>
            </DialogActions>
        </Dialog>
    );
}

export default UnggahDataNilaiAssessment;

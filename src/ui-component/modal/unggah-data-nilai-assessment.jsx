import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { CancelOutlined, FileUploadOutlined, UploadFileOutlined, AttachFileOutlined } from '@mui/icons-material';
import { Box } from '@mui/system';
import { toast } from 'react-toastify';
import Papa from 'papaparse';
import ButtonPrimary from '../../ui-component/button/ButtonPrimary';
import ButtonError from '../../ui-component/button/ButtonError';

function UnggahDataNilaiAssessment({ open, handleClose, onConfirm }) {
    const ButtonsContainer = styled('div')({
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        padding: '0px 8px',
        gap: '128px',
        justifyContent: 'space-between'
    });

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
    const [selectedValue, setSelectedValue] = useState('1');
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

    const [uploadInProgressToastId, setUploadInProgressToastId] = useState(null);

    const uploadskor = () => {
        const progressToastId = toast.info('Upload in progress...', { autoClose: false });
        setUploadInProgressToastId(progressToastId);

        // Map the data based on selectedValue
        let modifiedData;

        if (selectedValue === "6" || selectedValue === "5") {
            const { exists, missingHeaders } = checkHeadersExist(['START DATE', 'END DATE', 'NIPPOS', 'VALUE']);
            if (!exists) {
                // Handle the scenario where headers don't match
                setUploadInProgressToastId(null)
                toast.dismiss(progressToastId); // Dismiss the upload in progress toast
                toast.error(`Required headers are missing: ${missingHeaders.join(', ')}`);
                return;
            }

            modifiedData = parsedData.map(item => ({
                Berlaku_Mulai: item['START DATE'],
                Berlaku_Hingga: item['END DATE'],
                nippos: item['NIPPOS'],
                skor: item['VALUE']
            }));
        } else if (selectedValue === "1" || selectedValue === "4") {
            // Check if the required headers exist
            const { exists, missingHeaders } = checkHeadersExist(['START DATE', 'END DATE', 'NIPPOS', 'ASSESSMENT VALUE']);
            if (!exists) {
                // Handle the scenario where headers don't match
                setUploadInProgressToastId(null)
                toast.dismiss(progressToastId); // Dismiss the upload in progress toast
                toast.error(`Required headers are missing: ${missingHeaders.join(', ')}`);
                return;
            }

            modifiedData = parsedData.map(item => ({
                Berlaku_Mulai: item['START DATE'],
                Berlaku_Hingga: item['END DATE'],
                nippos: item['NIPPOS'],
                skor: item['ASSESSMENT VALUE']
            }));
        } else if (selectedValue === "2") {
            // Check if the required headers exist
            const { exists, missingHeaders } = checkHeadersExist(['START DATE', 'END DATE', 'NIPPOS', 'ASSESSMENT VALUE', 'ASSESSMENT CODE']);
            if (!exists) {
                // Handle the scenario where headers don't match
                setUploadInProgressToastId(null)
                toast.dismiss(progressToastId); // Dismiss the upload in progress toast
                toast.error(`Required headers are missing: ${missingHeaders.join(', ')}`);
                return;
            }

            modifiedData = parsedData.map(item => ({
                Berlaku_Mulai: item['START DATE'],
                Berlaku_Hingga: item['END DATE'],
                nippos: item['NIPPOS'],
                skor: item['ASSESSMENT VALUE'],
                kodeassessment: item['ASSESSMENT CODE']
            }));
        } else {
            const { exists, missingHeaders } = checkHeadersExist(['nippos', 'id_Kompetensi', 'id_jenis_kompetensi', 'skor', 'Berlaku_Mulai', 'Berlaku_Hingga']);
            if (!exists) {
                // Handle the scenario where headers don't match
                setUploadInProgressToastId(null)
                toast.dismiss(progressToastId); // Dismiss the upload in progress toast
                toast.error(`Required headers are missing: ${missingHeaders.join(', ')}`);
                return;
            }
            modifiedData = parsedData;
        }

        const chunkSize = 700; // Define the size of each chunk
        const chunks = [];

        for (let i = 0; i < modifiedData.length; i += chunkSize) {
            chunks.push(modifiedData.slice(i, i + chunkSize));
        }

        const uploadChunk = (chunkIndex) => {
            if (chunkIndex >= chunks.length) {
                setUploadInProgressToastId(null)
                toast.dismiss(progressToastId); // Dismiss the upload in progress toast
                toast.success('All chunks uploaded successfully'); // Show toast notification
                console.log('All chunks uploaded successfully');
                handleResetAndClose(); // Close the dialog after successful upload
                if (onConfirm) {
                    onConfirm();
                }
                // window.location.reload();
                return;
            }

            fetch('http://localhost:4000/addskor', {
                method: 'POST', // Specify the HTTP method (POST, GET, etc.)
                headers: {
                    'Content-Type': 'application/json', // Specify the content type
                },
                body: JSON.stringify({
                    data: chunks[chunkIndex],
                    kategori: selectedValue
                })
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(`Chunk ${chunkIndex + 1} upload successful:`, data);
                    uploadChunk(chunkIndex + 1); // Upload the next chunk
                })
                .catch(error => {
                    console.error('Error uploading chunk:', error);
                    setUploadInProgressToastId(null)
                    toast.dismiss(progressToastId); 
                    toast.error('Error uploading chunk of data:', error)
                    // Optionally, you can handle the error by showing a message to the user or retrying
                });
        };

        uploadChunk(0); // Start uploading the first chunk
    };

    // Function to check if all required headers exist in the parsed data
    const checkHeadersExist = (requiredHeaders) => {
        const actualHeaders = Object.keys(parsedData[0]); // Extract actual headers from the parsed data
        const missingHeaders = requiredHeaders.filter(header => !actualHeaders.includes(header));
        return { exists: missingHeaders.length === 0, missingHeaders };
    };

    // Custom handleClose function to reset states and close the dialog
    const handleResetAndClose = () => {
        setParsedData([]);
        setNamaFile('');
        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleResetAndClose}>
            <DialogTitle>
                <Typography style={{ fontSize: '24px', fontWeight: '700', textAlign: 'center', marginTop: '10px' }}>
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
                <Box sx={{ marginTop: '24px', paddingLeft: '5px' }}>
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
                                <FormControlLabel value="1" control={<Radio />} label="Kompetensi BUMN" />
                                <FormControlLabel value="2" control={<Radio />} label="Kompetensi Leadership" />
                                <FormControlLabel value="3" control={<Radio />} label="Kompetensi Teknis" />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <FormControlLabel value="4" control={<Radio />} label="Potensi" />
                                <FormControlLabel value="5" control={<Radio />} label="AKHLAK" />
                                <FormControlLabel value="6" control={<Radio />} label="Learning Agility" />
                            </div>
                        </RadioGroup>
                    </FormControl>
                </Box>
            </DialogContent>
            <DialogActions sx={{ padding: '24px 24px 24px 24px ' }}>
                <ButtonsContainer>
                    <ButtonError
                        Color="#ffffff"
                        icon={CancelOutlined}
                        LabelName={'Batalkan'}
                        onClick={handleResetAndClose}
                        disabled={uploadInProgressToastId !== null}
                    />
                    <ButtonPrimary
                        Color="#ffffff"
                        icon={FileUploadOutlined}
                        LabelName={'Unggah Data'}
                        onClick={uploadskor}
                        disabled={parsedData.length === 0 || uploadInProgressToastId !== null} // Disable button when upload is in progress or no file is selected
                    />
                </ButtonsContainer>
            </DialogActions>
        </Dialog>
    );
}

export default UnggahDataNilaiAssessment;

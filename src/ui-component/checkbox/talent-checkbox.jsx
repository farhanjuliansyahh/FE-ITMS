import React, { useState } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, Divider } from '@mui/material';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import.meta.env.VITE_API_BASE_URL

export default function TalentCheckbox({ onStatusUpdate, Title, Body , subBody, Footer, data, eventid, datatoupdate, statusprofile}) {
    const [checked, setChecked] = useState(false);
    const [openModal, setOpenModal] = useState(false); // State to manage modal open/close
    const [processCompleted, setProcessCompleted] = useState(statusprofile); // State to track if process is completed
const url = import.meta.env.VITE_API_BASE_URL

    const updatepakta = (eventid,nippos,datatoupdate) => {
        return fetch(url + `updatepaktacommitpribadi`, {
            method: 'POST', // Specify the HTTP method (POST, GET, etc.)
            headers: {
                'Content-Type': 'application/json', // Specify the content type
            },
            body: JSON.stringify({
                // Include any data you want to send in the request body
                eventtalentid: eventid,
                nippos: nippos,
                datatoupdate: datatoupdate
            }) // Convert the bodyData object to a JSON string
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                return data; // Return the parsed JSON data
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                throw error; // Rethrow the error to handle it elsewhere
            });
    };

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    const handleSubmit = () => {
        setOpenModal(true); // Open the modal when submit button is clicked
    };

    const handleCloseModal = () => {
        setOpenModal(false); // Close the modal
    };

    const handleSelesai = () => {
        // Your logic for handling "Selesai" button click
        onStatusUpdate(); // Call the callback function to update the status in ProfileAccordion
        updatepakta(eventid, data.nippos,datatoupdate )
        setProcessCompleted(true); // Mark the process as completed
        setOpenModal(false); // Close the modal after handling
    };

    const SelesaiButtonStyle = {
        backgroundColor: '#1C2D5A',
        color: '#fff',
        borderRadius: '12px',
        padding: '14px 24px',
        transition: 'background-color 0.3s'
    };

    const batalkanButtonStyle = {
        backgroundColor: '#D32F2F',
        color: '#fff',
        borderRadius: '12px',
        padding: '14px 24px',
        transition: 'background-color 0.3s',
        fontSize: '14px'
    };

    const hoverSelesaiStyle = {
        backgroundColor: '#122350' // Darker shade for hover
    };

    const hoverBatalkanStyle = {
        backgroundColor: '#B71C1C' // Darker shade for hover
    };

    const ButtonsContainer = styled('div')({
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        padding: '0px 8px',
        gap: '16px',
        justifyContent: 'space-between'
    });

    const [isHoveredSelesai, setIsHoveredSelesai] = useState(false);
    const [isHoveredBatalkan, setIsHoveredBatalkan] = useState(false);

    const SelesaiButton = (
        <Button
            endIcon={<CheckCircleOutlinedIcon />}
            style={isHoveredSelesai ? { ...SelesaiButtonStyle, ...hoverSelesaiStyle } : SelesaiButtonStyle}
            onMouseEnter={() => setIsHoveredSelesai(true)}
            onMouseLeave={() => setIsHoveredSelesai(false)}
            onClick={handleSelesai}
        >
            Submit
        </Button>
    );

    const batalkanButton = (
        <Button
            endIcon={<CancelOutlinedIcon />}
            style={isHoveredBatalkan ? { ...batalkanButtonStyle, ...hoverBatalkanStyle } : batalkanButtonStyle}
            onMouseEnter={() => setIsHoveredBatalkan(true)}
            onMouseLeave={() => setIsHoveredBatalkan(false)}
            onClick={handleCloseModal}
        >
            Batalkan
        </Button>
    );

    const DividerContainer = styled('div')({
        width: '100%',
        textAlign: 'center',
        backgroundColor: '#E0E0E0'
    });

    return (
        <FormGroup>
            <div style={{ marginLeft: '10px', marginBottom: '15px' }}>
                <FormControlLabel
                    required
                    control={<Checkbox checked={checked} onChange={handleChange} disabled={processCompleted} />}
                    label={Footer}
                />
            </div>
            <div>
                <Button
                    variant="contained"
                    endIcon={<ArrowForwardIcon />}
                    disabled={!checked || processCompleted} // Disable if not checked or process completed
                    onClick={handleSubmit}
                    sx={{
                        color: '#ffffff',
                        backgroundColor: '#1C2D5A',
                        borderRadius: '12px',
                        fontSize: '14px',
                        padding: '14px 24px',
                        boxShadow: 'none',
                        height: '48px',
                        width: '120px',
                    }}>
                    Submit
                </Button>
            </div>

            <Dialog open={openModal} onClose={handleCloseModal}>
                <DialogTitle>
                    <Typography style={{ fontSize: '24px', fontWeight: '700', textAlign: 'center', marginTop: '10px' }}>
                        {Title}
                    </Typography>
                </DialogTitle>
                <DividerContainer>
                    <Divider orientation="horizontal" flexItem />
                </DividerContainer>
                <DialogContent>
                    <Box>
                        <div>
                            <Typography style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '14px', marginTop: '16px' }}>
                                {Body}
                            </Typography>
                            <Typography style={{ textAlign: 'center', color: '#828282', fontSize: '14px', marginTop: '16px', marginBottom: '24px' }}>
                                {subBody}
                            </Typography>
                        </div>
                    </Box>
                </DialogContent>
                <DialogActions sx={{ padding: '0 24px 24px 24px ' }}>
                    <ButtonsContainer>
                        {batalkanButton}
                        {SelesaiButton}
                    </ButtonsContainer>
                </DialogActions>
            </Dialog>
        </FormGroup>
    );
}

import React from 'react';
import { Typography } from '@mui/material';

const Header = ({ title, padding }) => {
    const headerStyle = {
        width: '100%',
        height: 'fit-content', // Hug (64px) is equivalent to fit-content in this context
        justifyContent: 'space-between',
        display: 'flex',
        backgroundColor: '#fff',
        borderRadius: "12px",
        padding: padding ? padding : '0px' // Conditionally set padding
    };

    const titleStyle = {
        margin: 0, // Adjust the margin as needed
        fontSize: '24px',
        color: '#4F4F4F',
        alignItems: 'center',
        fontWeight: 'bold'
    };

    return (
        <div className="card" style={headerStyle}>
            <div style={{ display: 'flex' }}>
                <Typography style={titleStyle}>{title}</Typography>
            </div>
        </div>
    );
};

export default Header;

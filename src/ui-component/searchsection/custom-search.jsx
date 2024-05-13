import { useEffect, useState } from 'react';
import { useTheme, styled } from '@mui/material/styles';
import { Box, InputAdornment, OutlinedInput } from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';
import { shouldForwardProp } from '@mui/system';

const OutlineInputStyle = styled(OutlinedInput, { shouldForwardProp })(({ theme }) => ({
  width: '100%',
  paddingLeft: 16,
  paddingRight: 16,
  background: '#FFFFFF',
  '& input': {
    background: '#FFFFFF',
    height: '24px'
  },
  '& input::placeholder': {
    fontFamily: 'Roboto',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '20px',
    letterSpacing: '0.5px',
    textAlign: 'left',
  },
  [theme.breakpoints.down('lg')]: {
    width: 250
  },
  [theme.breakpoints.down('md')]: {
    width: '100%',
    marginLeft: 4,
    background: '#fff'
  }
}));


// ==============================|| SEARCH INPUT ||============================== //

const CustomSearch = ({
    field, // list value dari kolom yang mau dicari
    label, // tulisan yang ada di box searchnya
    onSearch, // Function to handle real-time filtering
    value, // Current value of the input
    resetInput // Function to reset the input value
}) => {

    const [searchTerm, setSearchTerm] = useState(null);

    const handleInputChange = (event) => {
        const value = event.target.value;
        onSearch(value); // Call the filtering function with the current search term
    };

    useEffect(() => {
        // Set input value when the value prop changes
        setSearchTerm(value);
    }, [value]);

    return (
        <>
            <Box style={{ display: { xs: 'none', md: 'block' }, width: '100%' }}>
                <OutlineInputStyle
                    id={field}
                    placeholder={label}
                    startAdornment={
                        <InputAdornment position="start">
                            <SearchOutlined stroke={1.5} size="1rem" color='#828282'/>
                        </InputAdornment>
                    }
                    value={searchTerm}
                    onChange={handleInputChange}
                />
            </Box>
        </>
    );
};


export default CustomSearch;

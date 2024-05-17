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
  [theme.breakpoints.down('md')]: {
    width: '100%',
    marginLeft: 4,
    background: '#fff'
  }
}));

const CustomSearch = ({
  field,
  label,
  onSearch,
  value,
  resetInput
}) => {
  const [searchTerm, setSearchTerm] = useState(null);

  const handleInputChange = (event) => {
    const value = event.target.value;
    onSearch(value);
  };

  useEffect(() => {
    setSearchTerm(value);
  }, [value]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <OutlineInputStyle
        id={field}
        placeholder={label}
        startAdornment={
          <InputAdornment position="start">
            <SearchOutlined stroke={1.5} size="1rem" color="#828282" />
          </InputAdornment>
        }
        value={searchTerm}
        onChange={handleInputChange}
<<<<<<< Updated upstream
        // autoFocus // Ensure the input field is focused
=======
>>>>>>> Stashed changes
      />
    </Box>
  );
};

export default CustomSearch;

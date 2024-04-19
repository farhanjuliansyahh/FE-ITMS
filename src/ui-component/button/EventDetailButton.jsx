// import * as React from 'react';
// import Button from '@mui/material/Button';
// import DeleteIcon from '@mui/icons-material/Delete';
// import SendIcon from '@mui/icons-material/Send';
// import Stack from '@mui/material/Stack';

// export default function EventDetailButton() {
//   return (
//     <Stack direction="row" spacing={2}>
//       <Button variant="outlined" startIcon={<DeleteIcon />}>
//         Delete
//       </Button>
//       <Button variant="outline" endIcon={<SendIcon />}>
//         Send
//       </Button>
//     </Stack>
//   );
// }
import React, { useState } from 'react';
import { InputBase, IconButton, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const EventDetailSearchButton = ({ placeHolder }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    // Handle search logic here
    console.log('Searching for:', searchTerm);
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Paper component="form" variant="outlined" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}>
      <IconButton type="submit" sx={{ p: '10px' }} onClick={handleSearch}>
        <SearchIcon />
      </IconButton>
      <InputBase
        sx={{ flex: 1 }}
        placeholder={placeHolder}
        inputProps={{ 'aria-label': 'search' }}
        value={searchTerm}
        onChange={handleInputChange}
      />
    </Paper>
  );
};

export default EventDetailSearchButton;
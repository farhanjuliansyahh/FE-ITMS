// import React from 'react';
// import { Typography, Button } from '@mui/material';
// import { ArrowForwardOutlined } from '@mui/icons-material';

// function CheckDataAlert() {
//     return (
//         <div style={{ display: 'block', backgroundColor: '#FFF6E9', borderRadius: '12px', padding: '24px', gap: '12px' }}>
//             <Typography fontWeight={600} fontSize={16} color={'#FFA726'}>
//                 Perhatian
//             </Typography>
//             <Typography fontWeight={600} fontSize={14}>
//                 Jika data di bawah ini ada yang tidak sesuai, silakan ubah melalui SIM SDM PosIND
//             </Typography>
//             <Typography fontWeight={400} fontSize={12} color={'#828282'} marginTop={2} marginBottom={2}>
//                 Mohon periksa kembali agar menghindari kesalahan data di sistem ITMS Nova
//             </Typography>
//             <Button
//                 sx={{
//                     padding: '6px 16px',
//                     borderRadius: '12px',
//                     color: '#FFFFFF',
//                     backgroundColor: '#EF4123',
//                     '&:hover': {
//                         backgroundColor: '#AB1D05', // Change color on hover if needed
//                     },
//                 }}
//                 endIcon={<ArrowForwardOutlined />}
//             >
//                 SIM SDM PosIND
//             </Button>
//         </div>
//     );
// }

// export default CheckDataAlert;


import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function AccordionExpandDefault() {
  return (
    <div style={{ display: 'block', borderRadius: '12px', padding: '12px', gap: '16px', borderColor: '#E0E0E0', border: '1px solid #E0E0E0'}}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography>Expanded by default</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

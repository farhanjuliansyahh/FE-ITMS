import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Avatar } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function AccordionKaryawan( {summary, icon}) {
    const theme = useTheme();
    const IconComponent = icon;

    const BoxAvatar = styled(Avatar)({
        ...theme.typography.commonAvatar,
        ...theme.typography.largeAvatar,
        backgroundColor: '#F5F8FF',
        color: '#1C2D5A',
        width: 48,
        height: 48,
        borderRadius: 48,
        '& svg': {
          fontSize: '2rem',
        },
    }); 

    const FlexContainer = styled('div')({
        display: 'flex',
        alignItems: 'center',
        gap: '16px', 
      });

  return (
    <div style={{ display: 'block', borderRadius: '12px', padding: '12px', gap: '16px', borderColor: '#E0E0E0', border: '1px solid #E0E0E0', marginTop: '16px'}}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
        >
            <FlexContainer>
                <BoxAvatar variant="rounded">
                        <IconComponent />
                </BoxAvatar>
                <Typography
                    fontSize={16}
                    fontWeight={600}>
                    {summary}
                </Typography>
            </FlexContainer>
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
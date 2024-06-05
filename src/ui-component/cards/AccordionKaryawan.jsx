import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Typography } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';

export default function AccordionKaryawan({ summary, icon, content, disabled }) {
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
    <div style={{ display: 'block', borderRadius: '12px', padding: '12px', gap: '16px', border: '1px solid #E0E0E0', marginTop: '16px' }}>
      <Accordion disabled={disabled}>
        <AccordionSummary
          expandIcon={<ExpandMore />}
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
          {content}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

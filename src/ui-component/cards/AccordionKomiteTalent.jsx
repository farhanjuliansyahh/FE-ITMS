import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Typography } from '@mui/material';
import { ExpandMore, Person } from '@mui/icons-material';

export default function AccordionKomiteTalent({ title, subtitle, icon, content }) {
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

  const SubtitleContainer = styled('div')({
    display: 'flex',
    alignItems: 'flex-start',
    gap: '8px',
    verticalAlign: 'center'
  });

  const BoxContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  });

  return (
    <div style={{ display: 'block', borderRadius: '12px', padding: '12px', gap: '16px', border: '1px solid #E0E0E0', marginBottom: '16px' }}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
        >
          <FlexContainer>
            <BoxAvatar variant="rounded">
              <IconComponent />
            </BoxAvatar>
            <BoxContainer>
                <Typography fontSize={16} fontWeight={600}> 
                    {title}
                </Typography>
                <SubtitleContainer>
                    <Person style={{ color: '#828282', width: '16px', height: '16px' }} />
                    <Typography fontSize={14} fontWeight={400} color={'#828282'}>
                        {subtitle}
                    </Typography>
                </SubtitleContainer>
            </BoxContainer>
          </FlexContainer>
        </AccordionSummary>
        <AccordionDetails>
          {content}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

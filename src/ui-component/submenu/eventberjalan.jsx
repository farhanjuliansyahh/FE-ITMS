import * as React from 'react';
import { useEffect, useState } from 'react';
import { Avatar, Box, Button, Container, Grid, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import EventIcon from '@mui/icons-material/Event';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import KonfirmasiEvent from '../modal/konfirmasi-event';
import HapusEvent from '../modal/hapusevent';
import EditEvent from '../modal/edit-event';

const steps = ['Talent Source', 'Talent Profile', 'Talent Qualification', 'Talent Days', 'Talent Cluster', 'Talent Pool'];

export default function EventBerjalan({
  id,
  nama_event,
  ketua,
  deskripsi,
  tipe_komite_talent,
  kode_rumpun,
  nama_rumpun_jabatan,
  kuota,
  tanggal_selesai,
  tanggal_mulai,
  tanggal_mulai_real,
  tanggal_selesai_real,
  status,
  showHitungMundur,
  jobleve,
  setrefresh
}) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [daysLeft, setDaysLeft] = React.useState(null);
  const [isBeforeStart, setIsBeforeStart] = React.useState(false);

  const nama = nama_event;
  const quotaawal = kuota;
  const kodefam = kode_rumpun;
  const ketuakomite = ketua;
  const tipekomitetalent = tipe_komite_talent;

  let statusberjalan;
  if (status === 1) {
    statusberjalan = 'Belum Mulai';
  } else if (status >= 2 && status <= 7) {
    statusberjalan = 'Berlangsung';
  } else if (status === 8) {
    statusberjalan = 'Selesai';
  } else {
    // Handle other status values if needed
    statusberjalan = 'Unknown Status';
  }

  useEffect(() => {
    setActiveStep(status - 2);
  }, []);

  useEffect(() => {
    const currentDate = new Date();
    const startDate = new Date(tanggal_mulai);
    if (currentDate < startDate) {
      setIsBeforeStart(true);
    } else {
      setIsBeforeStart(false);
    }
  }, [tanggal_mulai]);

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep(status);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const boxStyle = {
    border: '1px solid #E0E0E0',
    padding: '20px',
    width: '100%',
    borderRadius: '12px'
  };

  const theme = useTheme();

  const FlexContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    paddingBottom: '24px'
  });

  const FlexTitle = styled('div')({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    paddingBottom: 0,
    '&:hover': {
      color: '#2196F3', // Ubah warna teks menjadi biru saat dihover
      // cursor: 'pointer' // Tambahkan cursor pointer saat dihover
    }
  });

  const BoxContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column'
  });

  const BoxAvatar = styled(Avatar)({
    ...theme.typography.commonAvatar,
    ...theme.typography.largeAvatar,
    backgroundColor: '#F5F8FF',
    color: '#1C2D5A',
    width: 48,
    height: 48,
    '&:hover': {
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' // Efek drop shadow saat pointer dihover
    },
    '& svg': {
      fontSize: '2rem'
    }
  });

  const [open, setOpen] = useState(false);
  const [openHapus, setOpenHapus] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpenHapus = () => {
    setOpenHapus(true);
  };
  const handleCloseHapus = () => {
    setOpenHapus(false);
  };

  const handleOpenEdit = () => {
    setOpenEdit(true);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const CalendarIcon = styled(EventIcon)({
    fontSize: '1rem',
    color: '#1C2D5A'
  });

  const statusColors = {
    1: { backgroundColor: '#FFEDED', color: '#F44336' }, // Belum Mulai
    2: { backgroundColor: '#EAF8FF', color: '#2196F3' }, // Berlangsung
    3: { backgroundColor: '#EAF8FF', color: '#2196F3' }, // Berlangsung
    4: { backgroundColor: '#EAF8FF', color: '#2196F3' }, // Berlangsung
    5: { backgroundColor: '#EAF8FF', color: '#2196F3' },
    6: { backgroundColor: '#EAF8FF', color: '#2196F3' }, // Berlangsung
    7: { backgroundColor: '#EAF8FF', color: '#2196F3' },
    8: { backgroundColor: '#F5FFF5', color: '#66BB6A' } // Selesai
  };

  const { backgroundColor, color } = statusColors[status] || {};

  const StatusLabel = styled('div')(({ backgroundColor, color }) => ({
    backgroundColor: backgroundColor,
    color: color,
    padding: '4px 8px',
    borderRadius: '16px',
    fontWeight: 600,
    fontSize: '12px'
  }));

  const editButtonStyle = {
    border: '1px solid #000',
    color: '#1C2D5A',
    borderRadius: '12px',
    paddingLeft: '12px',
    paddingRight: '12px'
  };

  const deleteButtonStyle = {
    border: '1px solid #EF4123',
    color: '#EF4123',
    borderRadius: '12px',
    paddingLeft: '12px',
    paddingRight: '12px'
  };

  const mulaiButtonStyle = {
    backgroundColor: '#EF4123',
    color: '#fff',
    boxShadow: 'none',
    borderRadius: '12px',
    paddingLeft: '12px',
    paddingRight: '12px',
    ':hover': {
      backgroundColor: '#AB1D05',
      color: '#fff'
    }
  };

  const ButtonsContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  });

  const editButton = (
    <Button sx={editButtonStyle} endIcon={<EditIcon />} onClick={handleOpenEdit}>
      Edit
    </Button>
  );

  const deleteButton = (
    <Button sx={deleteButtonStyle} endIcon={<DeleteIcon />} onClick={handleOpenHapus}>
      Hapus
    </Button>
  );

  const mulaiButton = (
    <Button variant="contained" sx={mulaiButtonStyle} endIcon={<ArrowForwardRoundedIcon />} onClick={handleOpen} disabled={isBeforeStart}>
      Mulai Event
    </Button>
  );

  const DividerContainer = styled('div')({
    width: '100%',
    textAlign: 'center',
    marginBottom: '16px'
  });

  const dividerStyle = {
    margin: '0 auto'
  };

  useEffect(() => {
    const endDate = new Date(tanggal_selesai);
    const currentDate = new Date();
    const timeDifference = endDate.getTime() - currentDate.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    setDaysLeft(daysDifference);
  }, [tanggal_selesai]);

  const jobleveString = jobleve.map((item) => item.level_jabatan).join(', ');

  const isRealEndDateBeforePlannedEndDate = new Date(tanggal_selesai_real) <= new Date(tanggal_selesai);

  return (
    <Box sx={boxStyle} style={{ marginBottom: '24px' }}>
      <FlexContainer>
        <Link
          to={{
            pathname: `/talent/detail-event/${id}`
          }}
          style={{ color: 'inherit', textDecoration: 'none' }}
        >
          <BoxAvatar variant="rounded">
            <EmojiEventsOutlinedIcon />
          </BoxAvatar>
        </Link>

        <BoxContainer>
          <FlexTitle style={{ paddingBottom: '8px' }}>
            {status !== 1 ? (
              <Typography
                style={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  textDecoration: 'none',
                  color: 'inherit'
                }}
              >
                <Link
                  to={{
                    pathname: `/talent/detail-event/${id}`
                  }}
                  style={{ color: 'inherit', textDecoration: 'none' }}
                >
                  {nama_event}
                </Link>
              </Typography>
            ) : (
              <Typography
                style={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: 'inherit',
                }}
              >
                {nama_event}
              </Typography>
            )}
            <StatusLabel backgroundColor={backgroundColor} color={color}>
              {statusberjalan}
            </StatusLabel>
          </FlexTitle>

          <FlexTitle>
            <CalendarIcon style={{ color: '#828282' }} />
            {status === 8 ? (
              <Typography style={{ color: isRealEndDateBeforePlannedEndDate ? '#66BB6A' : '#F44336', fontSize: '15px' }}>
                Realisasi : {' '}
                {new Date(tanggal_mulai_real).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}{' '}
                -{' '}
                {(() => {
                  const endDate = new Date(tanggal_selesai_real);
                  endDate.setDate(endDate.getDate());
                  return endDate.toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  });
                })()}
              </Typography>
            ) : (
              <Typography style={{ color: '#828282', fontSize: '15px' }}>
                {tanggal_mulai &&
                  new Date(tanggal_mulai).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}{' '}
                -{' '}
                {tanggal_selesai &&
                  new Date(tanggal_selesai).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
              </Typography>
            )}
          </FlexTitle>
        </BoxContainer>

        <div style={{ flex: '1' }}> </div>
        {status === 1 && (
          <ButtonsContainer>
            {mulaiButton}
            {editButton}
            {deleteButton}
          </ButtonsContainer>
        )}
      </FlexContainer>

      <DividerContainer>
        <Divider orientation="horizontal" flexItem sx={dividerStyle} />
      </DividerContainer>

      <Grid container spacing={2} style={{ paddingBottom: '24px' }}>
        <Grid item xs={12} md={3}>
          <Typography>Deskripsi</Typography>
          <Typography style={{ fontWeight: 'bold', wordWrap: 'break-word', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {deskripsi}
          </Typography>
        </Grid>

        <Grid item xs={12} md={3}>
          <Typography>Tipe</Typography>
          <Typography style={{ fontWeight: 'bold' }}>
            {tipe_komite_talent} ({jobleveString})
          </Typography>
        </Grid>

        <Grid item xs={12} md={2}>
          <Typography>Job Family</Typography>
          <Typography style={{ fontWeight: 'bold' }}>{nama_rumpun_jabatan}</Typography>
        </Grid>

        <Grid item xs={12} md={2}>
          <Typography>Batas Akhir Event</Typography>
          <Typography style={{ fontWeight: 'bold' }}>
            {tanggal_selesai &&
              new Date(tanggal_selesai).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
          </Typography>
        </Grid>

        {showHitungMundur && (
          <Grid item xs={12} md={2}>
            <Typography>Hitung Mundur</Typography>
            <Typography style={{ fontWeight: 'bold', color: '#F44336' }}>
              {daysLeft !== null && daysLeft > 0
                ? `${daysLeft} hari lagi`
                : daysLeft === 0
                  ? 'Hari Ini'
                  : `Terlewat ${Math.abs(daysLeft)} hari`}
            </Typography>
          </Grid>
        )}
      </Grid>

      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      <KonfirmasiEvent
        open={open}
        handleClose={handleClose}
        eventid={id}
        rumpun_jabatan={kode_rumpun}
        ketua={ketuakomite}
        tipekomitetalent={tipekomitetalent}
        mulai={tanggal_mulai}
        setrefresh={setrefresh}
      />
      <HapusEvent open={openHapus} handleClose={handleCloseHapus} eventid={id} setrefresh={setrefresh} />
      <EditEvent
        open={openEdit}
        handleClose={handleCloseEdit}
        eventid={id}
        nama={nama}
        jobfam={nama_rumpun_jabatan}
        koderumpun={kodefam}
        quotaawal={quotaawal}
        mulai={tanggal_mulai}
        selesai={tanggal_selesai}
        deskripsiawal={deskripsi}
        setrefresh={setrefresh}
      />
    </Box>
  );
}

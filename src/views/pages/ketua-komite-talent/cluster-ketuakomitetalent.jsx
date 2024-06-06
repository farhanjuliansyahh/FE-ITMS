import * as React from 'react';
import { Box, Button, Divider, Typography, Stack } from '@mui/material';
import { CalendarMonthOutlined, RestartAltOutlined, Search } from '@mui/icons-material';
import { IconFileDownload } from '@tabler/icons-react';

import MainCard from '../../../ui-component/cards/MainCard';
import MatrixNineBox from '../../../ui-component/submenu/matrixninebox';
import { useParams } from 'react-router';
import ButtonPrimary from '../../../ui-component/button/ButtonPrimary';
import TalentClusterKetuaKomiteTalentTable from '../../../ui-component/tables/talentclusterketuakomitetalent';
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import CustomSearch from '../../../ui-component/searchsection/custom-search';
import ButtonErrorOutlined from '../../../ui-component/button/ButtonErrorOutlined';
import.meta.env.VITE_API_BASE_URL

export default function ClusterKetuaKomiteTalent() {
  const { id } = useParams();
  const [value, setValue] = React.useState(0);
  const [eventaktif, seteventaktif] = useState([]);
  const [DaysLeft, setDaysLeft] = useState('');
  const [clusterRow, setclusterRow] = useState([]);
  const [categoryCounts, setCategoryCounts] = useState({});
  const [refreshstate, setrefreshstate] = useState(false);
  const [kuota, setkuota] = useState('');
  const url = import.meta.env.VITE_API_BASE_URL

  const fetcheventdetail = () => {
    return fetch(url + `getoneevent?id=${id}`) // Replace with your actual endpoint
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        return data; // Return the parsed JSON data
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        throw error; // Rethrow the error to handle it elsewhere
      });
  };

  useEffect(() => {
    fetcheventdetail()
      .then((data) => {
        seteventaktif(data.event);
        setLoading(false); // Move this line to the end of the .then block
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const {
    eventid,
    nama_event,
    deskripsi,
    tipe_komite_talent,
    tipekomite,
    kode_rumpun,
    nama_rumpun,
    tanggal_mulai,
    tanggal_selesai,
    evenstatus_id
  } = eventaktif;

  useEffect(() => {
    // Convert 'tanggal_selesai' from ISO 8601 format to a Date object
    const endDate = new Date(tanggal_selesai);
    // Get the current date
    const currentDate = new Date();
    // Calculate the difference in milliseconds between the current date and the 'tanggal_selesai'
    const timeDifference = endDate.getTime() - currentDate.getTime();
    // Convert the difference from milliseconds to days
    const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    // Set the number of days left
    setDaysLeft(daysDifference);
  }, [tanggal_selesai]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const eventidactive = eventid;

  const boxStyle = {
    padding: '20px',
    width: '100%',
    borderRadius: '12px',
    marginBottom: '-16px'
  };

  const FlexContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    paddingBottom: '24px'
  });

  const BoxContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column'
  });

  const FlexTitle = styled('div')({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    paddingBottom: 0
  });

  const CalendarIcon = styled(CalendarMonthOutlined)({
    fontSize: '1rem',
    color: '#1C2D5A'
  });

  const CountdownLabel = styled('div')({
    backgroundColor: '#FFEDED',
    color: '#F44336',
    padding: '8px 16px',
    borderRadius: '16px',
    fontWeight: 600,
    fontSize: '16px'
  });

  const DividerContainer = styled('div')({
    width: '100%',
    textAlign: 'center',
    marginBottom: '16px'
  });

  const dividerStyle = {
    margin: '0 auto'
  };

  const handlerefresh = () => {
    setrefreshstate(true);
  };
  
  useEffect(() => {
    // Fetch data from API
    fetch(url + `getclustertable?eventtalentid=${id}`)
      .then((response) => response.json())
      .then((datacluster) => {
        // Update state with API data
        setclusterRow(datacluster.map((row, index) => ({ ...row, id: index + 1 })));

        // Count categories
        const counts = datacluster.reduce((acc, row) => {
          const category = row['Matriks Kategori Akhir'];
          acc[category] = (acc[category] || 0) + 1;
          return acc;
        }, {});

        setCategoryCounts(counts);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
    setrefreshstate(false);
  }, [refreshstate]);

  useEffect(() => {
    // Fetch data from API
    fetch(url + `getparameterkuota?id=2`)
      .then((response) => response.json())
      .then((data) => {
        // Initialize rows based on fetched score data
        const kuota = data['kuota'] || 0;
        // Set the initial values from the fetched data
        setkuota(kuota);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array to run effect only once

  const countSelected = () => {
    // Filter rows where "Kategori Matrix Awal" is not equal to "Kategori Matrix Akhir"
    const filteredRows = clusterRow.filter((row) => row['Matriks Kategori Awal'] !== row['Matriks Kategori Akhir']);
    // Count the filtered rows
    const count = filteredRows.length;
    return count;
  };

  const selected = countSelected();

  const totalRows = clusterRow.length;

  const halfLength = Math.ceil((totalRows * kuota) / 100);
  const isDiskresiDone = selected >= halfLength || evenstatus_id !== 6;

  const listNama = [...new Set(clusterRow.map((row) => row.nama))];
  const listNippos = [...new Set(clusterRow.map((row) => row.nippos))];
  const listJobLevel = [...new Set(clusterRow.map((row) => row['Job Level']))];
  const listKategoriMatrix = [...new Set(clusterRow.map((row) => row['Matriks Kategori Akhir']))];

  const [selectedNama, setSelectedNama] = useState(null);
  const [selectedNippos, setSelectedNippos] = useState(null);
  const [selectedJobLevel, setSelectedJobLevel] = useState(null);
  const [selectedKategoriMatrix, setSelectedKategoriMatrix] = useState(null);

  const resetNamaInput = () => {
    setSelectedNama('');
  };

  const resetNipposInput = () => {
    setSelectedNippos('');
  };

  const resetJobLevelInput = () => {
    setSelectedJobLevel('');
  };

  const resetKategoriMatrixInput = () => {
    setSelectedKategoriMatrix('');
  };

  const handleResetSearch = () => {
    resetNamaInput();
    resetNipposInput();
    resetJobLevelInput();
    resetKategoriMatrixInput();
  };

  const filteredRows = clusterRow.filter((row) => {
    const namaMatch = !selectedNama || (row.nama && row.nama.toLowerCase().includes(selectedNama.toLowerCase())); // Add null check for row.nama
    const nipposMatch = !selectedNippos || (row.nippos && row.nippos.toLowerCase().includes(selectedNippos.toLowerCase())); // Add null check for row.nippos
    const jobLevelMatch =
      !selectedJobLevel || (row['Job Level'] && row['Job Level'].toLowerCase().includes(selectedJobLevel.toLowerCase())); // Add null check for row.nippos
    const KategoriMatrixMatch =
      !selectedKategoriMatrix ||
      (row['Matriks Kategori Akhir'] && row['Matriks Kategori Akhir'].toLowerCase().includes(selectedKategoriMatrix.toLowerCase())); // Add null check for row.nippos

    return namaMatch && nipposMatch && jobLevelMatch && KategoriMatrixMatch;
  });

  const resetRowIndex = (filteredRows) => {
    return filteredRows.map((row, index) => ({
      ...row,
      id: index + 1 // Adding 1 to start the index from 1 instead of 0
    }));
  };

  const resetRows = resetRowIndex(filteredRows);

  const handleDownloadCSV = () => {
    let dataToDownload = [];
    let filename = '';

    dataToDownload = resetRows;
    filename = `Kandidat_Talent_${id}.csv`;

    // Create a CSV header with column names
    const headers = Object.keys(dataToDownload[0]);
    const idIndex = headers.indexOf('id');
    if (idIndex !== -1) {
      headers.splice(idIndex, 1); // Remove 'id' from headers
      headers.unshift('id'); // Insert 'id' at the beginning
    }
    const headerRow = headers.join(',');

    // Convert data to CSV format
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      headerRow +
      '\n' +
      dataToDownload.map((row) => headers.map((header) => row[header]).join(',')).join('\n');

    // Create a temporary anchor element
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', filename);
    document.body.appendChild(link);

    // Trigger the download
    link.click();

    // Clean up
    document.body.removeChild(link);
  };

  return (
    <MainCard>
      <Box sx={boxStyle}>
        <FlexContainer>
          <BoxContainer>
            <FlexTitle style={{ paddingBottom: '8px' }}>
              <Typography style={{ fontSize: '24px', fontWeight: 'bold' }}>{nama_event}</Typography>
            </FlexTitle>

            <FlexTitle>
              <CalendarIcon style={{ color: '#828282' }} />
              <Typography style={{ fontSize: '14px', color: '#828282' }}>
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
            </FlexTitle>
          </BoxContainer>

          <div style={{ flex: '1' }}> </div>

          {evenstatus_id !== 8 && <CountdownLabel>{DaysLeft !== null && DaysLeft > 0
                ? `${DaysLeft} hari lagi`
                : DaysLeft === 0
                  ? 'Hari Ini'
                  : `Terlewat ${Math.abs(DaysLeft)} hari`}</CountdownLabel>}
        </FlexContainer>
      </Box>

      <DividerContainer>
        <Divider orientation="horizontal" flexItem sx={dividerStyle} />
      </DividerContainer>

      <MatrixNineBox eventid={id} totalrows={totalRows} />

      <Box paddingLeft={3} paddingRight={3} paddingBottom={3} marginTop={3}>
        <FlexContainer>
          <Typography style={{ fontSize: '24px', fontWeight: 'bold' }} gutterBottom>
            Tabel Karyawan
          </Typography>
          <Button
            variant="contained"
            style={{ color: '#2196F3', borderRadius: '15px', borderColor: '#EAF8FF', backgroundColor: '#EAF8FF', boxShadow: 'none' }}
          >
            sudah dilakukan diskresi kepada {selected}/{halfLength} Karyawan
          </Button>
          <div style={{ flex: '1' }}> </div>
          <ButtonPrimary Color="#ffffff" icon={IconFileDownload} LabelName={'Unduh Data'} onClick={handleDownloadCSV} />
        </FlexContainer>

        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingBottom: '16px', width: '100%' }}>
          <Stack direction="row" spacing={2} marginRight={2} width={'100%'}>
            <CustomSearch field={listNama} label={'Nama'} onSearch={setSelectedNama} value={selectedNama} resetInput={resetNamaInput} />
            <CustomSearch
              field={listNippos}
              label={'Nippos'}
              onSearch={setSelectedNippos}
              value={selectedNippos}
              resetInput={resetNipposInput}
            />
            <CustomSearch
              field={listJobLevel}
              label={'Job Level'}
              onSearch={setSelectedJobLevel}
              value={selectedJobLevel}
              resetInput={resetJobLevelInput}
            />
            <CustomSearch
              field={listKategoriMatrix}
              label={'Kategori Matrix'}
              onSearch={setSelectedKategoriMatrix}
              value={selectedKategoriMatrix}
              resetInput={resetKategoriMatrixInput}
            />
          </Stack>
          <ButtonErrorOutlined onClick={handleResetSearch} Color="#D32F2F" icon={RestartAltOutlined} LabelName={'Reset'} />
        </div>

        <TalentClusterKetuaKomiteTalentTable
          eventid={id}
          rows={resetRows}
          counts={categoryCounts}
          onTableDataRefresh={handlerefresh}
          disabled={isDiskresiDone}
          terpilih = {selected}
          kuota     = {halfLength}
        />
      </Box>
    </MainCard>
  );
}

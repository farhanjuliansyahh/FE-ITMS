import * as React from 'react';
import { useEffect, useState } from 'react';
import { Box, Button, Grid, Stack, Tab, Tabs, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import PropTypes from 'prop-types';
import MainCard from '../cards/MainCard.jsx';
import AddEventModal from '../modal/TambahEvent.jsx';
import TalentPoolTable from '../tables/talentpool.jsx';
import { IconFileDownload } from '@tabler/icons-react';
import ButtonPrimary from '../button/ButtonPrimary.jsx';
import LabelInfo from '../../ui-component/label/label-info.jsx';
import { RestartAltOutlined } from '@mui/icons-material';
import CustomSearch from '../searchsection/custom-search.jsx';
import ButtonErrorOutlined from '../button/ButtonErrorOutlined.jsx';
import.meta.env.VITE_API_BASE_URL

// ==============================|| DAFTAR EVENT PAGE ||============================== //

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && (
        <Box sx={{ pt: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

const TalentPool = ({ eventid, eventstatus_id, nama_event }) => {
  const [isLoading, setLoading] = useState(true);
  const [value, setValue] = React.useState(0);
  const [filterNama, setFilterNama] = useState('');
  const [filterNippos, setFilterNippos] = useState('');
  const [filterJob, setFilterJob] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [poolrow, setpool] = useState([]);
  const [refreshstate, setrefreshstate] = useState([false]);
  const url = import.meta.env.VITE_API_BASE_URL

  const eventidactive = eventid;
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const gettalentpool = () => {
    fetch(url + `gettalentpool?eventtalentid=${eventidactive}`)
      .then((response) => response.json())
      .then((data) => {
        // Update state with API data
        setpool(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const [refresh, setrefresh] = useState(true);
  useEffect(() => {
    if (refresh) {
      gettalentpool();
      setrefresh(false);
    }
  }, [refresh]);

  // useEffect(() => {
  //   // Fetch data from API
  //   gettalentpool();
  //   setrefreshstate(true);
  // }, []);

  const handlerefresh = () => {
    gettalentpool();
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const FlexContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    paddingBottom: '24px'
  });

  // TALENT POOL
  const listNamaTrue = [...new Set(poolrow.map((row) => row.Nama))];
  const listNipposTrue = [...new Set(poolrow.map((row) => row.Nippos))];
  const listJobLevelTrue = [...new Set(poolrow.map((row) => row['Job Level']))];
  const listStatusTrue = [...new Set(poolrow.map((row) => row['Status']))];

  const [selectedNamaTrue, setSelectedNamaTrue] = useState(null);
  const [selectedNipposTrue, setSelectedNipposTrue] = useState(null);
  const [selectedJobLevelTrue, setSelectedJobLevelTrue] = useState(null);
  const [selectedStatusTrue, setSelectedStatusTrue] = useState(null);

  const resetNamaInputTrue = () => {
    setSelectedNamaTrue('');
  };

  const resetNipposInputTrue = () => {
    setSelectedNipposTrue('');
  };

  const resetJobLevelInputTrue = () => {
    setSelectedJobLevelTrue('');
  };

  const resetStatusInputTrue = () => {
    setSelectedStatusTrue('');
  };

  const handleResetSearchTrue = () => {
    resetNamaInputTrue();
    resetNipposInputTrue();
    resetJobLevelInputTrue();
    resetStatusInputTrue();
  };

  const filteredRowsTrue = poolrow.filter((row) => {
    const namaMatchTrue = !selectedNamaTrue || (row.Nama && row.Nama.toLowerCase().includes(selectedNamaTrue.toLowerCase()));
    const nipposMatchTrue = !selectedNipposTrue || (row.Nippos && row.Nippos.toLowerCase().includes(selectedNipposTrue.toLowerCase()));
    const jobLevelMatchTrue =
      !selectedJobLevelTrue || (row['Job Level'] && row['Job Level'].toLowerCase().includes(selectedJobLevelTrue.toLowerCase()));
    const statusMatchTrue =
      !selectedStatusTrue || (row['Status'] && row['Status'].toLowerCase().includes(selectedStatusTrue.toLowerCase()));

    return namaMatchTrue && nipposMatchTrue && jobLevelMatchTrue && statusMatchTrue;
  });

  const resetRowIndexTrue = (filteredRowsTrue) => {
    return filteredRowsTrue.map((row, index) => ({
      ...row,
      id: index + 1 // Adding 1 to start the index from 1 instead of 0
    }));
  };

  const resetRowsTrue = resetRowIndexTrue(filteredRowsTrue);

  const poolLength = poolrow.length;

  const handleDownloadCSV = () => {
    let dataToDownload = [];
    let filename = '';

    dataToDownload = resetRowsTrue;
    filename = `${nama_event}_Talent Pool.csv`;

    // Specify the columns to include in the CSV, adding 'No' as the first column
    const includedData = [
      'No', 'Nama', 'Nippos', 'Posisi', 'Job Level',
      'Rumpun Jabatan', 'Nama Kantor', 'Kategori Matrix Akhir', 'Status'
    ];

    // Create a CSV header with the included column names
    const headerNames = [
      'No', 'Nama', 'NIPPOS', 'Posisi', 'Job Level',
      'Rumpun Jabatan', 'Kantor', 'Kategori Matrix Akhir', 'Status'
    ];
    const headerRow = headerNames.join(';');

    // Filter the data to include only the specified columns and add 'No' column
    const filteredData = dataToDownload.map((row, index) => {
      const filteredRow = { No: index + 1 }; // Add 'No' column starting from 1
      includedData.slice(1).forEach(column => {
        filteredRow[column] = row[column];
      });
      return filteredRow;
    });

    // Convert data to CSV format
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      headerRow +
      '\n' +
      filteredData.map(row => includedData.map(column => row[column]).join(';')).join('\n');

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

  // ambil data kuota talent pool
  const [eventaktif, seteventaktif] = useState([]);

  const fetcheventdetail = () => {
    return fetch(url + `getoneevent?id=${eventid}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        throw error;
      });
  };

  useEffect(() => {
    fetcheventdetail()
      .then((data) => {
        seteventaktif(data.event);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <>
      {/* <MainLayout /> */}

      <MainCard>
        <Box paddingTop={3} paddingLeft={3} paddingRight={3} paddingBottom={3}>
          <FlexContainer>
            <Typography style={{ fontSize: '24px', fontWeight: 'bold' }} gutterBottom>
              Tabel Karyawan
            </Typography>

            <LabelInfo length={poolLength} kuota={eventaktif.kuota} />

            <div style={{ flex: '1' }}> </div>

            <ButtonPrimary Color="#ffffff" icon={IconFileDownload} LabelName={'Unduh Data'} onClick={handleDownloadCSV} />
          </FlexContainer>

          <div style={{ display: 'flex', justifyContent: 'flex-end', paddingBottom: '16px', width: '100%' }}>
            <Stack direction="row" spacing={2} marginRight={2} width={'100%'}>
              <CustomSearch
                field={listNamaTrue}
                label={'Nama'}
                onSearch={setSelectedNamaTrue}
                value={selectedNamaTrue}
                resetInput={resetNamaInputTrue}
              />
              <CustomSearch
                field={listNipposTrue}
                label={'Nippos'}
                onSearch={setSelectedNipposTrue}
                value={selectedNipposTrue}
                resetInput={resetNipposInputTrue}
              />
              <CustomSearch
                field={listJobLevelTrue}
                label={'Job Level'}
                onSearch={setSelectedJobLevelTrue}
                value={selectedJobLevelTrue}
                resetInput={resetJobLevelInputTrue}
              />
              <CustomSearch
                field={listStatusTrue}
                label={'Status'}
                onSearch={setSelectedStatusTrue}
                value={selectedStatusTrue}
                resetInput={resetStatusInputTrue}
              />
            </Stack>
            <ButtonErrorOutlined onClick={handleResetSearchTrue} Color="#D32F2F" icon={RestartAltOutlined} LabelName={'Reset'} />
          </div>

          <TalentPoolTable
            rows={resetRowsTrue}
            eventid={eventidactive}
            updaterows={handlerefresh}
            eventstatus_id={eventstatus_id}
            setrefresh={setrefresh}
            initialDataLength={poolLength}
          />
        </Box>
      </MainCard>
    </>
  );
};

export default TalentPool;

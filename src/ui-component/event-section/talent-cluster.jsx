import * as React from 'react';
import { useEffect, useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import MainCard from '../cards/MainCard.jsx';
import { IconFileDownload } from '@tabler/icons-react';
import { RestartAltOutlined } from '@mui/icons-material';
import ButtonPrimary from '../button/ButtonPrimary.jsx';
import MatrixNineBox from '../submenu/matrixninebox.jsx';
import TalentClusterTable from '../tables/talentcluster.jsx';
import CustomSearch from '../searchsection/custom-search.jsx';
import ButtonErrorOutlined from '../button/ButtonErrorOutlined.jsx';
import.meta.env.VITE_API_BASE_URL

// ==============================|| TALENT CLUSTER PAGE ||============================== //

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
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
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const TalentCluster = ({ eventid }) => {
  const [isLoading, setLoading] = useState(true);
  const [value, setValue] = React.useState(0);
  const [clusterRow, setclusterRow] = useState([])
  const [categoryCounts, setCategoryCounts] = useState({});
  const url = import.meta.env.VITE_API_BASE_URL
  const eventidactive = eventid

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    // Fetch data from API
    fetch(url + `getclustertable?eventtalentid=${eventidactive}`)
      .then(response => response.json())
      .then(datacluster => {
        // Update state with API data
        setclusterRow(datacluster.map((row, index) => ({ ...row, id: index + 1 })));

        // Count categories
        const counts = datacluster.reduce((acc, row) => {
          const category = row["Matriks Kategori Akhir"];
          acc[category] = (acc[category] || 0) + 1;
          return acc;
        }, {});

        setCategoryCounts(counts);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const totalRows = Object.values(categoryCounts).reduce((total, count) => total + count, 0);

  const FlexContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    paddingBottom: '24px',
  });

  // TABEL CLUSTER KARYAWAN
  const listNamaTrue = [...new Set(clusterRow.map(row => row.Nama))]
  const listNipposTrue = [...new Set(clusterRow.map(row => row.Nippos))];
  const listJobLevelTrue = [...new Set(clusterRow.map(row => row['Job Level']))];
  const listKategoriMatrixTrue = [...new Set(clusterRow.map(row => row['Matriks Kategori Akhir']))];

  const [selectedNamaTrue, setSelectedNamaTrue] = useState(null);
  const [selectedNipposTrue, setSelectedNipposTrue] = useState(null);
  const [selectedJobLevelTrue, setSelectedJobLevelTrue] = useState(null);
  const [selectedKategoriMatrixTrue, setSelectedKategoriMatrixTrue] = useState(null);

  const resetNamaInputTrue = () => {
    setSelectedNamaTrue('');
  };

  const resetNipposInputTrue = () => {
    setSelectedNipposTrue('');
  };

  const resetJobLevelInputTrue = () => {
    setSelectedJobLevelTrue('');
  };

  const resetKategoriMatrixInputTrue = () => {
    setSelectedKategoriMatrixTrue('');
  };

  const handleResetSearchTrue = () => {
    resetNamaInputTrue();
    resetNipposInputTrue();
    resetJobLevelInputTrue();
    resetKategoriMatrixInputTrue();
  };


  const filteredRowsTrue = clusterRow.filter((row) => {
    const namaMatchTrue = !selectedNamaTrue || (row.nama && row.nama.toLowerCase().includes(selectedNamaTrue.toLowerCase())); // Add null check for row.nama
    const nipposMatchTrue = !selectedNipposTrue || (row.nippos && row.nippos.toLowerCase().includes(selectedNipposTrue.toLowerCase()));
    const jobLevelMatchTrue = !selectedJobLevelTrue || (row['Job Level'] && row['Job Level'].toLowerCase().includes(selectedJobLevelTrue.toLowerCase()));
    const KategoriMatrixMatchTrue = !selectedKategoriMatrixTrue || (row['Matriks Kategori Akhir'] && row['Matriks Kategori Akhir'].toLowerCase().includes(selectedKategoriMatrixTrue.toLowerCase()));

    return namaMatchTrue
      && nipposMatchTrue
      && jobLevelMatchTrue
      && KategoriMatrixMatchTrue;
  });

  const resetRowIndexTrue = (filteredRowsTrue) => {
    return filteredRowsTrue.map((row, index) => ({
      ...row,
      id: index + 1,
    }));
  };

  const resetRowsTrue = resetRowIndexTrue(filteredRowsTrue);

  const handleDownloadCSV = () => {
    let dataToDownload = [];
    let filename = '';

    dataToDownload = resetRowsTrue;
    filename = `Talent_Cluster_Karyawan_${eventid}.csv`;

    // Specify the columns to include in the CSV, adding 'No' as the first column
    const includedData = [
      'No', 'nama', 'nippos', 'Posisi', 'Job Level',
      'Rumpun Jabatan', 'Nama Kantor', 'Komite Unit', 
      'Matriks Kategori Awal', 'Matriks Kategori Akhir',
      'status', 'reason'
    ];

    // Create a CSV header with the included column names
    const headerNames = [
      'No', 'Nama', 'NIPPOS', 'Posisi', 'Job Level', 
      'Rumpun Jabatan', 'Kantor', 'Komite Unit', 
      'Kategori Matrix Awal', 'Kategori Matrix Akhir', 
      'Status', 'Alasan Perubahan'
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

  return (
    <>
      {/* <MainLayout /> */}

      <MainCard>

        <MatrixNineBox eventid={eventidactive} totalrows={totalRows} />

        <Box paddingLeft={3} paddingRight={3} paddingBottom={3} marginTop={3}>

          <FlexContainer>
            <Typography style={{ fontSize: '24px', fontWeight: 'bold' }} gutterBottom>
              Tabel Karyawan
            </Typography>
            <div style={{ flex: '1' }}> </div>
            <ButtonPrimary Color="#ffffff" icon={IconFileDownload} LabelName={'Unduh Data'} onClick={handleDownloadCSV} />
          </FlexContainer>

          <div style={{ display: 'flex', justifyContent: 'flex-end', paddingBottom: '16px', width: '100%' }}>
            <Stack direction="row" spacing={2} marginRight={2} width={'100%'}>
              <CustomSearch field={listNamaTrue} label={'Nama'} onSearch={setSelectedNamaTrue} value={selectedNamaTrue} resetInput={resetNamaInputTrue} />
              <CustomSearch field={listNipposTrue} label={'Nippos'} onSearch={setSelectedNipposTrue} value={selectedNipposTrue} resetInput={resetNipposInputTrue} />
              <CustomSearch field={listJobLevelTrue} label={'Job Level'} onSearch={setSelectedJobLevelTrue} value={selectedJobLevelTrue} resetInput={resetJobLevelInputTrue} />
              <CustomSearch field={listKategoriMatrixTrue} label={'Kategori Matrix'} onSearch={setSelectedKategoriMatrixTrue} value={selectedKategoriMatrixTrue} resetInput={resetKategoriMatrixInputTrue} />
            </Stack>
            <ButtonErrorOutlined onClick={handleResetSearchTrue} Color="#D32F2F" icon={RestartAltOutlined} LabelName={'Reset'} />
          </div>

          <TalentClusterTable
            rows={resetRowsTrue}
            counts={categoryCounts}
            initialDataLength={clusterRow.length}
          />
        </Box>

      </MainCard>
    </>
  );
};

export default TalentCluster;
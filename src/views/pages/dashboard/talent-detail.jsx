import { useEffect, useState } from 'react';
import { Grid, Stack } from '@mui/material';
import { gridSpacing } from '../../../store/constant';
import { RestartAltOutlined, FileDownloadOutlined } from '@mui/icons-material';
import Header from '../../../ui-component/header/header';
import MainCard from '../../../ui-component/cards/MainCard';
import DetailTalentTable from '../../../ui-component/tables/detail-talent-table';
import CustomSearch from '../../../ui-component/searchsection/custom-search';
import ButtonErrorOutlined from '../../../ui-component/button/ButtonErrorOutlined';
import ButtonPrimary from '../../../ui-component/button/ButtonPrimary';
import.meta.env.VITE_API_BASE_URL
// ==============================|| DETAIL TALENT - DASHBOARD ||============================== //

export default function TalentDetail() {
  const [isLoading, setLoading] = useState(true);
  const url = import.meta.env.VITE_API_BASE_URL
  useEffect(() => {
    setLoading(false);
  }, []);

  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetch(url + 'getdetailtalent')
      .then((response) => response.json())
      // 4. Setting *dogImage* to the image url that we received from the response above
      .then((data) => setRows(data));
  }, []);

  // create list of Nama, Nippos, Job Level, Rumpun Jabatan
  const listNama = [...new Set(rows.map((row) => row.nama))];
  const listJobLevel = [...new Set(rows.map((row) => row.joblevel))];
  const listRumpunJabatan = [...new Set(rows.map((row) => row.jobfam))];
  const listKantor = [...new Set(rows.map((row) => row.nama_kantor))];
  const listTahun = [...new Set(rows.map((row) => row.year))];

  const [selectedNama, setSelectedNama] = useState(null);
  const [selectedJobLevel, setSelectedJobLevel] = useState(null);
  const [selectedRumpunJabatan, setSelectedRumpunJabatan] = useState(null);
  const [selectedKantor, setSelectedKantor] = useState(null);
  const [selectedTahun, setSelectedTahun] = useState(null);

  const resetNamaInput = () => {
    setSelectedNama('');
  };

  const resetJobLevelInput = () => {
    setSelectedJobLevel('');
  };

  const resetRumpunJabatanInput = () => {
    setSelectedRumpunJabatan('');
  };

  const resetKantorInput = () => {
    setSelectedKantor('');
  };

  const resetTahunInput = () => {
    setSelectedTahun('');
  };

  const handleResetSearch = () => {
    setSelectedNama('');
    setSelectedJobLevel('');
    setSelectedRumpunJabatan('');
    setSelectedKantor('');
    setSelectedTahun('')

    // Call resetInput function for each CustomSearch component
    resetNamaInput();
    resetJobLevelInput();
    resetRumpunJabatanInput();
    resetKantorInput();
    resetTahunInput();
  };

  const handleDownloadCSV = () => {
    let dataToDownload = [];
    let filename = '';

    // Determine which dataset to use based on the active tab
    dataToDownload = resetRows;
    filename = `Daftar_Talent.csv`;

    // Specify the columns to include in the CSV, adding 'No' as the first column
    const includedData = ['No', 'nama', 'nippos', 'posisi', 'joblevel', 'jobfam', 'nama_kantor', 'nama_event', 'kategori_talent', 'year'];

    // Create a CSV header with the included column names
    const headerNames = ['No', 'Nama', 'NIPPOS', 'Posisi', 'Job Level', 'Rumpun Jabatan', 'Kantor', 'Nama Event', 'Kategori Talent', 'Tahun'];
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

  const filteredRows = rows.filter((row) => {
    const namaMatch = !selectedNama || (row.nama && row.nama.toLowerCase().includes(selectedNama.toLowerCase()));
    const jobLevelMatch = !selectedJobLevel || (row.joblevel && row.joblevel.toLowerCase().includes(selectedJobLevel.toLowerCase()));
    const rumpunJabatanMatch = !selectedRumpunJabatan || (row.jobfam && row.jobfam.toLowerCase().includes(selectedRumpunJabatan.toLowerCase()));
    const kantorMatch = !selectedKantor || (row.nama_kantor && row.nama_kantor.toLowerCase().includes(selectedKantor.toLowerCase()));
    const tahunMatch = !selectedTahun || (row.year && row.year.toLowerCase().includes(selectedTahun.toLowerCase()));

    return (
      (!selectedNama || namaMatch) &&
      (!selectedJobLevel || jobLevelMatch) &&
      (!selectedRumpunJabatan || rumpunJabatanMatch) &&
      (!selectedKantor || kantorMatch) &&
      (!selectedTahun || tahunMatch)
    );
  });

  //fungsi buat reset index:
  const resetRowIndex = (filteredRows) => {
    return filteredRows.map((row, index) => ({
      ...row,
      id: index + 1 // Adding 1 to start the index from 1 instead of 0
    }));
  };

  //buat constanta yang isinya hasil filter yang indexnya udah di reset:
  const resetRows = resetRowIndex(filteredRows);

  return (
    <>
      {/* <MainLayout/> */}
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <Header title={'Monitoring Talent'} />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <MainCard style={{ padding: '24px 24px' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', paddingBottom: '16px', width: '100%' }}>
              <ButtonPrimary Color="#ffffff" icon={FileDownloadOutlined} LabelName={'Unduh Data'} onClick={handleDownloadCSV} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', paddingBottom: '16px', width: '100%' }}>
              <Stack direction="row" spacing={2} marginRight={2} width={'100%'}>
                <CustomSearch field={listNama} label={'Nama'} onSearch={setSelectedNama} value={selectedNama} resetInput={resetNamaInput} />
                <CustomSearch
                  field={listJobLevel}
                  label={'Job Level'}
                  onSearch={setSelectedJobLevel}
                  value={selectedJobLevel}
                  resetInput={resetJobLevelInput}
                />
                <CustomSearch
                  field={listRumpunJabatan}
                  label={'Rumpun Jabatan'}
                  onSearch={setSelectedRumpunJabatan}
                  value={selectedRumpunJabatan}
                  resetInput={resetRumpunJabatanInput}
                />
                <CustomSearch
                  field={listKantor}
                  label={'Kantor'}
                  onSearch={setSelectedKantor}
                  value={selectedKantor}
                  resetInput={resetKantorInput}
                />
                <CustomSearch
                  field={listTahun}
                  label={'Tahun'}
                  onSearch={setSelectedTahun}
                  value={selectedTahun}
                  resetInput={resetTahunInput}
                />
              </Stack>
              <ButtonErrorOutlined onClick={handleResetSearch} Color="#D32F2F" icon={RestartAltOutlined} LabelName={'Reset'} />
            </div>

            <Grid style={{ marginBottom: '0.5%' }}>
              <DetailTalentTable filteredRows={resetRows} initialDataLength={rows.length} caption={'Belum ada karyawan yang menjadi talent'}/>
            </Grid>
          </MainCard>
        </Grid>
      </Grid>
    </>
  );
}

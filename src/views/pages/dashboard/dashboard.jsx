import { useEffect, useState } from 'react';
import { Grid, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { gridSpacing } from '../../../store/constant';
import GroupsIcon from '@mui/icons-material/Groups';
import Header from '../../../ui-component/header/header';
import DashboardCard from '../../../ui-component/cards/DashboardCard';
import LevelJabatanChart from '../../../ui-component/charts/LevelJabatanChart';
import ButtonChart from '../../../ui-component/button/ButtonChart';
import MainCard from '../../../ui-component/cards/MainCard';
import RumpunJabatanTerbaru from '../../../ui-component/charts/RumpunJabatanChartTerbaru';
import JenisKelaminTerbaru from '../../../ui-component/charts/JenisKelaminTerbaru';
import GenerasiTalent from '../../../ui-component/charts/GenerasiTalent';
import Tooltip from '@mui/material/Tooltip';
import.meta.env.VITE_API_BASE_URL

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  const [datarumpun, setDatarumpun] = useState([]);
  const [datajoblevel, setJoblevel] = useState([]);
  const [datagender, setdatagender] = useState([]);
  const [datagen, setdatagen] = useState([]);
  const [ListTahun, setlisttahun] = useState([]);
  const [selectedYear, setSelectedYear] = useState('0');
  const [totalTalent, setTotalTalent] = useState('');
  const url = import.meta.env.VITE_API_BASE_URL;
  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const [rows, setrows] = useState([]);
  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    fetch(url + 'getdetailtalent')
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setrows(data);
        } else {
          setrows([]);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setrows([]);
      });
  }, []);

  useEffect(() => {
    fetch(url + 'getpopulasi')
      .then((response) => response.json())
      .then((data) => setTotalTalent(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    const distinctYears = [...new Set(rows.map((item) => item.year))];
    setlisttahun(distinctYears);
  }, [rows]);

  const getgenderdata = (year) => {
    fetch(url + `getdatagender?year=${year}`)
      .then((response) => response.json())
      .then((data) => {
        setdatagender(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const getgendata = (year) => {
    fetch(url + `getgendistribution?year=${year}`)
      .then((response) => response.json())
      .then((data) => {
        setdatagen(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const mappedGender = datagender.length > 0 ? datagender.map((item) => ({
    name: item.name === 'F' ? 'Perempuan' : 'Laki-laki',
    value: item.value
  })) : [];

  const getrumpundata = (year) => {
    fetch(url + `getdatatalentrumpun?year=${year}`)
      .then((response) => response.json())
      .then((data) => {
        setDatarumpun(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const getjobleveldata = (year) => {
    fetch(url + `getdatatalentjoblevel?year=${year}`)
      .then((response) => response.json())
      .then((data) => {
        setJoblevel(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    getrumpundata(selectedYear);
    getjobleveldata(selectedYear);
    getgenderdata(selectedYear);
    getgendata(selectedYear);
  }, [selectedYear]);

  const cards = [
    {
      title: 'Total Talent',
      content: totalTalent,
      icon: GroupsIcon
    }
  ];

  return (
    <>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12} >
          <MainCard style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems:'center' }}>
            <Header title={'Dashboard'} />
            <FormControl variant="outlined" sx={{ width: '25%' }}>
              <InputLabel>Tahun</InputLabel>
              <Select value={selectedYear} onChange={handleYearChange} label="Tahun">
                <MenuItem value="0">All Years</MenuItem>
                {ListTahun.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </MainCard>
        </Grid>
        <Grid container spacing={2} item xs={12}>
          {cards.map((card, index) => (
            <Grid item xs={12} key={index}>
              <DashboardCard
                isLoading={isLoading}
                title={card.title}
                content={<Tooltip title="Total talent dari total karyawan dengan job level (E1-A2)">{card.content}</Tooltip>}
                icon={<card.icon />}
                PathLink={'/dashboard/detail-talent'}
              />
            </Grid>
          ))}
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12} md={6}>
              <JenisKelaminTerbaru isLoading={isLoading} data={mappedGender} />
            </Grid>
            <Grid item xs={12} md={6}>
              <GenerasiTalent isLoading={isLoading} data={datagen} />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12} md={6}>
              <RumpunJabatanTerbaru isLoading={isLoading} data={datarumpun} />
            </Grid>
            <Grid item xs={12} md={6}>
              <LevelJabatanChart isLoading={isLoading} data={datajoblevel} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <MainCard style={{ padding: '24px 24px' }}>
            <Grid item xs={18} md={18}>
              <Typography variant="body1" style={{ fontWeight: 'bold', fontSize: '18px', marginBottom: '6px' }}>
                Keterangan
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={4}>
                <Grid container item spacing={3} xs={18}>
                  <Grid item xs={3}>
                    <ButtonChart buttonText="PP" detail="Perencanaan dan Pengelolaan Strategis" />
                  </Grid>
                  <Grid item xs={3}>
                    <ButtonChart buttonText="SD" detail="Sumber Daya Manusia" />
                  </Grid>
                  <Grid item xs={3}>
                    <ButtonChart buttonText="PR" detail="Pengelolaan Regulasi" />
                  </Grid>
                  <Grid item xs={1}>
                    <ButtonChart buttonText="OP" detail="Operasi" />
                  </Grid>
                </Grid>
                <Grid container item spacing={2} xs={12}>
                  <Grid item xs={3}>
                    <ButtonChart buttonText="MR" detail="Manajemen Risiko dan Kepatuhan" />
                  </Grid>
                  <Grid item xs={3}>
                    <ButtonChart buttonText="DI" detail="Pengelolaan Teknologi" />
                  </Grid>
                  <Grid item xs={3}>
                    <ButtonChart buttonText="KU" detail="Keuangan" />
                  </Grid>
                  <Grid item xs={1}>
                    <ButtonChart buttonText="B" detail="Bisnis" />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </MainCard>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;

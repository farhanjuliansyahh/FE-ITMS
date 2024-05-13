import * as React from 'react';
import { Box, Button, Divider, Typography } from '@mui/material';
import { CalendarMonthOutlined, RestartAlt, Search } from '@mui/icons-material';
import { IconFileDownload } from '@tabler/icons-react';

import MainCard from '../../../ui-component/cards/MainCard';
import MatrixNineBox from '../../../ui-component/submenu/matrixninebox';
import { useParams } from 'react-router';
import ButtonPrimary from '../../../ui-component/button/ButtonPrimary';
import SearchResetButton from '../../../ui-component/button/SearchResetButton';
import EventDetailSearchSection from '../../../ui-component/button/EventDetailSearchSection';
import TalentClusterKetuaKomiteTalentTable from '../../../ui-component/tables/talentclusterketuakomitetalent';
import { useEffect,useState } from 'react';
import styled from '@emotion/styled';

export default function ClusterKetuaKomiteTalent() {
    const {id} = useParams();
    const [value, setValue] = React.useState(0);
    const [eventaktif, seteventaktif] = useState([]);
    const [DaysLeft, setDaysLeft] = useState('');

    const [filterNama, setFilterNama] = useState('');
    const [filterNippos, setFilterNippos] = useState('');
    const [filterJob, setFilterJob] = useState('');
    const [filterKategoriMatrix, setFilterKategoriMatrix] = useState('');
    const [clusterRow, setclusterRow] = useState([])
    const [categoryCounts, setCategoryCounts] = useState({});
    const [refreshstate, setrefreshstate] = useState(false)
    const [kuota, setkuota] = useState('')



    const fetcheventdetail = () => {
        return fetch(`http://localhost:4000/getoneevent?id=${id}`) // Replace with your actual endpoint
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            return data; // Return the parsed JSON data
          })
          .catch(error => {
            console.error('Error fetching data:', error);
            throw error; // Rethrow the error to handle it elsewhere
          });
      };

      useEffect(() => {
        fetcheventdetail()
          .then(data => {
            seteventaktif(data.event);
            setLoading(false); // Move this line to the end of the .then block
          })
          .catch(error => {
            console.error('Error fetching data:', error);
            setLoading(false);
          });
      }, []);

      const { eventid, nama_event, deskripsi,tipe_komite_talent, tipekomite, kode_rumpun,nama_rumpun, tanggal_mulai, tanggal_selesai, evenstatus_id } = eventaktif;

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
      
  
      const eventidactive = eventid

    const boxStyle = {
        padding: '20px', 
        width: '100%',
        borderRadius:'12px',
        marginBottom: '-16px'
    };

    const FlexContainer = styled('div')({
        display: 'flex',
        alignItems: 'center',
        gap: '16px', 
        paddingBottom: '24px',
    });

    const BoxContainer = styled('div')({
        display: 'flex',
        flexDirection: 'column',
    });

    const FlexTitle = styled('div')({
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        paddingBottom:0
    });

    const CalendarIcon = styled(CalendarMonthOutlined)({
        fontSize: '1rem',
        color: '#1C2D5A',
    });

    const CountdownLabel = styled('div')({
        backgroundColor: '#FFEDED', 
        color: '#F44336',
        padding: '8px 16px',
        borderRadius: '16px',
        fontWeight: 600,
        fontSize:'16px'
    });

    const DividerContainer = styled('div')({
        width: '100%',
        textAlign: 'center',
        marginBottom: '16px',
    });
    
    const dividerStyle = {
    margin: '0 auto',
    };

    const handlerefresh = () => {
      setrefreshstate(true)
    }
 console.log(clusterRow);
    useEffect(() => {
        // Fetch data from API
        fetch(`http://localhost:4000/getclustertable?eventtalentid=${id}`)
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
          setrefreshstate(false)
      }, [refreshstate]);

      useEffect(() => {
        // Fetch data from API
        fetch(`http://localhost:4000/getparameterkuota?id=2`)
          .then(response => response.json())
          .then(data => {
      
            // Initialize rows based on fetched score data
            const kuota = data['kuota'] || 0;
            // Set the initial values from the fetched data
            setkuota(kuota);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
        }, []); // Empty dependency array to run effect only once

        const countSelected = () => {
          // Filter rows where "Kategori Matrix Awal" is not equal to "Kategori Matrix Akhir"
          const filteredRows = clusterRow.filter(row => row["Matriks Kategori Awal"] !== row["Matriks Kategori Akhir"]);
          // Count the filtered rows
          const count = filteredRows.length;
          return count;
        };

        const selected = countSelected();
        console.log("Number of rows with different Kategori Matrix:", selected);

    
      const totalRows = clusterRow.length;

      const halfLength = Math.ceil(totalRows * kuota / 100);

      const isDiskresiDone = selected === halfLength;
    

    return (
        <MainCard>
            <Box sx={boxStyle}>
                <FlexContainer>
                    <BoxContainer>
                        <FlexTitle style={{paddingBottom:'8px'}}>
                            <Typography style={{fontSize:'24px', fontWeight:'bold'}}>{nama_event}</Typography>
                        </FlexTitle>

                        <FlexTitle>
                            <CalendarIcon style={{color:'#828282'}}/>
                            <Typography style={{fontSize:'14px', color:'#828282'}}>{tanggal_mulai &&
            new Date(tanggal_mulai).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })} - {tanggal_selesai &&
              new Date(tanggal_selesai).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}</Typography>
                        </FlexTitle>
                    </BoxContainer>

                    <div style={{ flex: '1' }}> </div>
          
                    <CountdownLabel>{DaysLeft !== null ? `${DaysLeft} hari` : ''}</CountdownLabel>
                </FlexContainer>
            </Box>

            <DividerContainer>
                <Divider orientation="horizontal" flexItem sx={dividerStyle} />
            </DividerContainer>

            <MatrixNineBox eventid={id} totalrows={totalRows}/>

            <Box paddingLeft={3} paddingRight={3} paddingBottom={3} marginTop={3}>
                <FlexContainer>
                    <Typography style={{fontSize:'24px', fontWeight:'bold'}} gutterBottom>
                        Tabel Karyawan
                    </Typography>
                    <Button
                        variant="contained"
                        style={{ color: '#2196F3', borderRadius: '15px', borderColor: '#EAF8FF', backgroundColor: '#EAF8FF', boxShadow: 'none' }}
                    >
                        sudah dilakukan diskresi kepada {selected}/{halfLength} Karyawan
                    </Button>
                    <div style={{ flex: '1' }}> </div>
                    <ButtonPrimary Color="#ffffff" icon={IconFileDownload} LabelName={'Unduh Data'}/>
                </FlexContainer>
          
                <div style={{ display: 'flex', justifyContent: 'flex-start', paddingBottom: '16px', width:'100%' }}>
                    <div style={{ marginRight: '12px', width:'100%'  }}>
                        <EventDetailSearchSection filter={filterNama} setFilter={setFilterNama} PlaceHolder={'Nama'} />
                    </div>
                    <div style={{ marginRight: '12px', width:'100%' }}>
                        <EventDetailSearchSection filter={filterNippos} setFilter={setFilterNippos} PlaceHolder={'NIPPOS'} />
                    </div>
                    <div style={{ marginRight: '12px', width:'100%' }}>
                        <EventDetailSearchSection filter={filterJob} setFilter={setFilterJob} PlaceHolder={'Job Level'} />
                    </div>
                    <div style={{ marginRight: '24px', width:'100%' }}>
                        <EventDetailSearchSection filter={filterKategoriMatrix} setFilter={setFilterKategoriMatrix} PlaceHolder={'Kategori Matrix'} />
                    </div>
                    <div style={{ marginRight: '12px' }}>
                        <SearchResetButton outlineColor="#1C2D5A" icon={Search} LabelName={'Cari'} />
                    </div>
                    <div style={{ marginRight: '0px' }}>
                        <SearchResetButton outlineColor="#D32F2F" icon={RestartAlt} LabelName={'Reset'} />
                    </div>
                </div>
         
                <TalentClusterKetuaKomiteTalentTable  filter={{nama:filterNama, nippos:filterNippos, job:filterJob, KategoriMatrix:filterKategoriMatrix}}
                eventid={id} rows={clusterRow} counts={categoryCounts} onTableDataRefresh={handlerefresh} disabled={isDiskresiDone}/>
            </Box>

        </MainCard>
    );
}

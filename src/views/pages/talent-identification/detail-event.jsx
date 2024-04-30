import * as React from 'react';
import { Box } from '@mui/material';
import MainCard from '../../../ui-component/cards/MainCard';
import TimelineDetailEvent from '../../../ui-component/submenu/timelinedetailevent';
import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';


import TalentProfile from '../../../ui-component/event-section/talent-profile';
import TalentQualification from '../../../ui-component/event-section/talent-qualification';
import TalentSource from '../../../ui-component/event-section/talent-source';
import TalentDays from '../../../ui-component/event-section/talent-days';
import MatrixNineBox from '../../../ui-component/submenu/matrixninebox';
import { TextsmsTwoTone } from '@mui/icons-material';


// ==============================|| DETAIL EVENT PAGE ||============================== //

export default function DetailEvent() {
  const {id} = useParams();
  const [isLoading, setLoading] = useState(true);
  const [eventaktif, seteventaktif] = useState([]);
  console.log(id);
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
  console.log("noticeme",eventaktif);
  const { eventid, nama_event, deskripsi, tipekomite, kode_rumpun,nama_rumpun, tanggal_mulai, tanggal_selesai, evenstatus_id } = eventaktif;

  console.log("namaid",id);
    return (
    <>
      {/* <MainLayout /> */}
      
      <MainCard sx={{marginBottom : 3}}>
        <Box>
          <TimelineDetailEvent  
          eventid={id}
          nama_event={nama_event}
          deskripsi= {deskripsi} 
          tipekomite= {tipekomite} 
          rumpun ={nama_rumpun} 
          tanggal_mulai ={tanggal_mulai}
          tanggal_selesai =  {tanggal_selesai}
          eventstatus_id= {evenstatus_id}/>
        </Box>
      </MainCard>
{/* 
      <MainCard sx={{marginBottom : 3}}>
        <Box>
        <TalentSource/>
        </Box>
      </MainCard>

       
      <MainCard sx={{marginBottom : 3}}>
        <Box>
        <TalentProfile/>
        </Box>
      </MainCard>

      <MainCard sx={{marginBottom : 3}}>
        <Box>
        <TalentQualification />
        </Box>
      </MainCard>

      <MainCard >
        <Box>
        <TalentDays />
        </Box>
      </MainCard>

      <MainCard>
        <Box>
        <MatrixNineBox />
        </Box>
      </MainCard> */}
      
    </>
  );
};
import * as React from 'react';
import TimelineDetailEvent from '../../../ui-component/submenu/timelinedetailevent';
import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

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
  const { eventid, nama_event, deskripsi,tipe_komite_talent, tipekomite, kode_rumpun,nama_rumpun, tanggal_mulai, tanggal_selesai, evenstatus_id } = eventaktif;

  console.log("namaid",id);
    return (
    <>
      {/* <MainLayout /> */}

          <TimelineDetailEvent  
              eventid={id}
              nama_event={nama_event}
              deskripsi= {deskripsi}
              kodekomite= {tipe_komite_talent} 
              tipekomite= {tipekomite} 
              rumpun ={nama_rumpun} 
              tanggal_mulai ={tanggal_mulai}
              tanggal_selesai =  {tanggal_selesai}
              eventstatus_id= {evenstatus_id}
          />
      
    </>
  );
};
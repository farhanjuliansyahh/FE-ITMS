import * as React from 'react';
import TimelineDetailEvent from '../../../ui-component/submenu/timelinedetailevent.jsx';
import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import.meta.env.VITE_API_BASE_URL

// ==============================|| DETAIL EVENT PAGE ||============================== //

export default function DetailEvent({ prevLocation }) {
  const { id } = useParams();
  const [isLoading, setLoading] = useState(true);
  const [eventaktif, seteventaktif] = useState([]);
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

  const handleActiveStepChange = (newActiveStep) => {
    // Do something with the new activeStep, like updating state or performing other actions
    fetcheventdetail().then((data) => {
      seteventaktif(data.event);
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

  return (
    <>
      {/* <MainLayout /> */}

      <TimelineDetailEvent
        eventid={id}
        nama_event={nama_event}
        deskripsi={deskripsi}
        kodekomite={tipe_komite_talent}
        tipekomite={tipekomite}
        rumpun={nama_rumpun}
        tanggal_mulai={tanggal_mulai}
        tanggal_selesai={tanggal_selesai}
        eventstatus_id={evenstatus_id}
        handleActiveStepChange={handleActiveStepChange}
        prevLocation={prevLocation}
      />
    </>
  );
}

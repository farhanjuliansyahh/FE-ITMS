import React from 'react';
import Typography from '@mui/material/Typography';
import PaktaIntegritas from '../../ui-component/tables/pakta-integritas';
const styles = {
    typog3: {
      marginLeft: '40px',
      marginBottom: '10px',
      color: '#1F1F1F',
      display: 'inline-block', // Ensure inline display
      fontSize: '14px',
      fontFamily: 'Roboto',
      fontWeight: 350,
      marginTop: '20px',
    },
    typog4: {
      paddingLeft: '40px',
      paddingRight: '50px',
      lineHeight: '1.5',
      marginBottom: '15px',
      textAlign: 'justify'
    },
    typog5: {
      paddingLeft: '40px',
      paddingRight: '50px',
      lineHeight: '1.5',
      textAlign: 'justify'
    },
    typog6: {
      paddingLeft: '40px',
      paddingRight: '50px',
      lineHeight: '1.5',
      marginTop: '15px',
      marginBottom: '15px',
      textAlign: 'justify',
    }
  }
  export default function PICLcontent ({Body1,Body2,Body3,data}) {
    return (
    <div>
      <Typography style={styles.typog3}>
        Saya yang menyetujui,
      </Typography>
      <Typography style={{ paddingLeft: '34px', marginBottom: '10px' }}>
        <PaktaIntegritas detail={data}/>
      </Typography>
      
      <Typography style={styles.typog4}>
        {Body1}
      </Typography>
      <div>
        <Typography style={styles.typog5}>
          A. Seluruh data yang Saya berikan dalam sistem ITMS Nova adalah benar dan dapat dipertanggungjawabkan.
        </Typography>
        <Typography style={styles.typog5}>
          B. Bila dikemudian hari terbukti bahwa data yang Saya berikan tidak benar,
          maka saya bersedia untuk didiskualifikasi dari proses manajemen talenta yang sedang berlangsung.
        </Typography>
        <Typography style={styles.typog5}>
          C. Bila dikemudian hari terbukti bahwa data yang Saya berikan tidak benar dan tidak dapat dipertanggungjawabkan,
          maka  Saya bersedia untuk menerima seluruh konsekuensi yang diberikan perusahaan terhadap karir Saya.
        </Typography>
        <Typography style={styles.typog5}>
          {Body2}
        </Typography>
      </div>
      <Typography style={styles.typog6}>
        {Body3}
      </Typography>
    </div>
  );
};



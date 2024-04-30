import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EmailIcon from '@mui/icons-material/Email';
import PaktaIntegritas from '../../ui-component/tables/pakta-integritas';
import TalentCheckbox from '../../ui-component/checkbox/talent-checkbox';
import PosLogo from '../../assets/images/ilustration/PosIND_MainColor.png';
import ITMSLogo from '../../assets/images/logo.svg';
const styles = {
  div1: {
    marginBottom: '10px',
    display: 'block',
    borderRadius: '12px',
    padding: '12px',
    gap: '16px',
    borderColor: '#E0E0E0',
    border: '1px solid #E0E0E0',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    marginRight: '15px', // Adjust the margin as needed
    color: '#1C2D5A',
  },
  typog: {
    fontSize: '16px', // Adjust the margin as needed
    color: '#1F1F1F',
    fontWeight: 500,
    fontFamily: 'Roboto',
    marginRight: '10px',
  },
  typog2: {
    color: '#F44336',
    backgroundColor: '#FFEDED', // Default background color
    padding: '4px 8px', // Adjust padding as needed
    borderRadius: '12px', // Adjust border radius for rounded corners
    display: 'inline-block', // Ensure inline display
    fontSize: '12px',
    fontFamily: 'Roboto',
    fontWeight: 300
  },
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
  img: {
    display: 'block',
    marginLeft: '4%',
    maxWidth: '100%',
    maxHeight: '100%'
  },
  img2: {
    marginLeft: '78%',
    marginRight: '5%',
    maxWidth: '4%',
    maxHeight: '3%',
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
}
const statusStyles = {
  belumSelesai: {
      color: '#F44336',
      backgroundColor: '#FFEDED', // Default background color
      padding: '4px 8px', // Adjust padding as needed
      borderRadius: '14px', // Adjust border radius for rounded corners
      display: 'inline-block', // Ensure inline display
      fontSize: '12px',
      fontFamily: 'Roboto',
      fontWeight: 300
  },
  selesai: {
      color: '#66BB6A',// Change to green color for "Selesai"
      backgroundColor: '#FFFFFF', // Default background color
      padding: '4px 8px', // Adjust padding as needed
      borderRadius: '12px', // Adjust border radius for rounded corners
      display: 'inline-block', // Ensure inline display
      fontSize: '14px',
      fontFamily: 'Roboto',
      fontWeight: 300
      // Other styles as needed
  }
};

export default function ProfileAccordion() {
  const [statusPakta, setStatusPakta] = React.useState("Belum Selesai");
  const [statusCL, setStatusCL] = React.useState("Belum Selesai");
  const handleStatusUpdate = () => {
    setStatusPakta("Selesai");
    
};
const handleStatusUpdateCL= () => {
  setStatusCL("Selesai");
  
};
  return (
    <div >
      <div style={styles.div1}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}>
            <div style={styles.container}>
              <EmailIcon style={styles.icon} />
              <Typography style={styles.typog}>Pakta Integritas</Typography>
              {/* <Typography style={styles.typog2}>Belum Selesai</Typography>  */}
              <Typography style={statusPakta === 'Belum Selesai' ? styles.typog2 : statusStyles.selesai}>
                {statusPakta}
                </Typography>
              {/* <Typography style={status === 'Belum Selesai' ? statusStyles.belumSelesai : statusStyles.selesai}>{status}</Typography> */}

              
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div style={styles.container}>
              <img src={ITMSLogo} alt="Deskripsi gambar" style={styles.img} />
              <img src={PosLogo} alt="Deskripsi gambar" style={styles.img2} />
            </div>
            <Typography style={styles.typog3}>
              Saya yang menyetujui,
            </Typography>
            <Typography style={{ paddingLeft: '34px', marginBottom: '10px' }}>
              <PaktaIntegritas />
            </Typography>
            <Typography style={styles.typog4}>
              Dengan ini menyatakan bahwa telah membaca dan memahami
              prinsip prinsip Pakta Integritas terkait manajemen talenta dan karir
              yang berlaku di PT. Pos Indonesia sebagai berikut :
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
                D. Apabila saya melakukan pelanggaran terhadap Pakta Integritas,
                maka saya siap menerima sanksi hukuman sesuai peraturan yang berlaku di Perusahaan.
              </Typography>
            </div>
            <Typography style={{ paddingLeft: '40px', paddingRight: '50px', lineHeight: '1.5', marginTop: '15px', marginBottom: '15px', textAlign: 'justify' }}>
              Demikian Pakta Integritas ini saya setujui untuk digunakan sebagaimana mestinya.
            </Typography>
            <div style={{ paddingLeft: '40px', paddingRight: '50px' }}>
              <TalentCheckbox onStatusUpdate={handleStatusUpdate} />
            </div>

          </AccordionDetails>
        </Accordion>
      </div>
      <div style={styles.div1}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}>
            <div style={styles.container}>
              <EmailIcon style={styles.icon} />
              <Typography style={styles.typog}>Commitment Letter</Typography>
              {/* <Typography style={styles.typog2}>Belum Selesai</Typography>  */}
              <Typography style={statusCL === 'Belum Selesai' ? styles.typog2 : statusStyles.selesai}>
                {statusCL}
                </Typography>
              {/* <Typography style={status === 'Belum Selesai' ? statusStyles.belumSelesai : statusStyles.selesai}>{status}</Typography> */}
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div style={styles.container}>
              <img src={ITMSLogo} alt="Deskripsi gambar" style={styles.img} />
              <img src={PosLogo} alt="Deskripsi gambar" style={styles.img2} />
            </div>
            <Typography style={styles.typog3}>
              Saya yang menyetujui,
            </Typography>
            <Typography style={{ paddingLeft: '34px', marginBottom: '10px' }}>
              <PaktaIntegritas />
            </Typography>
            <Typography style={styles.typog4}>
              Dengan ini menyatakan bahwa telah membaca dan memahami
              prinsip prinsip Pakta Integritas terkait manajemen talenta dan karir
              yang berlaku di PT. Pos Indonesia sebagai berikut :
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
                D. Apabila saya melakukan pelanggaran terhadap Pakta Integritas,
                maka saya siap menerima sanksi hukuman sesuai peraturan yang berlaku di Perusahaan.
              </Typography>
            </div>
            <Typography style={{ paddingLeft: '40px', paddingRight: '50px', lineHeight: '1.5', marginTop: '15px', marginBottom: '15px', textAlign: 'justify' }}>
              Demikian Pakta Integritas ini saya setujui untuk digunakan sebagaimana mestinya.
            </Typography>
            <div style={{ paddingLeft: '40px', paddingRight: '50px' }}>
              <TalentCheckbox onStatusUpdate={handleStatusUpdateCL} />
            </div>

          </AccordionDetails>
        </Accordion>
      </div>
      
    </div>
  );
}

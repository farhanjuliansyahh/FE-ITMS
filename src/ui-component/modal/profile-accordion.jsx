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
import PICLcontent from '../../ui-component/cards/PICL-content';
const styles = {
  accord: {
    height: 70,
    alignItems: 'center',
    margin: 'auto',
  },
  div1: {
    marginBottom: '24px',
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
  typog6: {
    paddingLeft: '40px',
    paddingRight: '50px',
    lineHeight: '1.5',
    marginTop: '15px',
    marginBottom: '15px',
    textAlign: 'justify',
  }
}
const statusStyles = {
  submit: {
    color: '#66BB6A',// Change to green color for "Selesai"
    backgroundColor: '#FFFFFF', // Default background color
    padding: '4px 8px', // Adjust padding as needed
    borderRadius: '12px', // Adjust border radius for rounded corners
    display: 'inline-block', // Ensure inline display
    fontSize: '14px',
    fontFamily: 'Roboto',
    fontWeight: 300
  }
};

export default function ProfileAccordion() {
  const [statusPakta, setStatusPakta] = React.useState("Belum Submit");
  const [statusCL, setStatusCL] = React.useState("Belum Submit");
  const handleStatusUpdatePakta = () => {
    setStatusPakta("Submit");
  };
  const handleStatusUpdateCL = () => {
    setStatusCL("Submit");

  };
  return (
    <div >
      <div style={styles.div1}>
        <Accordion >
          <AccordionSummary style={styles.accord}
            expandIcon={<ExpandMoreIcon />}>
            <div style={styles.container}>
              <EmailIcon style={styles.icon} />
              <Typography style={styles.typog}>Pakta Integritas</Typography>
              <Typography style={statusPakta === 'Belum Submit' ? styles.typog2 : statusStyles.submit}>
                {statusPakta}
              </Typography>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div style={styles.container}>
              <img src={ITMSLogo} alt="Deskripsi gambar" style={styles.img} />
              <img src={PosLogo} alt="Deskripsi gambar" style={styles.img2} />
            </div>
            <PICLcontent 
              Body1='Dengan ini menyatakan bahwa telah membaca dan memahami 
              prinsip prinsip Pakta Integritas terkait manajemen talenta dan karir 
              yang berlaku di PT. Pos Indonesia sebagai berikut :' 
              Body2='D. Apabila saya melakukan pelanggaran terhadap Pakta Integritas, 
              maka saya siap menerima sanksi hukuman sesuai peraturan yang berlaku di Perusahaan.' 
              Body3='Demikian Pakta Integritas ini saya setujui untuk digunakan sebagaimana mestinya. '/>
            <div style={{ paddingLeft: '40px', paddingRight: '50px' }}>
              <TalentCheckbox
                onStatusUpdate={handleStatusUpdatePakta}
                Title='Konfirmasi Talent Profile'
                Body='Apakah anda yakin akan submit Pakta Integritas?'
                subBody='Anda tidak dapat membatalkan jika sudah memilih submit.'
                Footer='Saya telah membaca dan menyetujui Pakta Integritas ini' />
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
      <div style={styles.div1}>
        <Accordion>
          <AccordionSummary style={styles.accord}
            expandIcon={<ExpandMoreIcon />}>
            <div style={styles.container}>
              <EmailIcon style={styles.icon} />
              <Typography style={styles.typog}>Commitment Letter</Typography>
              <Typography style={statusCL === 'Belum Submit' ? styles.typog2 : statusStyles.submit}>
                {statusCL}
              </Typography>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div style={styles.container}>
              <img src={ITMSLogo} alt="Deskripsi gambar" style={styles.img} />
              <img src={PosLogo} alt="Deskripsi gambar" style={styles.img2} />
            </div>
            <PICLcontent 
              Body1='Dengan ini menyatakan bahwa telah membaca dan memahami 
              prinsip prinsip Commitment Letter terkait manajemen talenta dan karir 
              yang berlaku di PT. Pos Indonesia sebagai berikut :' 
              Body2='D. Apabila saya melakukan pelanggaran terhadap Commitment Letter, 
              maka saya siap menerima sanksi hukuman sesuai peraturan yang berlaku di Perusahaan.' 
              Body3='Demikian Commitment Letter ini saya setujui untuk digunakan sebagaimana mestinya. '/>
            <div style={{ paddingLeft: '40px', paddingRight: '50px' }}>
              <TalentCheckbox
                onStatusUpdate={handleStatusUpdateCL}
                Title='Konfirmasi Talent Profile'
                Body='Apakah anda yakin akan submit Commitment Letter?'
                subBody='Anda tidak dapat membatalkan jika sudah memilih submit.'
                Footer='Saya telah membaca dan menyetujui Commitment Letter ini' />
            </div>

          </AccordionDetails>
        </Accordion>
      </div>

    </div>
  );
}

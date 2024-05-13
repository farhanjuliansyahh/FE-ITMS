import * as React from 'react';
import Box from '@mui/material/Box';
import { Grid, Stack} from '@mui/material';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const daftarkantor = [
    { nopend: '40005', nama_kantor: 'KANTOR PUSAT BANDUNG'},
    { nopend: '10005', nama_kantor: 'KANTOR PUSAT JAKARTA' },
    { nopend: '20004', nama_kantor: 'KANTOR REGIONAL I MEDAN'},
    { nopend: '10004', nama_kantor: 'KANTOR REGIONAL II JAKARTA' },
    { nopend: '40004', nama_kantor: 'KANTOR REGIONAL III BANDUNG' },
    { nopend: '50004', nama_kantor: 'KANTOR REGIONAL IV SEMARANG' },
    { nopend: '60004', nama_kantor: 'KANTOR REGIONAL V SURABAYA' },
    { nopend: '90004', nama_kantor: 'KANTOR REGIONAL VI MAKASSAR' },
    { nopend: '10000', nama_kantor: 'KCU JAKARTACENTRUM'},
    { nopend: '11000', nama_kantor: 'KCU JAKARTAOCEANIA' },
    { nopend: '12000', nama_kantor: 'KCU JAKARTAFLORA'},
    { nopend: '20041', nama_kantor: 'BUSINESS PARTNER REGIONAL I'},
    { nopend: '10041', nama_kantor: 'BUSINESS PARTNER REGIONAL II' },
    { nopend: '40041', nama_kantor: 'BUSINESS PARTNER REGIONAL III'}]
const RumpunJabatan = ["Perencanaan dan Pengelolaan Strategis","Bisnis","Operasi",
                        "Manajemen Risiko dan Kepatuhan","Pengelolaan Regulasi",
                        "Pengelolaan Teknologi","Keuangan","Sumber Daya Manusia"]
const JobLevel = ["A2","A1","B2","B1","C2","C1","D3","D2","D1","E3","E2","E1","F3","F2","F1",]
const StatusIDP = ["Belum berjalan","Berjalan","Selesai", "Kadaluarsa"]


export default function DetailTalentPertama({
    selectedKantor,
    setSelectedKantor,
    selectedRumpunJabatan,
    setSelectedRumpunJabatan,
    selectedJobLevel,
    setSelectedJobLevel,
    selectedStatusIDP,
    setSelectedStatusIDP,
  }) {
    const handleChangeKantor= (_, value) => {
        setSelectedKantor(value);
      };
    
    const handleChangeRumpunJabatan = (_, value) => {
        setSelectedRumpunJabatan(value);
      };
    const handleChangeJobLevel = (_, value) => {
        setSelectedJobLevel(value);
      };
    const handleChangeStatusIDP = (_, value) => {
        setSelectedStatusIDP(value);
      };

    return (
    <Box sx={{ minWidth: 120 }}>
        <Grid item xs={12}>
            <Stack direction="row"  justifyContent="start" alignItems="center">
                <div style={{ display: 'flex', justifyContent: "space-between", alignItems:"center", paddingBottom: '16px', width:'100%' }}>
                    
                    <div style={{ marginRight: '12px', width:'100%'  }}>
                        <Autocomplete
                        id="kantor"
                        options={daftarkantor}
                        autoHighlight
                        getOptionLabel={(option) => option.nama_kantor}
                        value={selectedKantor}
                        onChange={handleChangeKantor}
                        renderInput={(params) => (
                            <TextField
                            {...params}
                            label="Kantor"
                            inputProps={{
                                ...params.inputProps,
                                autoComplete: 'new-password',
                            }}
                            />
                        )}
                        />
                    </div>
                    <div style={{ marginRight: '12px', width:'100%'  }}>
                    <Autocomplete
                        disablePortal
                        id="rumpun-jabatan"
                        options={RumpunJabatan}
                        value={selectedRumpunJabatan}
                        onChange={handleChangeRumpunJabatan}
                        renderInput={(params) => <TextField {...params} label="Rumpun Jabatan" />}/>
                    </div>
                    <div style={{ marginRight: '12px', width:'100%'  }}>
                    <Autocomplete
                        disablePortal
                        id="job-level"
                        options={JobLevel}
                        value={selectedJobLevel}
                        onChange={handleChangeJobLevel}
                        renderInput={(params) => <TextField {...params} label="Level Jabatan" />}/>
                    </div>
                    {/* <div style={{ marginRight: '0px', width:'100%'  }}>
                    <Autocomplete
                        disablePortal
                        id="status-IDP"
                        options={StatusIDP}
                        value={selectedStatusIDP}
                        onChange={handleChangeStatusIDP}
                        renderInput={(params) => <TextField {...params} label="Status IDP" />}/>
                    </div> */}
                    
                </div>
            </Stack>
        </Grid>
      
    </Box>
  );
}

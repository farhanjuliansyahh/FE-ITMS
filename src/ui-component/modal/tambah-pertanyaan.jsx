import * as React from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import ButtonPrimary from '../button/ButtonPrimary';
import SaveOutlined from '@mui/icons-material/SaveOutlined';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 420,
  bgcolor: 'background.paper',
  border: '0.5px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius:'12px'
};

const AddQuestionModal = ({ open, handleClose, handleAddQuestion }) => {
  const [newQuestion, setNewQuestion] = React.useState('');

  const handleSave = () => {
    // First, update the state
    setNewQuestion('');
    // Then, call the parent component's function
    handleAddQuestion(newQuestion);
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h3" component="h2" sx={{ textAlign: 'center', marginBottom:'16px'}}>
          Tambah Pertanyaan
        </Typography>
        <TextField
          fullWidth
          label="Pertanyaan"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          margin="normal"
        />
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <ButtonPrimary Color="#ffffff" icon={SaveOutlined} LabelName={'Simpan'}  onClick={handleSave}/>
          {/* <Button variant="contained" onClick={handleSave}>
            Simpan
          </Button> */}
        </Box>
      </Box>
    </Modal>
  );
};

export default AddQuestionModal;

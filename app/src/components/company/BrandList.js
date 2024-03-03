import React, { useEffect, useState } from 'react';
import DataTable from '../DataTable';
import axios from 'axios';
import BrandModel from './BrandModel';
import { Box, Modal, Typography } from '@mui/material';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BrandList() {
  const [showModel, setShowModel] = useState(false);
  const handleDelete = async (data) => {
    try {
      const resp = await axios.delete(
        process.env.REACT_APP_BACKEND_URL + 'brand/' + data,
      );
      alert(resp.data.message);
    } catch (error) {
      alert('something went wrong');
    }
  };
  const handleEdit = (data) => {
    setShowModel(true);
  };
  const [data, setData] = useState([]);
  const getData = async () => {
    try {
      const resp = await axios.get(process.env.REACT_APP_BACKEND_URL + 'brand');
      if (resp.data.success) {
        setData(resp.data.data);
      } else {
        alert('something went wrong');
      }
    } catch (error) {
      alert('Terrible  happened!');
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const columns = [
    { id: 'name', label: 'Name' },
    { id: 'createdAt', label: 'createdAt' },
    { id: 'action', label: 'Action' },
  ];
  return (
    <>
      <Modal
        keepMounted
        open={showModel}
        onClose={() => setShowModel(false)}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
      <DataTable
        columns={columns}
        rows={data}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
    </>
  );
}

import React, { useState } from 'react';
import DashboardLayout from '../../../layouts/company/Dashboard.layout';
import {
  Box,
  Divider,
  FormHelperText,
  Grid,
  MenuItem,
  Select,
  Typography,
  Button,
} from '@mui/material';
import DynamicForm from '../../../components/company/DynamicForm';

export default function CustomForm() {
  const [fieldType, setFieldType] = useState('');

  const handleChange = (e) => {
    setFieldType(e.target.value);
  };
  return (
    <DashboardLayout>
      <Box>
        <Typography variant="h4" color="initial">
          Make your custom form
        </Typography>
        <Divider sx={{ my: 1 }} />
        <Box display="block" sx={{ my: 4 }}>
          <Grid>
            <DynamicForm type={fieldType} />
          </Grid>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
            alignContent="center"
            wrap="wrap"
          >
            <Grid item xs={6}>
              <FormHelperText>Select field type </FormHelperText>
              <Select
                required
                fullWidth
                name="field_type"
                value={fieldType}
                onChange={handleChange}
              >
                <MenuItem key={'text'} value={'text'}>
                  Text
                </MenuItem>
              </Select>
            </Grid>
            {/* <Grid item xs={6} sx={{ mt: '32px' }}>
              <Button variant="contained" color="secondary">
                Add
              </Button>
            </Grid> */}
          </Grid>
        </Box>
      </Box>
    </DashboardLayout>
  );
}

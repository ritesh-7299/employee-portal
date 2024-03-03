import React, { useState } from 'react';
import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import DashboardLayout from '../../layouts/company/Dashboard.layout';
import AddItemCategory from '../../components/company/AddItemCategory';
import BrandList from '../../components/company/BrandList';

export default function Inventory() {
  const [type, setType] = useState(null);
  const [purchaseType, setPurchaseType] = useState(null);
  return (
    <DashboardLayout>
      <Box>
        <Typography variant="h4" color="initial">
          Manage your inventory from here
        </Typography>
        <Divider sx={{ my: 1 }} />
        <Grid container sx={{ mt: 0 }} spacing={3}>
          <Grid item xs={6} sm={6}>
            <Button
              variant={type == 'sell' ? 'contained' : 'outlined'}
              fullWidth
              onClick={() => setType('sell')}
            >
              sell
            </Button>
          </Grid>

          <Grid item xs={6} sm={6}>
            <Button
              variant={type == 'purchase' ? 'contained' : 'outlined'}
              fullWidth
              onClick={() => setType('purchase')}
            >
              Purchase
            </Button>
          </Grid>
        </Grid>
        {type == 'purchase' && (
          <>
            <Grid container sx={{ mt: 2, mb: 2 }} spacing={1}>
              <Grid item xs={4} sm={4}>
                <Button
                  variant={purchaseType == 'item' ? 'contained' : 'outlined'}
                  fullWidth
                  onClick={() => setPurchaseType('item')}
                >
                  Items
                </Button>
              </Grid>

              <Grid item xs={4} sm={4}>
                <Button
                  variant={
                    purchaseType == 'category' ? 'contained' : 'outlined'
                  }
                  fullWidth
                  onClick={() => setPurchaseType('category')}
                >
                  Category
                </Button>
              </Grid>

              <Grid item xs={4} sm={4}>
                <Button
                  variant={purchaseType == 'brand' ? 'contained' : 'outlined'}
                  fullWidth
                  onClick={() => setPurchaseType('brand')}
                >
                  Brand
                </Button>
              </Grid>
            </Grid>
            {purchaseType == 'brand' ? (
              <BrandList />
            ) : purchaseType == 'item' ? (
              <AddItemCategory />
            ) : null}
          </>
        )}
      </Box>
    </DashboardLayout>
  );
}

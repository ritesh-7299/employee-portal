import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import InventoryIcon from '@mui/icons-material/Inventory';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Link } from 'react-router-dom';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import PaidIcon from '@mui/icons-material/Paid';
import CategoryIcon from '@mui/icons-material/Category';
import ApartmentIcon from '@mui/icons-material/Apartment';

export const mainListItems = (
  <React.Fragment>
    <Link
      style={{ textDecoration: 'none', color: 'initial' }}
      to={'/company/dashboard'}
    >
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
    </Link>
    <Link
      style={{ textDecoration: 'none', color: 'initial' }}
      to={'/company/employee'}
    >
      <ListItemButton
        onSelect={() => {
          alert('okay');
        }}
      >
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Employees" />
      </ListItemButton>
    </Link>
    <Link
      style={{ textDecoration: 'none', color: 'initial' }}
      to={'/company/verification'}
    >
      <ListItemButton>
        <ListItemIcon>
          <GroupAddIcon />
        </ListItemIcon>
        <ListItemText primary="Verification" />
      </ListItemButton>
    </Link>
    <Link
      style={{ textDecoration: 'none', color: 'initial' }}
      to={'/company/custom-form'}
    >
      <ListItemButton>
        <ListItemIcon>
          <FormatListBulletedIcon />
        </ListItemIcon>
        <ListItemText primary="Custom Forms" />
      </ListItemButton>
    </Link>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Manage Inventory
    </ListSubheader>
    <Link
      style={{ textDecoration: 'none', color: 'initial' }}
      to={'/company/sell'}
    >
      <ListItemButton>
        <ListItemIcon>
          <PaidIcon />
        </ListItemIcon>
        <ListItemText primary="Sell" />
      </ListItemButton>
    </Link>
    <Link
      style={{ textDecoration: 'none', color: 'initial' }}
      to={'/company/items'}
    >
      <ListItemButton>
        <ListItemIcon>
          <InventoryIcon />
        </ListItemIcon>
        <ListItemText primary="Item" />
      </ListItemButton>
    </Link>
    <Link
      style={{ textDecoration: 'none', color: 'initial' }}
      to={'/company/category'}
    >
      <ListItemButton>
        <ListItemIcon>
          <CategoryIcon />
        </ListItemIcon>
        <ListItemText primary="Category" />
      </ListItemButton>
    </Link>
    <Link
      style={{ textDecoration: 'none', color: 'initial' }}
      to={'/company/brand'}
    >
      <ListItemButton>
        <ListItemIcon>
          <ApartmentIcon />
        </ListItemIcon>
        <ListItemText primary="Brand" />
      </ListItemButton>
    </Link>
  </React.Fragment>
);

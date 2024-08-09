
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import Button from '@mui/material/Button';

import { Link, Outlet } from 'react-router-dom';
import { Box } from '@mui/material';


const Navbar = () => {
  

  return (
    <Box>
    <AppBar position="static">
      <Toolbar>
        
       <Button color="inherit" component={Link} to="/home" >
       Home
        </Button>
        <Button color="inherit" component={Link} to="/contact" >
          Contact
        </Button>
        <Button color="inherit" component={Link} to="/blogs" >
        blogs
        </Button>
      </Toolbar>
      
    </AppBar>
    <Outlet/>
    </Box>
  );
};

export default Navbar;

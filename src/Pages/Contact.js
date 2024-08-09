import React, { useState } from 'react';
import { TextField, Button, Box, Grid, FormControlLabel, Checkbox, Radio, RadioGroup, FormControl, Typography } from '@mui/material';
import axios from 'axios';

const Form = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    calories: '',
    isAvailable: false,
    allergens: '',
    price: '',
    image_url:'',
  });

  const [submissionStatus, setSubmissionStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = JSON.stringify({
      "name": formData.name,
      "description": formData.description,
      "price": formData.price,
      "available": formData.isAvailable,
      "category": formData.category,
      "allergens": formData.allergens,
      "calories": formData.calories,
      "image_url": "https://www.verywellfit.com/thmb/WY_NtJB9XE1wZTaKbk2syDPITUc=/3865x2576/filters:fill(FFDB5D,1)/different-types-of-food-on-rustic-wooden-table-861188910-5bd1d6f846e0fb00519d99f9.jpg",
      "active": true
    });

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://127.0.0.1:8000/menu',
      headers: { 
        'Content-Type': 'application/json'
      },
      data
    };

    try {
      const response = await axios.request(config);
      console.log(JSON.stringify(response.data));
      setSubmissionStatus('Form submitted successfully!');
      setFormData({
        name: '',
        description: '',
        category: '',
        calories: '',
        isAvailable: false,
        allergens: '',
        price: '',
        image_url:'',
      });
    } catch (error) {
      console.error('Error submitting the form:', error);
      setSubmissionStatus('Error submitting the form.');
    }
  };

  return (
    <>
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Add Menu Form
        </Typography>
      </Box>

      <Box 
        component="form" 
        onSubmit={handleSubmit} 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 2, 
          width: '100%', 
          maxWidth: 600, 
          margin: 'auto', 
          p: 3, 
          border: '1px solid', 
          borderColor: 'grey.300', 
          borderRadius: 2,
          boxShadow: 3,
          mt: 4,
          palette: {
            light: '#00bcd4',
            main: '#00bcd4',
            dark: '##00bcd4',
            contrastText: '#fff',
          },
          backdropFilter: 'blur(10px)' // Optional: Add a blur effect
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="body1">Item Name:</Typography>
            <TextField 
              id="name" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              fullWidth
              required
              placeholder="Enter item name"
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="body1">Description:</Typography>
            <TextField 
              id="description" 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              fullWidth
              required 
              placeholder="Enter description"
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="body1">Category:</Typography>
            <FormControl component="fieldset">
              <RadioGroup
                id="category" 
                name="category" 
                value={formData.category} 
                onChange={handleChange}
              >
                <FormControlLabel value="appetizer" control={<Radio />} label="Appetizer" />
                <FormControlLabel value="main course" control={<Radio />} label="Main Course" />
                <FormControlLabel value="dessert" control={<Radio />} label="Dessert" />
                <FormControlLabel value="beverage" control={<Radio />} label="Beverage" />
              </RadioGroup> 
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="body1">Price:</Typography>
            <TextField 
              id="price" 
              name="price" 
              value={formData.price} 
              onChange={handleChange} 
              fullWidth
              required 
              placeholder="Enter price"
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="body1">Calories:</Typography>
            <TextField 
              id="calories" 
              name="calories" 
              value={formData.calories} 
              onChange={handleChange} 
              fullWidth
              required 
              placeholder="Enter calories"
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  id="available"
                  name="isAvailable"
                  checked={formData.isAvailable}
                  onChange={handleChange}
                />
              }
              label="Available"
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="body1">Allergens:</Typography>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="allergens"
                name="allergens"
                value={formData.allergens}
                onChange={handleChange}
              >
                <FormControlLabel value="Peanuts" control={<Radio />} label="Peanuts" />
                <FormControlLabel value="Gluten" control={<Radio />} label="Gluten" />
                <FormControlLabel value="Dairy" control={<Radio />} label="Dairy" />
                <FormControlLabel value="None" control={<Radio />} label="None" />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>

        <Button 
          type="submit" 
          variant="contained" 
          color="primary"
          sx={{ mt: 2 }}
        >
          Add
        </Button>

        {submissionStatus && (
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="body1" color={submissionStatus.includes('Error') ? 'error' : 'success'}>
              {submissionStatus}
            </Typography>
          </Box>
        )}
      </Box>
    </>
  );
};

export default Form;

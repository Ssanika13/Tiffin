import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

function Blogs() {
  const [salads, setSalads] = useState([]);

  useEffect(() => {
    const fetchSalads = async () => {
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'http://127.0.0.1:8000/menu',
        headers: { }
      };

      try {
        const response = await axios.request(config);
        setSalads(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSalads();
  }, []);

  return (
    <div>
      {salads.map(salad => (
        <Card key={salad._id} sx={{ maxWidth: 345, margin: 2 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={salad.image_url}
              alt={salad.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {salad.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {salad.description}
              </Typography>
              <Typography variant="body2" color="text.primary">
                Price: ${salad.price}
              </Typography>
              <Typography variant="body2" color="text.primary">
                Calories: {salad.calories}
              </Typography>
              <Typography variant="body2" color="text.primary">
                Category: {salad.category}
              </Typography>
              <Typography variant="body2" color="text.primary">
                Allergens: {salad.allergens}
              </Typography>
              <Typography variant="body2" color="text.primary">
                Available: {salad.available ? 'Yes' : 'No'}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </div>
  );
}

export default Blogs;

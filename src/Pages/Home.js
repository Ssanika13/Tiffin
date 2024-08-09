import * as React from 'react';
import  { useState, useEffect } from 'react';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    imgPath:
      'https://www.thespruceeats.com/thmb/Q0schrGA1TOajpjDjCqLGipqcBA=/5101x3401/filters:fill(auto,1)/GettyImages-639389404-5c450e724cedfd00015b09d5.jpg',
  },
  {
    imgPath:
      'https://wallpapercave.com/wp/wp3724325.jpg',
  },
  {
    imgPath:
      'https://www.verywellfit.com/thmb/WY_NtJB9XE1wZTaKbk2syDPITUc=/3865x2576/filters:fill(FFDB5D,1)/different-types-of-food-on-rustic-wooden-table-861188910-5bd1d6f846e0fb00519d99f9.jpg',
  },
  {
    imgPath:
      'https://img.jakpost.net/c/2016/09/29/2016_09_29_12990_1475116504._large.jpg',
  },
];

function SwipeableTextMobileStepper() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

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
    <React.Fragment>
      
      <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
        <Paper
          square
          elevation={0}
          sx={{
            display: 'flex',
            alignItems: 'center',
            height: 0,
            pl: 2,
            bgcolor: 'background.default',
          }}
        >
          <Typography>{images[activeStep]?.label}</Typography>
        </Paper>
        <AutoPlaySwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {images.map((step, index) => (
            <div key={index}>
              {Math.abs(activeStep - index) <= 2 ? (
                <Box
                  component="img"
                  sx={{
                    height: 255,
                    display: 'block',
                    maxWidth: 400,
                    overflow: 'hidden',
                    width: '100%',
                  }}
                  src={step.imgPath}
                  alt={`image ${index}`}
                />
              ) : null}
            </div>
          ))}
        </AutoPlaySwipeableViews>
        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              Next
              {theme.direction === 'rtl' ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
              {theme.direction === 'rtl' ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Back
            </Button>
          }
        />
      </Box>

     

      

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

      
    </React.Fragment>
  );
}

export default SwipeableTextMobileStepper;

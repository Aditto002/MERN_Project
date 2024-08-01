
import React, { useState } from 'react';
import { Carousel } from "@material-tailwind/react";
import ReactSlider from './ReactSlider';
import InFoCard from './infocard/InFoCard';


const Home = () => {
 

  return (
  
  <div>
    <ReactSlider></ReactSlider>
    <InFoCard></InFoCard>
  </div>
   
  );
};

export default Home;

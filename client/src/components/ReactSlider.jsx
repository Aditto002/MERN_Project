import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import slide1 from "../assets/slide1.jpg"
import slide2 from "../assets/slide2.jpg"
import slide3 from "../assets/slider3.jpg"

const ReactSlider = () => {
  return (
    <div>
       <Carousel>
                <div >
                    <img src={slide1}/>
                    <p className="legend">Embark on an unforgettable journey with our guided tours, where every moment is an adventure waiting to be discovered.</p>
                </div>
                <div>
                    <img src={slide2} />
                    <p className="legend">Embark on an unforgettable journey with our guided tours, where every moment is an adventure waiting to be discovered.</p>
                </div>
                <div>
                    <img src={slide3}  />
                    <p className="legend">Embark on an unforgettable journey with our guided tours, where every moment is an adventure waiting to be discovered.</p>
                </div>
            </Carousel>
    </div>
  )
}

export default ReactSlider

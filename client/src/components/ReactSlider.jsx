import React, { Component, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import img1 from "../assets/n1.jpg"
import img2 from "../assets/n2.jpg"
import img3 from "../assets/n5.jpg"
import img4 from "../assets/n4.jpg"
import './sliders.css'
import { Link } from 'react-router-dom';
// import { GoChevronLeft } from "react-icons/go";

const ReactSlider = () => {
  const nextRef = useRef(null);
  const prevRef = useRef(null);
  const carouselRef = useRef(null);
  const listRef = useRef(null);
  const thumbnailRef = useRef(null);
  const timeRef = useRef(null);

  const items = [
    {
      img: img1,
      author: 'REACT',
      title: 'DESIGN SLIDER',
      topic: 'NATURAL',
      description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut sequi, rem magnam nesciunt minima placeat, itaque eum neque officiis unde, eaque optio ratione aliquid assumenda facere ab et quasi ducimus aut doloribus non numquam. Explicabo, laboriosam nisi reprehenderit tempora at laborum natus unde. Ut, exercitationem eum aperiam illo illum laudantium?',
      button1: 'SEE MORE',
      button2: 'LOGIN'
    },
    {
      img: img2,
      author: 'REACT',
      title: 'DESIGN SLIDER',
      topic: 'NATURAL',
      description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut sequi, rem magnam nesciunt minima placeat, itaque eum neque officiis unde, eaque optio ratione aliquid assumenda facere ab et quasi ducimus aut doloribus non numquam. Explicabo, laboriosam nisi reprehenderit tempora at laborum natus unde. Ut, exercitationem eum aperiam illo illum laudantium?',
      button1: 'SEE MORE',
      button2: 'LOGIN'
    },
    {
      img: img3,
      author: 'REACT',
      title: 'DESIGN SLIDER',
      topic: 'NATURAL',
      description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut sequi, rem magnam nesciunt minima placeat, itaque eum neque officiis unde, eaque optio ratione aliquid assumenda facere ab et quasi ducimus aut doloribus non numquam. Explicabo, laboriosam nisi reprehenderit tempora at laborum natus unde. Ut, exercitationem eum aperiam illo illum laudantium?',
      button1: 'SEE MORE',
      button2: 'LOGIN'
    },
    {
      img: img4,
      author: 'REACT',
      title: 'DESIGN SLIDER',
      topic: 'NATURAL',
      description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut sequi, rem magnam nesciunt minima placeat, itaque eum neque officiis unde, eaque optio ratione aliquid assumenda facere ab et quasi ducimus aut doloribus non numquam. Explicabo, laboriosam nisi reprehenderit tempora at laborum natus unde. Ut, exercitationem eum aperiam illo illum laudantium?',
      button1: 'SEE MORE',
      button2: 'LOGIN'
    }
  ];

  useEffect(() => {
    let nextDom = nextRef.current;
    let prevDom = prevRef.current;
    let carouselDom = carouselRef.current;
    let SliderDom = listRef.current;
    let thumbnailBorderDom = thumbnailRef.current;
    let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');
    let timeDom = timeRef.current;

    thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
    let timeRunning = 3000;
    let timeAutoNext = 7000;

    nextDom.onclick = function () {
      showSlider('next');
    };

    prevDom.onclick = function () {
      showSlider('prev');
    };

    let runTimeOut;
    let runNextAuto = setTimeout(() => {
      nextDom.click();
    }, timeAutoNext);

    function showSlider(type) {
      let SliderItemsDom = SliderDom.querySelectorAll('.carousel .list .item');
      let thumbnailItemsDom = document.querySelectorAll('.carousel .thumbnail .item');

      if (type === 'next') {
        SliderDom.appendChild(SliderItemsDom[0]);
        thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
        carouselDom.classList.add('next');
      } else {
        SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
        thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
        carouselDom.classList.add('prev');
      }
      clearTimeout(runTimeOut);
      runTimeOut = setTimeout(() => {
        carouselDom.classList.remove('next');
        carouselDom.classList.remove('prev');
      }, timeRunning);

      clearTimeout(runNextAuto);
      runNextAuto = setTimeout(() => {
        nextDom.click();
      }, timeAutoNext);
    }
  }, []);

  return (
    <>
      <div className="carousel" ref={carouselRef}>
        <div className="list" ref={listRef}>
          {items.map((item, index) => (
            <div className="item" key={index}>
              <img src={item.img} alt={`img${index + 1}`} />
              <div className="content">
                <div className="author">{item.author}</div>
                <div className="title">{item.title}</div>
                <div className="topic">{item.topic}</div>
                <div className="des">{item.description}</div>
                  {/* <button>{item.button1}</button> */}
                  <Link to="/signIn">
                <div className="buttons">

                  <button>{item.button2}</button>
                  
                </div>
                  </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="thumbnail" ref={thumbnailRef}>
          {items.map((item, index) => (
            <div className="item" key={index}>
              <img src={item.img} alt={`thumbnail${index + 1}`} />
              <div className="content">
                <div className="title">Name Slider</div>
                <div className="description">Description</div>
              </div>
            </div>
          ))}
        </div>

        <div className="arrows">
          <button id="prev" ref={prevRef}>&lt;</button>
          <button id="next" ref={nextRef}>&gt;</button>
        </div>

        <div className="time" ref={timeRef}></div>
      </div>
    </>
  );
}

export default ReactSlider

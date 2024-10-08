import React from 'react';
import { FaMapMarkedAlt, FaHotel, FaRoute, FaShieldAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="relative">
      
      <div className="absolute inset-0 bg-cover bg-center opacity-30"></div>

     
      <div className="relative container mx-auto px-6 py-12">
        <div className="bg-white shadow-lg rounded-lg p-8 md:p-16">
          
          <h2 className="text-4xl font-bold mb-6 text-center text-blue-800">
            Welcome to ExploreConnect - Your Ultimate Travel Guide to Bangladesh!
          </h2>
          <p className="text-lg text-gray-700 mb-8 text-center">
            Explore the hidden gems of Bangladesh with ease. Whether you're planning a weekend getaway or a long journey, 
            ExploreConnect is here to help you every step of the way.
          </p>

          <section className="mb-12">
            <h3 className="text-3xl font-semibold text-blue-700 mb-4">
              Our Mission
            </h3>
            <p className="text-lg text-gray-700">
              At <strong>ExploreConnect</strong>, our mission is to provide travelers with a seamless and enriching experience by offering 
              comprehensive tools to plan, explore, and book their perfect trip. We believe that every journey should be memorable, safe, and accessible to all.
            </p>
          </section>

          
          <section className="grid md:grid-cols-2 gap-8 mb-12">
            
            <div className="flex items-start">
              <FaMapMarkedAlt className="text-4xl text-blue-700 mr-4" />
              <div>
                <h4 className="text-2xl font-semibold text-blue-700 mb-2">
                  Discover Amazing Places
                </h4>
                <p className="text-lg text-gray-700">
                  ExploreConnect helps you uncover beautiful destinations, from bustling cities to remote landscapes. Our curated list of tourist spots ensures you'll never miss a must-see location.
                </p>
              </div>
            </div>

            
            <div className="flex items-start">
              <FaHotel className="text-4xl text-blue-700 mr-4" />
              <div>
                <h4 className="text-2xl font-semibold text-blue-700 mb-2">
                  Find the Best Hotels Nearby
                </h4>
                <p className="text-lg text-gray-700">
                  With our integrated hotel search, you can easily find and book accommodations that suit your budget and preferences, no matter where you're traveling.
                </p>
              </div>
            </div>

           
            <div className="flex items-start">
              <FaRoute className="text-4xl text-blue-700 mr-4" />
              <div>
                <h4 className="text-2xl font-semibold text-blue-700 mb-2">
                  Tailored Itineraries
                </h4>
                <p className="text-lg text-gray-700">
                  Choose your destination and let us create the perfect itinerary for you. From transportation options to must-visit attractions, we make travel planning a breeze.
                </p>
              </div>
            </div>

           
            <div className="flex items-start">
              <FaShieldAlt className="text-4xl text-blue-700 mr-4" />
              <div>
                <h4 className="text-2xl font-semibold text-blue-700 mb-2">
                  Travel with Confidence
                </h4>
                <p className="text-lg text-gray-700">
                  We prioritize your safety by providing real-time travel alerts, safety tips, and weather updates. Travel confidently knowing you're well-informed.
                </p>
              </div>
            </div>
          </section>

        
          <section className="text-center mt-12">
            <h3 className="text-3xl font-semibold text-blue-700 mb-4">
              Ready to Start Your Adventure?
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Explore, plan, and book your perfect trip today with ExploreConnect. Whether you're looking for hidden gems or popular tourist spots, we're here to make your travel experience smooth and unforgettable.
            </p>
            <Link to="/">
              <button className="bg-blue-600 text-white py-3 px-6 rounded-full font-bold shadow-md hover:bg-blue-700 transition">
                Start Exploring Now
              </button>
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
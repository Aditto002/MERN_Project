import React from 'react';
import { FaMapMarkedAlt, FaHotel, FaRoute, FaShieldAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Services = () => {
  return (
    <div className="relative">
      
      <div className="absolute inset-0 bg-cover bg-center opacity-30"></div>

      <div className="relative container mx-auto px-6 py-12">
        <div className="bg-white shadow-lg rounded-lg p-8 md:p-16">
          
          <h2 className="text-4xl font-bold mb-6 text-center text-blue-800">
            Our Services at ExploreConnect
          </h2>
          <p className="text-lg text-gray-700 mb-8 text-center">
            At ExploreConnect, we offer a wide range of services to ensure your travel experience is smooth and unforgettable.
          </p>

          <section className="grid md:grid-cols-2 gap-8 mb-12">
            
            <div className="flex items-start">
              <FaMapMarkedAlt className="text-4xl text-blue-700 mr-4" />
              <div>
                <h4 className="text-2xl font-semibold text-blue-700 mb-2">
                  Discover Tourist Spots
                </h4>
                <p className="text-lg text-gray-700">
                  We help you explore amazing tourist locations across Bangladesh. Our curated guides make sure you don’t miss out on must-visit places.
                </p>
              </div>
            </div>

            
            <div className="flex items-start">
              <FaHotel className="text-4xl text-blue-700 mr-4" />
              <div>
                <h4 className="text-2xl font-semibold text-blue-700 mb-2">
                  Hotel Recommendations
                </h4>
                <p className="text-lg text-gray-700">
                  Our hotel search feature provides the best accommodations that suit your preferences and budget, ensuring a comfortable stay wherever you go.
                </p>
              </div>
            </div>

           
            <div className="flex items-start">
              <FaRoute className="text-4xl text-blue-700 mr-4" />
              <div>
                <h4 className="text-2xl font-semibold text-blue-700 mb-2">
                  Customized Itineraries
                </h4>
                <p className="text-lg text-gray-700">
                  ExploreConnect helps you craft tailored itineraries that include transportation, tourist attractions, and local experiences.
                </p>
              </div>
            </div>

           
            <div className="flex items-start">
              <FaShieldAlt className="text-4xl text-blue-700 mr-4" />
              <div>
                <h4 className="text-2xl font-semibold text-blue-700 mb-2">
                  Safety First
                </h4>
                <p className="text-lg text-gray-700">
                  With real-time travel alerts and safety tips, we ensure you are well-prepared and informed, making your journey safe and stress-free.
                </p>
              </div>
            </div>
          </section>

          <section className="text-center mt-12">
            <h3 className="text-3xl font-semibold text-blue-700 mb-4">
              Ready to Explore with Us?
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Contact us today to plan your next adventure, or explore our platform to find the best travel experiences.
            </p>
            <Link to="/contact">
              <button className="bg-blue-600 text-white py-3 px-6 rounded-full font-bold shadow-md hover:bg-blue-700 transition">
                Get in Touch
              </button>
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Services;
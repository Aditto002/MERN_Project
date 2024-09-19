import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/image/gallerys'); // Fetch limited items
        setGalleryItems(response.data);
      } catch (error) {
        console.error('Error fetching gallery items:', error);
      }
    };

    fetchGalleryItems();
  }, []);

  // Function to handle click on gallery item
  const openModal = (item) => {
    setSelectedItem(item);
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedItem(null);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-5xl font-bold text-gray-800 mb-12">ExploreConnect Gallery</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryItems.map(item => (
            <div 
              key={item._id} 
              className="gallery-item bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
              onClick={() => openModal(item)}
            >
              <img 
                src={item.picture} 
                alt={item.alt} 
                className="w-full h-60 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-indigo-600 mb-4">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <Link to="/">
          <button className="mt-12 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold py-3 px-8 rounded-full hover:opacity-90 transition duration-300">
            Show More
          </button>
        </Link>
      </div>

      {/* Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full mx-4 lg:mx-0">
            <div className="relative">
              <img 
                src={selectedItem.picture} 
                alt={selectedItem.alt} 
                className="w-full h-96 object-cover rounded-t-lg"
              />
              <button 
                onClick={closeModal} 
                className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition duration-300"
              >
                &times;
              </button>
            </div>
            <div className="p-6">
              <h3 className="text-3xl font-semibold text-indigo-600 mb-4">{selectedItem.title}</h3>
              <p className="text-gray-700 text-lg">{selectedItem.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;

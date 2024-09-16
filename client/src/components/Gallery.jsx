import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);

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

  return (
    <div>
      <h2>Gallery</h2>
      <div className="gallery">
        {galleryItems.map(item => (
          <div key={item._id} className="gallery-item">
            <img src={item.picture} alt={item.alt} />
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
      <Link to="/gallery/all">
        <button>Show More</button>
      </Link>
    </div>
  );
};

export default Gallery;

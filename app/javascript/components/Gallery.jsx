import React, { useEffect, useState } from 'react';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');

  // Fetch images from the server
  const fetchImages = async () => {
    try {
      const response = await fetch('/gallery', {
        headers: {
          'Accept': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        setImages(data.images); // Assuming the response contains an `images` array
      } else {
        setError('Failed to load images.');
        console.error('Gallery fetch error:', response.statusText);
      }
    } catch (error) {
      setError('An error occurred while fetching images.');
      console.error('Gallery fetch error:', error);
    }
  };
  // Fetch images on component mount
  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div style={{ maxWidth: '800px', margin: 'auto', textAlign: 'center' }}>
      <h2>Gallery</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '10px',
        }}
      >
        {images.length > 0 ? (
          images.map((image, index) => (
            <div key={index} style={{ border: '1px solid #ccc', padding: '5px' }}>
              <img
                src={image.url} // Ensure this URL is correct and accessible
                alt={`Image ${index + 1}`}
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
          ))
        ) : (
          <p>No images to display.</p>
        )}
      </div>
    </div>
  );
};

export default Gallery;

import React, { useState, useEffect } from 'react';
import ImageUpload from './ImageUpload';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1); // Track the current page for pagination
  const [totalPages, setTotalPages] = useState(1); // Track total pages for pagination
  const [selectedImage, setSelectedImage] = useState(null); // Track the selected image for popup
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Track popup state

  // Fetch images from the server with pagination support
  const fetchImages = async (page = 1) => {
    try {
      const response = await fetch(`/gallery?page=${page}`, {
        headers: {
          Accept: 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        setImages(data.images); // Set images for current page
        setCurrentPage(page); // Update current page
        setTotalPages(data.total_pages); // Set total pages from the server
      } else {
        setError('Failed to load images.');
      }
    } catch (error) {
      setError('An error occurred while fetching images.');
      console.error('Gallery fetch error:', error);
    }
  };

  // Handle image delete
  const handleDelete = async (imageId) => {
    try {
      const response = await fetch(`/images/${imageId}`, {
        method: 'DELETE',
        headers: {
          'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
        },
      });
      if (response.ok) {
        setImages(images.filter((image) => image.id !== imageId)); // Remove from gallery
        setIsPopupOpen(false); // Close popup
      } else {
        alert('Failed to delete image.');
      }
    } catch (error) {
      alert('An error occurred while deleting the image.');
    }
  };

  // Open popup for a specific image
  const openPopup = (image) => {
    setSelectedImage(image);
    setIsPopupOpen(true);
  };

  // Close the popup
  const closePopup = () => {
    setSelectedImage(null);
    setIsPopupOpen(false);
  };

  // Fetch images on component mount or when page changes
  useEffect(() => {
    fetchImages(currentPage);
  }, [currentPage]);

  // Handle page change when clicking on pagination buttons
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      fetchImages(newPage); // Fetch images for the new page
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: 'auto', textAlign: 'center' }}>
      <h2>Gallery</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Image Upload Component */}
      <ImageUpload refreshGallery={fetchImages} />

      {/* Gallery Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '10px',
          marginTop: '20px',
        }}
      >
        {images.length > 0 ? (
          images.map((image) => (
            <div
              key={image.id}
              style={{ border: '1px solid #ccc', padding: '5px', cursor: 'pointer' }}
              onClick={() => openPopup(image)}
            >
              <img
                src={image.url}
                alt={`Image ${image.id}`}
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
          ))
        ) : (
          <p>No images to display.</p>
        )}
      </div>

      {/* Pagination Controls */}
      <div style={{ marginTop: '20px' }}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007BFF',
            color: '#FFF',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginRight: '10px',
          }}
        >
          Previous
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007BFF',
            color: '#FFF',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Next
        </button>
      </div>

      {/* Popup for Image Preview and Deletion */}
      {isPopupOpen && selectedImage && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
        >
          <div
            style={{
              position: 'relative',
              background: '#fff',
              padding: '20px',
              borderRadius: '8px',
              textAlign: 'center',
              maxWidth: '80%',
              maxHeight: '80%',
              overflow: 'auto',
            }}
          >
            <img
              src={selectedImage.url}
              alt={`Selected Image ${selectedImage.id}`}
              style={{ maxWidth: '100%', maxHeight: '70vh' }}
            />
            <div style={{ marginTop: '10px' }}>
              <button
                onClick={() => handleDelete(selectedImage.id)}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#FF0000',
                  color: '#FFF',
                  border: 'none',
                  borderRadius: '5px',
                  marginRight: '10px',
                  cursor: 'pointer',
                }}
              >
                Delete
              </button>
              <button
                onClick={closePopup}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#007BFF',
                  color: '#FFF',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;

import React, { useState } from 'react';
import { DndContext } from '@dnd-kit/core';

const ImageUpload = ({ refreshGallery }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    processFile(file);
  };

  // Process file (from input or drag-and-drop)
  const processFile = (file) => {
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  // Handle drag over
  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  // Handle drag leave
  const handleDragLeave = () => {
    setIsDragging(false);
  };

  // Handle drop
  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files[0];
    processFile(file);
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus('No file selected.');
      return;
    }

    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await fetch('/upload', {
        method: 'POST',
        headers: {
          'X-CSRF-Token': csrfToken,
        },
        body: formData,
      });

      if (response.ok) {
        setUploadStatus('Upload successful!');
        console.log('File uploaded successfully.');
        // Refresh the gallery after a successful upload
        if (typeof refreshGallery === 'function') {
          refreshGallery();
        }
      } else {
        setUploadStatus('Upload failed.');
        console.error('Upload error:', response.statusText);
      }
    } catch (error) {
      setUploadStatus('An error occurred during upload.');
      console.error('Upload error:', error);
    }
  };

  return (
    <DndContext onDragOver={handleDragOver} onDragEnd={handleDragLeave}>
      <div style={{ maxWidth: '400px', margin: 'auto', textAlign: 'center' }}>
        <h2>Image Upload</h2>

        {/* Dropbox Area */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          style={{
            border: isDragging ? '2px dashed #007BFF' : '2px dashed #CCC',
            borderRadius: '10px',
            padding: '20px',
            marginBottom: '20px',
            backgroundColor: isDragging ? '#f0f8ff' : '#f9f9f9',
            textAlign: 'center',
            cursor: 'pointer',
          }}
        >
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Preview"
              style={{ width: '100%', maxHeight: '200px', objectFit: 'cover' }}
            />
          ) : (
            <p>Drag & drop an image here, or click to select a file.</p>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
            id="fileInput"
          />
          <label htmlFor="fileInput" style={{ cursor: 'pointer', color: '#007BFF' }}>
            Browse Files
          </label>
        </div>

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007BFF',
            color: '#FFF',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Upload
        </button>
        {uploadStatus && <p style={{ marginTop: '10px' }}>{uploadStatus}</p>}
      </div>
    </DndContext>
  );
};

export default ImageUpload;

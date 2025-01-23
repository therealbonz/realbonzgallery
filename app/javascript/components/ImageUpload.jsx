import React, { useState } from 'react';

const ImageUpload = ({ refreshGallery }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const handleRemoveFile = (index) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      setUploadStatus('No files selected.');
      return;
    }

    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    const formData = new FormData();
    selectedFiles.forEach((file) => formData.append('images[]', file));

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
        setSelectedFiles([]);
        if (typeof refreshGallery === 'function') {
          refreshGallery();
        }
      } else {
        setUploadStatus('Upload failed.');
      }
    } catch (error) {
      setUploadStatus('An error occurred during upload.');
      console.error('Upload error:', error);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', textAlign: 'center' }}>
      <h2>Image Upload</h2>
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        style={{
          border: '2px dashed #ccc',
          borderRadius: '10px',
          padding: '20px',
          marginBottom: '20px',
          backgroundColor: '#f9f9f9',
          textAlign: 'center',
          cursor: 'pointer',
        }}
      >
        <p>Drag & drop images here, or click to select files.</p>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          multiple
          style={{ display: 'none' }}
          id="fileInput"
        />
        <label htmlFor="fileInput" style={{ cursor: 'pointer', color: '#007BFF' }}>
          Browse Files
        </label>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
          gap: '10px',
          marginBottom: '20px',
        }}
      >
        {selectedFiles.map((file, index) => (
          <div key={index} style={{ position: 'relative' }}>
            <img
              src={URL.createObjectURL(file)}
              alt={`Preview ${index + 1}`}
              style={{ width: '100%', height: 'auto', borderRadius: '5px' }}
            />
            <button
              onClick={() => handleRemoveFile(index)}
              style={{
                position: 'absolute',
                top: '5px',
                right: '5px',
                background: '#FF0000',
                color: '#FFF',
                border: 'none',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                cursor: 'pointer',
                fontSize: '12px',
                lineHeight: '18px',
                textAlign: 'center',
              }}
            >
              ×
            </button>
          </div>
        ))}
      </div>

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
  );
};

export default ImageUpload;

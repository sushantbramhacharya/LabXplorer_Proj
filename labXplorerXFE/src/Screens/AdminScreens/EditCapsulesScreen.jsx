import React, { useState, useEffect } from 'react';
import CapsuleForm from '../../Components/Admin/CapsuleForm';
import axios from 'axios';
import { BASE_URL } from '../../constants';
import { useParams } from 'react-router-dom'; // Assuming you're using React Router for routing

export const EditCapsules = () => {
  const { capsuleId } = useParams(); // Get the capsule ID from the URL
  const [capsule, setCapsule] = useState(null);

  useEffect(() => {
    const fetchCapsule = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/capsule?capsuleId=${capsuleId}`);
        setCapsule(response.data);
      } catch (error) {
        console.error('Error fetching capsule data:', error);
      }
    };

    fetchCapsule();
  }, [capsuleId]);

  const onSave = async (formData) => {
    const data = new FormData();
    data.append('id', formData.id); // Include the ID in the form data
    data.append('title', formData.title);
    data.append('description', formData.description);

    if (formData.thumbnail) {
      const thumbnailBlob = await fetch(formData.thumbnail).then(res => res.blob());
      data.append('thumbnail', thumbnailBlob, 'thumbnail.jpg');
    }

    // Handle images
    const imagePromises = formData.images.map(async (file, index) => {
      const blob = await fetch(file).then(res => res.blob());
      data.append('images', blob, `image_${index}.jpg`);
    });

    await Promise.all(imagePromises);

    // Handle PDF
    if (formData.pdf) {
      const pdfBlob = await fetch(formData.pdf).then(res => res.blob());
      data.append('pdf', pdfBlob, 'document.pdf');
    }

    data.append('category', formData.category);
    data.append('content', formData.content);
    data.append('simulators', formData.simulators);

    try {
      const response = await axios.put(`${BASE_URL}/admin/edit-capsule`, data, { // Remove ID from URL
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Capsule updated:', response.data);
      location.href = '/';
    } catch (error) {
      console.error('Error updating capsule:', error);
    }
  };

  return (
    <>
      {capsule ? (
        <CapsuleForm capsule={capsule} onSave={onSave} />
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

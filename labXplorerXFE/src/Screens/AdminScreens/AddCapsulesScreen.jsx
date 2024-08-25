import React from 'react';
import CapsuleForm from '../../Components/Admin/CapsuleForm';
import axios from 'axios';
import { BASE_URL } from '../../constants';

export const AddCapsules = () => {
  const onSave = async (formData) => {
    const data = new FormData();
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
      console.log("gonna go");
      
      const response = await axios.post(`${BASE_URL}/admin/add`, data, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      
      location.href='/'
    } catch (error) {
      console.error('Error saving capsule:', error);
    }
  };

  return (
    <>
      <CapsuleForm onSave={onSave} />
    </>
  );
};

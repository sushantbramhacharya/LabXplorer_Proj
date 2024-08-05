import React from 'react'
import CapsuleForm from '../../Components/Admin/CapsuleForm'
import axios from 'axios'
import {BASE_URL} from '../../constants'

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
     const  imagePromises = formData.images.map(async (file, index) => {
      const blob = await fetch(file).then(res => res.blob());
      data.append('images', blob, `image_${index}.jpg`);
    });

    await Promise.all(imagePromises)
  
    data.append('category', formData.category);
    data.append('content', formData.content)
    try {
      console.log("gonna go");
      
      const response = await axios.post(BASE_URL+'/admin/add', data, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      onSave(response.data);
    } catch (error) {
      console.error('Error saving capsule:', error);
    }
  };
  return (
    <>
    <CapsuleForm onSave={onSave}/>
    </>
  )
}

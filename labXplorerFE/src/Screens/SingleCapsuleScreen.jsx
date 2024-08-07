import React from 'react'
import { useParams } from "react-router-dom";
import SingleCapsuleContents from '../Components/SingleCapsuleContents';

const SingleCapsuleScreen = () => {
  const { id } = useParams(); // Get ID from URL params
  return (
    <>
     <SingleCapsuleContents id={id}/>
    </>
  )
}

export default SingleCapsuleScreen
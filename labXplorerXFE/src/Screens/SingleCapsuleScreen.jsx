import React from 'react'
import { useParams } from "react-router-dom";
import SingleCapsuleContents from '../Components/SingleCapsuleContents';
import Comments from '../Components/Comments';

const SingleCapsuleScreen = () => {
  const { id } = useParams(); // Get ID from URL params
  return (
    <>
     <SingleCapsuleContents id={id}/>
     <Comments capsuleId={id}/>
    </>
  )
}

export default SingleCapsuleScreen
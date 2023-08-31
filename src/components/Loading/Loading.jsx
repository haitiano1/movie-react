import React from 'react'
import '../Loading/styleLoading.css'
import { useSelector } from 'react-redux';
export default function Loading() {

  const { isLoading } = useSelector(state => state.movieReducer)

  return (
    <>
      {isLoading ? <div className="loader-container">
        <div className="spinner"></div>
      </div> : ''}
    </>

  );
};

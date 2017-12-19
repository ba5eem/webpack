import React, { Component } from 'react';
import img from 'images/img';
import sky from 'images/sky';


const hello = () => {
  return(
    <div className="container">
      <div className="image-wrapper">
        <img src={img} alt="" className="image-wrapper__image"/>
      </div>
      <div className="image-wrapper">
        <img src={sky} alt="" className="image-wrapper__image"/>
      </div>
    </div>
  )
}

export default hello;
import React from 'react'

import './Hero.css';
import CreateTemplate from './CreateTemplate';
import UseTemplate from './UseTemplate';

const Hero = () => {
  return (
    <div className='DTA__hero_container'>
      <CreateTemplate />
      <UseTemplate />
    </div>
  )
}

export default Hero

import React from 'react';
import {NavBar,Footer,Hero} from './Components';
// import NavBar from '../src/Components/NavBar/NavBar';
import './App.css'
const App = () => {
  return (
      <div className = "main_app">
        <NavBar />
        <Hero />
        <Footer />
      </div>
  )
}


export default App

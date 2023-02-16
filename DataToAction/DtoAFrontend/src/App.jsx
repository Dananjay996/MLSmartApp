import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {NavBar,Footer,Hero,AddTemplate,GetFile} from './Components';
// import NavBar from '../src/Components/NavBar/NavBar';
import './App.css'
const App = () => {
  return (
      <div className = "gradient-bg-welcome">
        
        <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<Hero/>}/>
          <Route path='/add' element={<AddTemplate/>}/>
          <Route path='/get' element={<GetFile/>}/>
        </Routes>
        <Footer />
        </BrowserRouter>
        
      </div>
  )
}


export default App

import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {NavBar,Footer,Hero,AddTemplate,GetFile} from './Components';
import './App.css'

const App = () => {
  return (
      <div className = "gradient-bg-welcome">
        <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='https://ml-smart-app.vercel.app/' element={<Hero/>}/>
          <Route path='https://ml-smart-app.vercel.app/add' element={<AddTemplate/>}/>
          <Route path='https://ml-smart-app.vercel.app/get' element={<GetFile/>}/>
        </Routes>
        <Footer />
        </BrowserRouter>
      </div>
  )
}


export default App

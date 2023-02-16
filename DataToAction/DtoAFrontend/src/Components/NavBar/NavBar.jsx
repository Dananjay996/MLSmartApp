import {useState} from 'react';
import React from 'react'
import './NavBar.css';
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";

const NavBarItem = ({title,className}) => {
  <li className = {className}> {title} </li>
}

const NavBar = () => {

  const [toggleMenu,setTogglMenu] = useState(false);

  return (
    <div>
      
    </div>
  )
}

export default NavBar

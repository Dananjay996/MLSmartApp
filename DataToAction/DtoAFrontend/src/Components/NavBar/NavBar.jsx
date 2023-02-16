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
    <nav className = "DTA__navbar_main">
      <div className = "DTA__navbar_main_image">
        <img src = "#" alt="image not found" className="DTA__navbar_main_image_imageElement" />
      </div>

      <ul className="DTA__navbar_main_list">
        {["Admin", "User", "Contact"].map((item,index) => (
          <NavBarItem key={item+index} title={item} className="DTA__navbar_main_list_item "/>
        ))}

        <li className="DTA__navbar_main_list_login">
          Login
        </li>

      </ul>

    </nav>
  )
}

export default NavBar

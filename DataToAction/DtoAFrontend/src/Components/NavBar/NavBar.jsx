//import {useState} from 'react';
import React from 'react'
import './NavBar.css';
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import logo from '../../../images/logo.png';

const NavBarItem = ({title,classprops}) => (
  <li className= {`DTA__navbar_list_general_style ${classprops}`}> {title} </li>
)

const NavBar = () => {

  const [toggleMenu,setToggleMenu] = React.useState(false);

  return (
    <nav className = "DTA__navbar_main">
      <div className = "DTA__navbar_main_image">
        <img src = {logo} alt="image not found" className="DTA__navbar_main_image_imageElement" />
      </div>

      <ul className="DTA__navbar_main_list">
        {["Admin", "User", "Contact"].map((item,index) => (
          <NavBarItem key={item + index} title={item}/>
        ))}

        <li className="DTA__navbar_main_list_login">
          Login
        </li>
      </ul>

      <div className = "DTA__navbar_main_menu">
        {!toggleMenu && (
          <HiMenuAlt4 fontSize={28} className="DTA__navbar_main_menuopen" onClick={() => setToggleMenu(true)} />
        )}
        {toggleMenu && (
          <AiOutlineClose fontSize={28} className="DTA__navbar_main_menuclose" onClick={() => setToggleMenu(false)} />
        )}
        {toggleMenu && (
          <ul
            className="DTA__navbar_main_menu_smallscreen_display blue-glassmorphism">
            <li className="DTA__navbar_main_menu_smallscreen_display_item"><AiOutlineClose onClick={() => setToggleMenu(false)} /></li>
            {["Admin","User","Contact"].map(
              (item, index) => <NavBarItem key={item + index} title={item} classprops="DTA__navbar_main_menu_smallscreen_dropdown" />,
            )}
          </ul>
        )}
      </div>

    </nav>
  )
}

export default NavBar

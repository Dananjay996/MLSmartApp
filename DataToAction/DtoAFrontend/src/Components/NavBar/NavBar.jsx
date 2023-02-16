//import {useState} from 'react';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import './NavBar.css';
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import logo from '../../../images/logo.png';

<<<<<<< HEAD
const NavBarItem = ({title,classprops}) => (
  <li className= {`DTA__navbar_list_general_style ${classprops}`}> <a>{title}</a> </li>
=======
const NavBarItem = ({title,classprops,link}) => (
  <a className= {`DTA__navbar_list_general_style ${classprops}`} href={link}> {title} </a>
>>>>>>> baacba19c7b1b9de3248bdd47710fc23b191b24d
)

const NavBar = () => {
  const navigate = useNavigate();
  const [toggleMenu,setToggleMenu] = React.useState(false);

  return (
    <nav className = "DTA__navbar_main">
      <div className = "DTA__navbar_main_image">
        <img src = {logo} alt="image not found" className="DTA__navbar_main_image_imageElement" />
      </div>

      <ul className="DTA__navbar_main_list">
        <NavBarItem key={"Admin"} title={"Admin"} link={"/add"}/>
        <NavBarItem key={"User"} title={"User"} link={"/get"}/>
        <NavBarItem key={"Contact"} title={"Contact"} link={"#contact"}/>

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

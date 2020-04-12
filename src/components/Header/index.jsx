import React from "react";
import Button from '@material-ui/core/Button';
import "./stylesHeader.css";
import logo from './logoHeader.png';
import { Link } from "react-router-dom";

  export default function Header() {

    return (
      <div className="Header">
        <header id ="main-header" > 
        <img src={logo} alt="logo" />
        <Button > <Link to="/home"><p2>Home</p2></Link></Button>
        <Button > <Link to="/about"><p2>About</p2></Link></Button>
        <Button > <Link to="/pricing"><p2>Pricing </p2></Link></Button>
        </header>
              
       </div>
    );
  }
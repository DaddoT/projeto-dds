import React from "react";
import Button from '@material-ui/core/Button';
import "./styles.css";
import logo from './logoHeader.png';
import { Link } from "react-router-dom";

  export default function Header() {

    return (
      <div className="Header">
        <header id ="main-header" > 
        <img src={logo} alt="logo" />
        <Button > <Link to="/home"><p>Home</p></Link></Button>
        <Button > <Link to="/about"><p>About</p></Link></Button>
        <Button > <Link to="/pricing"><p>Pricing </p></Link></Button>
        <Button > <p>Link </p></Button>
        </header>
              
       </div>
    );
  }
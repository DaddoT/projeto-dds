import React from "react";
import Button from '@material-ui/core/Button';
import "./styles.css";
import logo from './logoHeader.png';
// import Typography from '@material-ui/core/Typography';
// import Container from '@material-ui/core/Container';

  export default function Header() {

    return (
      <div className="Header">
        <header id ="main-header" > 
        <img src={logo} alt="logo" />
        <Button > <p>About </p></Button>
        <Button > <p>Pricing </p></Button>
        <Button > <p>Link </p></Button>
        </header>
              
       </div>
    );
  }
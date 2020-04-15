import React from "react";
import Button from '@material-ui/core/Button';
import "./stylesHeader.css";
import logo from './logoHeader.png';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  p: {
    fontFamily: 'monospace',
    color: 'white',
  },
  }));

  export default function Header() {
    var classes = useStyles();

    return (
      <div className="Header">
        <header id ="main-header" > 
        <img src={logo} alt="logo" />
        <Button > <Link to="/home"><p className={classes.p}>Home</p></Link></Button>
        <Button > <Link to="/about"><p className={classes.p}>About</p></Link></Button>
        <Button > <Link to="/pricing"><p className={classes.p}>Pricing </p></Link></Button>
        </header>
              
       </div>
    );
  }
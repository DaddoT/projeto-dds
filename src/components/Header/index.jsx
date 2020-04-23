import React, {useState, } from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import StepButton from '@material-ui/core/StepButton';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import "./stylesHeader.css";
import logo from './logoHeader.png';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  space: {
    flexGrow: 1,
  },
  button: {
    fontFamily: "monospace",
    color: "white",
    fontWeight: "normal",
    fontSize: "15px",
    textDecoration: "none",
  },
  profile: {
    color: 'black',
    textDecoration: "none",
  },
}));

  export default function Header(props) {
    
    const classes = useStyles();
    const [auth, setAuth] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
  
    const handleChange = (event) => {
      setAuth(event.target.checked);
    };
  
    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  

    return (
      <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className="bar">
          
          <img src={logo} className="logo-img" alt="logo"/>

          <Link to="/"       className={classes.button}><Button color="inherit">Home</Button></Link>
          <Link to="/about"  className={classes.button}><Button color="inherit">About</Button></Link>
          <Link to="/pricing"className={classes.button}><Button  color="inherit">Pricing</Button></Link>
        
          {/* kkkk */}
          <div className={classes.space}></div>

          {props.user !== null ? (
            <div >
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <Link to="/profile" className={classes.profile}><MenuItem onClick={handleClose}>Profile</MenuItem></Link>
              </Menu>
            </div>
          ): (
            <Link to="signin"><Button className={classes.button} color="inherit">Login</Button></Link>
          )}

        </Toolbar>
      </AppBar>
              
       </div>
    );
  }
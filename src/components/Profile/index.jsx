import React from "react";
import {Button} from "@material-ui/core";
import { fb, database, auth } from '../firebase.js';
import { Link, useHistory } from "react-router-dom";
import './stylesProfile.css';
import { makeStyles } from '@material-ui/core/styles';
import Header from '../Header';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';

export default function ProfilePage(props){
  var history = useHistory();

  console.log(props)

  const signOut = ()=>{
    auth.signOut().then(()=>{
      history.push("signin");
    }).catch();

  };

  const drawerWidth = 200;

  const useStyles = makeStyles((theme) => ({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    drawerPaper: {
      width: drawerWidth,
      backgroundColor: '#282828',
    },
    p: {
      fontFamily: 'monospace',
      color: 'white',
      fontSize: '12px',
      marginLeft: '10px',
    },
    log: {
      fontFamily: 'monospace',
      color: 'white',
      fontSize: '15px',
      marginLeft: '10px',
      marginTop: '-18px',
    },
  }));

    const classes = useStyles()

  return (

<div className="Page">
    <AppBar position="fixed" className={classes.appBar}>
        <Header {...props}/>
    </AppBar>
  <Drawer className={classes.drawer} variant="permanent" classes={{ paper: classes.drawerPaper, }} >
    <div className="ButtonsDash">
      <Button color="default" ><Link to="/empresa"><p className={classes.p}>Registrar empresa</p></Link></Button>
      <Button color="default" ><Link to="/empresarial"><p className={classes.p}>Registrar empresarial</p></Link></Button> 
      <div className="ButtonsDeslog">
      <Button color="default" onClick={()=>signOut()}><p className={classes.p}>Deslogar</p></Button>
      </div>
    </div>
  </Drawer>

    <div className="dashboard" >
    <p className={classes.log}>Olá, {props.user[1]}</p>  
    </div>
  </div>
  );
}


import React from "react";
import {Button} from "@material-ui/core";
import { fb, database, auth } from '../firebase.js';
import { Link, useHistory } from "react-router-dom";
import './stylesProfile.css';
import { makeStyles } from '@material-ui/core/styles';

export default function ProfilePage(){
  var history = useHistory();


  const signOut = ()=>{
    auth.signOut().then(()=>{
      history.push("home");
    }).catch();

  };

  const useStyles = makeStyles((theme) => ({
    p: {
      fontFamily: 'monospace',
      color: 'white',
      fontSize: '15px',
    },
    }));

    const classes = useStyles()

  return (
<div className="Page">
  <div className="Options">

  <div className="ButtonsDash">
    <Button color="default" fullWidth><p className={classes.p}>Registrar empresa</p></Button>
    <div id="divider" />
    <Button color="default" fullWidth ><p className={classes.p}>Registrar empresarial</p></Button>
    </div>
      
      <div className="ButtonsDeslog">
    <Button color="default"  onClick={()=>signOut()}><p className={classes.p}>Deslogar</p></Button> <br></br> <br></br> 
      </div>

  </div>

  <div className="dashboard" >

    

  </div>  

</div>
  );
}


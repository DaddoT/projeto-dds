import React from "react";
import {Button} from "@material-ui/core";
import { fb, database, auth } from '../firebase.js';
import { Link, useHistory } from "react-router-dom";
import './stylesProfile.css';
import { makeStyles } from '@material-ui/core/styles';
import Header from '../Header';


export default function ProfilePage(props){
  var history = useHistory();

  console.log(props)

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

<div className="Profile">
  <Header/>
  <div className="Page">

    <div className="Options">

    <div className="ButtonsDash">
      <Button color="default" ><Link to="/empresa"><p className={classes.p}>Registrar empresa</p></Link></Button>
      <div id="divider" />
      <Button color="default" ><p className={classes.p}>Registrar empresarial</p></Button>
      </div>
      <div className="ButtonsDeslog">
      <Button color="default"  onClick={()=>signOut()}><p className={classes.p}>Deslogar</p></Button> <br></br> <br></br> 
      </div>
    </div>

    <div className="dashboard" >

      <p className={classes.p}>Logged as {props.user[1]}</p>

    </div>  
  </div>
</div>
  );
}


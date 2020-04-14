import React from "react";
import {Button} from "@material-ui/core";
import { fb, database, auth } from '../firebase.js';
import { Link, useHistory } from "react-router-dom";
import './stylesProfile.css';

export default function ProfilePage(){
  var history = useHistory();

  auth.onAuthStateChanged(function(user) {
    if (!user) {
      history.push("home");
      return;
    }
    
  });

  const signOut = ()=>{
    auth.signOut().then(()=>{
      history.push("home");
    }).catch();

  };

  return (
<div className="Page">
  <div className="Options">

  <div className="ButtonsDash">
    <Button color="default" ><p4>Registrar empresa</p4></Button>
    <div id="divider" />
    <Button color="default" ><p4>Registrar empresarial</p4></Button>
    </div>
      
      <div className="ButtonsDeslog">
    <Button color="default"  onClick={()=>signOut()}><p4>Deslogar</p4></Button> <br></br> <br></br> 
      </div>

  </div>

  <div className="dashboard" >

    

  </div>  

</div>
  );
}


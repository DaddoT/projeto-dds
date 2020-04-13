import React from "react";
import {Button} from "@material-ui/core";
import { fb, database, auth } from '../firebase.js';
import { Link, useHistory } from "react-router-dom";

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
    <Button variant="contained" color="default" onClick={()=>signOut()}>Deslogar</Button>
  );
};


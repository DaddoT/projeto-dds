

import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Link, useHistory } from "react-router-dom";
import { database, auth, } from '../firebase.js';
import Header from '../Header';


const Index = (props)=> {
    console.log(props.user);
    return (

        <div>
            <Header {...props}/>
            <h1></h1>
        </div>
    )
}

export default Index;
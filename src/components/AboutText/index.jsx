import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import './styles.css';
import Header from '../Header';

export default function AboutText(props) {


  const useStyles = makeStyles((theme) => ({
    p: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'monospace',
    color: 'white',
    fontSize: '15px',
    }, 
    }));

    const classes = useStyles()

    return(
        <div>
          <Header {...props}/>
        <h1>Lorem ipsum dolor sit amet </h1> 

          <div className="dashboardAbout" >

            

          </div>  
        </div>
    );
}
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import './styles.css';

export default function AboutText() {


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
        <h1>Lorem ipsum dolor sit amet </h1> <br></br>

        <p className={classes.p}>a</p>
        </div>
    );
}
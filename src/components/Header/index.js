import React from "react";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import "./styles.css";

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(0),
      },
    },
  }));
  
  export default function TextButtons() {
    const classes = useStyles();
  
    return (
      <div className={classes.root}>
        <header id ="main-header"> 
        <Button > <p>Default Link </p></Button>
        <Button > <p>Default Link </p></Button>
        <Button > <p>Default Link </p></Button>
        </header>
      </div>
    );
  }
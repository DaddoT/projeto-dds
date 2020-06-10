import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import './stylesOptions.css';


export default function Options() {

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    buttons: {
      marginLeft: theme.spacing(63),
      marginRight: theme.spacing(1),
      marginTop: '240px',
      display: 'flex',
      width: '40ch',
    },
  }));

  const classes = useStyles();

  return (
    <div className="Options">
      <h2>Selecione sua categoria de usuário</h2>
      <div className={classes.buttons}>
        <Button variant="contained" color="default" fullWidth> <Link to="/signupuser"> <p>Usuário</p> </Link> </Button>
        <div id="divider" />
        <Button variant="contained" color="default" fullWidth> <Link to="/signupempresa"> <p>Empresa</p> </Link> </Button>
        <div id="divider" />
        <Button variant="contained" color="default" fullWidth> <Link to="/signupempresarial"> <p>Empresarial</p> </Link> </Button>
      </div>
    </div>
  );
}
import React from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import "./styles.css";

export default function Inputs() {

return (
<div id="inputs">
<form className="Inputs" noValidate autoComplete="off">
  <TextField label="Email" variant="filled" type="email"/> <br></br><br></br>
  <TextField label="Senha" variant="filled" type="password"/> <br></br><br></br>
  <div id="buttons">
  <Button variant="contained" color="default">
  Sign in
  </Button>
  <div id="divider"/>
  <Button variant="contained" color="primary">
  Sign up
  </Button>
  </div>
</form>
</div>
);
}

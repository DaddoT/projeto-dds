import React from "react";
import {TextField , Button} from "@material-ui/core";
import { fb, database, auth } from '../firebase.js';
import { Link, useHistory } from "react-router-dom";
import './stylesProfile.css';
import { makeStyles } from '@material-ui/core/styles';
import Header from '../Header';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Select from '@material-ui/core/Select/Select';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';


export default function ProfilePage(props){
  var history = useHistory();
  const rows = [
    // mapeamento
  ];

  console.log(props)

  const signOut = ()=>{
    auth.signOut().then(()=>{
      history.push("signin");
    }).catch();

  };

  const drawerWidth = 200;

  const useStyles = makeStyles((theme) => ({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    drawerPaper: {
      width: drawerWidth,
      backgroundColor: '#282828',
    },
    p: {
      fontFamily: 'monospace',
      color: 'white',
      fontSize: '12px',
      marginLeft: '10px',
      textDecoration: 'none',
    },
    deslog: {
    fontFamily: 'monospace',
    color: 'white',
    fontSize: '12px',
    marginLeft: '10px',
    textDecoration: 'none',  
    marginLeft: '45px', 
    marginTop: '65vh',
    },
    log: {
      fontFamily: 'monospace',
      color: 'white',
      fontSize: '15px',
      marginLeft: '10px',
      marginTop: '-38px',
    },
    table: {
      marginTop: '5vh',
      marginLeft: '75vh',
      width: '50%'
    },
    form: {
      marginLeft: '20px',
      marginTop: '2vh',
    },
    divider: {
      minWidth: '10px',
      height: 'auto',
      display: 'inline-block',
    },
    horarios: {
      width: '25vh',
    },
    container: {
    position: 'absolute',
    top: '5vh',
    marginLeft: '20px',
    backgroundColor: 'white',
    width: '40%',
    height: '45vh',
    borderRadius: '15px 50px 15px',
    fontFamily: 'monospace',
    fontSize: '15px',
    },
  }));

    const classes = useStyles()

  return (

<div className="Page">
    <AppBar position="fixed" className={classes.appBar}>
        <Header {...props}/>
    </AppBar>
  <Drawer className={classes.drawer} variant="permanent" classes={{ paper: classes.drawerPaper, }} >
    <div className="ButtonsDash">
      <Button color="default" ><Link to="/empresa" className={classes.p}>Registrar empresa</Link></Button>
      <Button color="default" ><Link to="/empresarial" className={classes.p}> Registrar empresarial</Link></Button> 
      {/* <div className={classes.deslog}> */}
      <Button color="default" onClick={()=>signOut()} className={classes.deslog}>Deslogar</Button>
      {/* </div> */}
    </div>
  </Drawer>

     <div className="dashboard" > {/* dashboard */}
     {/* <p className={classes.log}>Olá, {props.user[1]}</p>   */}
     <div className={classes.container}>  
      <form className={classes.form}>
      <h1>Acessos de usuário</h1> <br />
        <TextField required variant="outlined" name="email" type="email" label="Seu Email" /> <div className={classes.divider}  />
        <Select native variant="outlined" size="small"name="empresaMae" required  >
                    <option aria-label="None" value="">Selecione uma empresa</option>
                    {/* {empresaMae.map((e)=>{
                        return (<option value={e._key}>{e.data.fantasia}</option>)
                    })} */}
                    </Select> <br/>
        <br/> 
        <div className={classes.horarios}>
        <TextField id="time" label="Horario de chegada" type="time" className={classes.horario} fullWidth InputLabelProps={{shrink: true,}}inputProps={{step: 300, }} />   
        <TextField id="time" label="Horario de saída"   type="time" className={classes.horario} fullWidth InputLabelProps={{shrink: true,}}inputProps={{step: 300, }} />
        </div> <br />
        <Button type="submit" variant="contained" color="default">Conceder</Button> 
      </form>
      </div>
    <Card className={classes.table}>
    <CardContent>
      <TableContainer>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>nome do user</TableCell>
            <TableCell> status</TableCell>
            <TableCell> horario</TableCell>
            <TableCell align="right"> Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

        <TableCell>falso </TableCell>
        <TableCell>nome</TableCell>
        <TableCell>mentiroso</TableCell>

        <TableCell align="right">

        <IconButton align="right">   
          <DeleteIcon />
        </IconButton>
        <IconButton align="right">
          <EditIcon />
        </IconButton>

        </TableCell>

        </TableBody>
      </Table>
    </TableContainer>
    </CardContent>
</Card>
    </div>
  </div>
  );
}


import React, {useState, useEffect} from "react";
import {TextField , Button} from "@material-ui/core";
import { database, auth } from '../firebase.js';
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
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';


export default function ProfilePage(props){
  var history = useHistory();
  
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
      backgroundColor: 'rgba(255,255,255,0.5)',
    },
    p: {
      fontFamily: 'monospace',
      color: '#040404',
      fontSize: '12px',
      marginLeft: '10px',
      textDecoration: 'none',
    },
    deslog: {
      fontFamily: 'monospace',
      color: '#040404',
      fontSize: '12px',
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

    const tpl = {
      horac: "",
      horas: "",
      email: "",
    }

    const [state, setState] = useState(tpl);
    const [acessos, setAcessos] = useState([]);
    const [editing, setEditing] = useState(null);

    useEffect(() => {
      const unsubscribe = database.collection("acessos").where('uid', '==', props.user[0])
      .onSnapshot((query) => {
          let docs = [];
          query.forEach((doc) => {
              const data  = doc.data();

              docs.push({
                  _key: doc.id,
                  data: data,
              })
          })

          setAcessos(docs)
      })
      return unsubscribe;
  },[])

  const handleChange = (e, ref=false, doc="")=>{
    const {name, value} = e.currentTarget;   
        setState({
            ...state, 
            [name]: value
        });
        console.log(state)
}
    
  const submit = (e) =>{
    e.preventDefault();
    if (editing !== null){
        database.collection("acessos").doc(editing).update(state).then((e)=>{
          setEditing(false);
          setState(tpl);
        }).catch((e)=>{
            console.log(e);
        })
    } else {

        console.log(props.user[0])
        database.collection("acessos").add({...state, uid: props.user[0]}).then((e)=>{
          setState(tpl);
        }).catch((e)=>{
            console.log(e);
        })
    }
  }

  const editElem = (key) =>{
    setEditing(key);
    let enty = acessos.filter((e)=> e._key === key);
    setState(enty[0].data);
    //setSelectKey(enty[0].data.empresaMae.id)
  }
  const deleteElem = (key) =>{
      if (window.confirm("Você tem certeza que deseja deletar?")){
          database.collection("acessos").doc(key).delete().then(()=>{      
              setAcessos(acessos.filter((e)=> e._key !== key));
              alert("Deletado com sucesso!")
          }).catch(()=>{
              alert("Erro ao deletar")
          })
      }
  }


  return (

    <div className="Page">
        <AppBar position="fixed" className={classes.appBar}>
            <Header {...props}/>
        </AppBar>
      <Drawer className={classes.drawer} variant="permanent" classes={{ paper: classes.drawerPaper, }} >
        <div className="ButtonsDash">
          <Button color="default" ><Link to="/empresa" className={classes.p}>Registrar empresa</Link></Button>
          <Button color="default" ><Link to="/empresarial" className={classes.p}> Registrar empresarial</Link></Button> 
          <Button color="default" onClick={()=>signOut()} className={classes.deslog}>Deslogar</Button>
        </div>
      </Drawer>

        <div className="dashboard" >
          <div className={classes.container}>  
            <form className={classes.form} onSubmit={(e)=>submit(e)}>
            <h1>Acessos de usuário</h1> <br />
              <TextField onBlur={handleChange} onChange={handleChange} value={state.email} required variant="outlined" name="email" type="email" label="Seu Email" /> <div className={classes.divider}  />
              <br/> 
              <div className={classes.horarios}>
              <TextField onBlur={handleChange} onChange={handleChange} value={state.horac} required name="horac" label="Horario de chegada" type="datetime-local" className={classes.horario} fullWidth InputLabelProps={{shrink: true,}}inputProps={{step: 300, }} />   
              <TextField onBlur={handleChange} onChange={handleChange} value={state.horas} required name="horas" label="Horario de saída"   type="datetime-local" className={classes.horario} fullWidth InputLabelProps={{shrink: true,}}inputProps={{step: 300, }} />
              </div> <br />
                        <Button type="submit" variant="contained" color="default">{editing ? "Editar" : "Conceder"}</Button> 
            </form>
          </div>
          <Card className={classes.table}>
            <CardContent>
              <TableContainer>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>E-mail</TableCell>
                      <TableCell> Horario Entrada</TableCell>
                      <TableCell> Horario Saida</TableCell>
                      <TableCell align="right"> Ações</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  {acessos.map((el)=>{
                    return (
                      <TableRow key={el._key}>
                      <TableCell>{el.data.email}</TableCell>
                      <TableCell>{el.data.horac}</TableCell>
                      <TableCell>{el.data.horas}</TableCell>
                      <TableCell align="right">
                        <IconButton onClick={(e)=>deleteElem(el._key)} align="right">   
                          <DeleteIcon />
                        </IconButton>
                        <IconButton onClick={(e)=>editElem(el._key)} align="right">
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                      </TableRow>
                    )
                  })}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </div>
      </div>
  );
}


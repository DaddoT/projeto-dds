import React, { useState, useEffect } from "react";
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Header from '../Header/index'
import { TextField, Button } from "@material-ui/core";
import { database, auth } from '../firebase.js';
import { Link, useHistory } from "react-router-dom";
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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TablePagination from '@material-ui/core/TablePagination';

const drawerWidth = 200;

export default function ProfilePage(props) {


  var history = useHistory();

  console.log(props)

  const signOut = () => {
    auth.signOut().then(() => {
      history.push("signin");
    }).catch();

  };

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      // background: 'rgba(255,255,255,0.5)',
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
      // background: 'rgba(255,255,255)',
      backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[100] : theme.palette.grey[700],
      height: '100%',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(2),
      background: 'rgba(255,255,255,0)',
    },
    container: {
      backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[100] : theme.palette.grey[700],
      marginRight: '0%',
      paddingLeft: '10px',
      borderRadius: '10px',
    },
    space: {
      flexGrow: 1,
    },
    p: {
      fontFamily: 'Sans-serif',
      color: '#040404',
      fontSize: '12px',
      marginLeft: '2vh',
      marginTop: '2vh',
      textDecoration: 'none',
    },
    deslog: {
      color: '#040404',
      fontSize: '12px',
      textDecoration: 'none',
      marginLeft: '45px',
      marginTop: '65vh',
    },
    table: {
      width: '100%',
      // background: 'rgba(255,255,255)',
      backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[100] : theme.palette.grey[700],

    },
    tableOver: {
      maxHeight: 200,
    },
    horarios: {
      width: '90%',
    },
    title: {
      paddingTop: '1vh',
      fontFamily: 'Sans-serif',
      fontSize: '25px',
    }
  }));

  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);


  const tpl = {
    horac: "",
    horas: "",
    email: "",
  }

  const [state, setState] = useState(tpl);
  const [acessos, setAcessos] = useState([]);
  const [editing, setEditing] = useState(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    const unsubscribe = database.collection("acessos").where('uid', '==', props.user[0])
      .onSnapshot((query) => {
        let docs = [];
        query.forEach((doc) => {
          const data = doc.data();

          docs.push({
            _key: doc.id,
            data: data,
          })
        })

        setAcessos(docs)
      })
    return unsubscribe;
  }, [])

  const handleChange = (e, ref = false, doc = "") => {
    const { name, value } = e.currentTarget;
    setState({
      ...state,
      [name]: value
    });
    console.log(state)
  }

  const submit = (e) => {
    e.preventDefault();
    if (editing !== null) {
      database.collection("acessos").doc(editing).update(state).then((e) => {
        setEditing(false);
        setState(tpl);
      }).catch((e) => {
        console.log(e);
      })
    } else {

      console.log(props.user[0])
      database.collection("acessos").add({ ...state, uid: props.user[0] }).then((e) => {
        setState(tpl);
      }).catch((e) => {
        console.log(e);
      })
    }
  }

  const editElem = (key) => {
    setEditing(key);
    let enty = acessos.filter((e) => e._key === key);
    setState(enty[0].data);
    //setSelectKey(enty[0].data.empresaMae.id)
  }
  const deleteElem = (key) => {
    database.collection("acessos").doc(key).delete().then(() => {
      setAcessos(acessos.filter((e) => e._key !== key));
      // alert("Deletado com sucesso!")
    }).catch(() => {
      alert("Erro ao deletar")
    })

    handleClose(false)
  }

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Button color="default" ><Link to="/empresa" className={classes.p}>Registrar empresa</Link></Button>
      <Button color="default" ><Link to="/empresarial" className={classes.p}> Registrar empresarial</Link></Button>
      <Button color="default" onClick={() => signOut()} className={classes.deslog}>Deslogar</Button>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;


  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={classes.appBar}>

        <div><Header {...props} /></div>

      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>

      <main className={classes.content}>
        <div className={classes.toolbar} />
        <div className={classes.container}>
          <form className={classes.form} onSubmit={(e) => submit(e)}>
            <p className={classes.title}>ACESSOS DE USUÁRIO</p> <br />
            <TextField onBlur={handleChange} onChange={handleChange} value={state.email} required variant="outlined" name="email" type="email" label="Seu Email" /> <div className={classes.divider} />
            <br />
            <div className={classes.horarios}>
              <TextField onBlur={handleChange} onChange={handleChange} value={state.horac} required name="horac" label="Horario de chegada" type="datetime-local" className={classes.horario} fullWidth InputLabelProps={{ shrink: true, }}  />
              <TextField onBlur={handleChange} onChange={handleChange} value={state.horas} required name="horas" label="Horario de saída" type="datetime-local" className={classes.horario} fullWidth InputLabelProps={{ shrink: true, }}  />
            </div> <br />
            <Button type="submit" variant="contained" color="default">{editing ? "Editar" : "Conceder"}</Button> 
          </form> <br />
        </div>

        <br />

        <Card className={classes.table}>
          <CardContent>

            <TableContainer className={classes.tableOver} >
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>E-mail</TableCell>
                    <TableCell> Horario Entrada</TableCell>
                    <TableCell> Horario Saida</TableCell>
                    <TableCell align="right"> Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody role="checkbox" tabIndex={-1}>
                  {acessos.map((el) => {
                    return (
                      <TableRow key={el._key}>
                        <TableCell>{el.data.email}</TableCell>
                        <TableCell>{el.data.horac}</TableCell>
                        <TableCell>{el.data.horas}</TableCell>
                        <TableCell align="right">
                          <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                            <DeleteIcon />
                          </Button>
                          <Button variant="outlined" color="primary" onClick={(e) => editElem(el._key)}>
                            <EditIcon />
                          </Button>
                          <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                          >
                            <DialogTitle id="alert-dialog-title">{""}</DialogTitle>
                            <DialogContent>
                              <DialogContentText id="alert-dialog-description">
                                Tem certeza que deseja deletar o acesso?
                            </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                              <Button onClick={handleClose} color="primary">
                                NãO
                              </Button>
                              <Button onClick={(e) => deleteElem(el._key)} color="primary" autoFocus>
                                Sim
                              </Button>
                            </DialogActions>
                          </Dialog>
                          {/* <IconButton onClick={(e) => deleteElem(el._key)} align="right">
                            <DeleteIcon />
                          </IconButton> */}
                          {/* <IconButton variant="outlined" color="primary" onClick={(e) => editElem(el._key)} align="right">
                            <EditIcon />
                          </IconButton> */}
                        </TableCell>
                      </TableRow>

                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            {/* <TablePagination
              // rowsPerPageOptions={[10, 25, 100]}
              component="div"
              // count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            /> */}

          </CardContent>
        </Card>

      </main>
    </div>
  );
}
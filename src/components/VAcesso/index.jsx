import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from '@material-ui/core/styles';
// import { Link, useHistory } from "react-router-dom";
// import { database, auth, } from '../firebase.js';
import Header from '../Header';
import { Select, MenuItem, CardMedia, Button, TextField } from "@material-ui/core";
import { database, auth } from '../firebase.js';


const VAcesso = (props) => {
  const drawerWidth = 200;

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

  const classes = useStyles();

  const [empresa, setEmpresa] = useState([])

  useEffect(() => {
    const unsubscribe = database.collection("empresa").where('uid', '==', props.user[0])
      .onSnapshot((query) => {
        let docs = [];
        query.forEach((doc) => {
          const data = doc.data();

          docs.push({
            _key: doc.id,
            data: data,
          })
        })

        setEmpresa(docs)
      })
    return unsubscribe;
  }, [])


  const [key, setKey] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.currentTarget;
    setKey(value);
  }

  const submit = (e) => {

    if (key == null) {
      alert("Voce deve colocar a key")
    }

    e.preventDefault();
    console.log(props.user[1])
    database.collection("acessos").where('email', '==', props.user[1])
      .onSnapshot((query) => {
        console.log(query.size)
        if (query.size >= 1) {
          alert("Acesso OK")
        } else {
          alert("Não tem acesso")
        }

      })
  }

  return (

    <div>
      <Header {...props} />

      <main className={classes.content}>
        <div className={classes.container}>
          <form className={classes.form} onSubmit={(e) => submit(e)}>
            <p className={classes.title}>ACESSOS DE USUÁRIO</p> <br />
            <TextField onChange={handleChange} required variant="outlined" label="Código da empresa" /> <div className={classes.divider} />
            <br />
            <br />
            <Button type="submit" variant="contained" color="default">Validar</Button>
          </form> <br />
        </div>
      </main>
    </div>
  )
}
export default VAcesso;
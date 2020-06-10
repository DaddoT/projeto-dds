import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from '@material-ui/core/styles';
// import { Link, useHistory } from "react-router-dom";
// import { database, auth, } from '../firebase.js';
import Header from '../Header';
import { Select, MenuItem, CardMedia } from "@material-ui/core";
import { database, auth } from '../firebase.js';
import Grid from '@material-ui/core/Grid';



const PAcesso = (props) => {
  const drawerWidth = 200;

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(2),
      background: 'rgba(255,255,255,0)',
      maxWidth: 800,
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
    qrcode: {
      maxWidth: 100,
      minWidth: 50,
      maxHeight: 100,
      minHeight: 50,
      marginLeft: '10%',
      marginTop: '10px',
    },
  }));

  const classes = useStyles();

  const [image, setImage] = useState(null)
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

  const genLink = (key) => {
    return `https://chart.googleapis.com/chart?chs=512x512&cht=qr&chl=${key}&choe=UTF-8`
  }
  const handleSelect = (e) => {

    setImage(e.target.value)
  }

  return (

    <div>
      <Header {...props} />
      <div className={classes.root}>

        <main className={classes.content}>
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <div className={classes.container}>

                <h1>Selecione a empresa</h1>
                <Select onChange={handleSelect} fullWidth>
                  {empresa.map((e) => { return (<MenuItem key={e._key} value={e._key}>{e.data.fantasia}</MenuItem>) })}
                </Select>

                <hr />
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className={classes.qrcode}>
                {(image !== null) ? <div className={classes.qrcode}><img src={genLink(image)} /> <h3>{image}</h3></div> : null}
              </div>
            </Grid>
          </Grid>
        </main>
      </div>
    </div>
  )
}
export default PAcesso;
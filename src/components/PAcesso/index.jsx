import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from '@material-ui/core/styles';
// import { Link, useHistory } from "react-router-dom";
// import { database, auth, } from '../firebase.js';
import Header from '../Header';
import { Select, MenuItem, CardMedia } from "@material-ui/core";
import { database, auth } from '../firebase.js';


const PAcesso = (props) => {
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

    const genLink = (key) =>{
        return `https://chart.googleapis.com/chart?chs=512x512&cht=qr&chl=${key}&choe=UTF-8`
    }
    const handleSelect = (e)=>{

        setImage(e.target.value)
    } 

    return (

        <div>
            <Header {...props} />

            <main className={classes.content}>
                <div className={classes.container}>
                        {(image !== null) ? <div><img src={genLink(image)}/> <br/> <h1>{image}</h1></div>: null}
                
                    <hr/>
                    <h1>Selecione a empresa</h1>
                    <Select onChange={handleSelect} fullWidth>
                        {empresa.map((e) => { return( <MenuItem key={e._key} value={e._key}>{e.data.fantasia}</MenuItem>)})}
                    </Select>
                </div>
            </main>
        </div>
    )
}
export default PAcesso;
import React from 'react';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  loader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '15vh' 
  },
  }));

export default function() {
  const classes = useStyles();
  return(
    <div className={classes.loader}>
    <Loader
         type="Puff"
         color="#282828"
         height={500}
         width={500}
         timeout={10000} 
      />
    </div>
  )
}
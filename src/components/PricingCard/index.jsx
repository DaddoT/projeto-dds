import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';


const useStyles = makeStyles({
  card: {
    minHeight: 600,
    minWidth: 350,
    borderRadius: '15px 50px 15px',
    backgroundColor: '#282828',
  },
  cards: {
    marginTop: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    minWidth: '100px',
    height: 'auto',
    display: 'inline-block',
  },
});

export default function SimpleCard() {
  const classes = useStyles();
  
  return (
  <div className={classes.cards}>        
<Card className={classes.card}>
    <CardContent>
        


    </CardContent>
</Card> 
  <div className={classes.divider} />
<Card className={classes.card}>
    <CardContent>
 


    </CardContent>
</Card>
<div className={classes.divider} />
<Card className={classes.card}>
    <CardContent>
 


    </CardContent>
</Card>
</div>
  );
}
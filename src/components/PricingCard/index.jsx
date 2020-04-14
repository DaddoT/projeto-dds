import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/Grid';

const useStyles = makeStyles({
  card1: {
    minHeight: 600,
    minWidth: 350,
    // marginLeft: 80,
    // marginTop: 20,
    backgroundColor: '#282828',
  },
  card2: {
    minHeight: 600,
    minWidth: 350,
    // marginLeft: 533, 
    // marginTop: -635,
    backgroundColor: '#282828',
  },
  card3: {
    minHeight: 600,
    minWidth: 350,
    // marginLeft: 980,
    // marginTop: -600,
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
<Card className={classes.card1}>
    <CardContent>
        


    </CardContent>
</Card> 
  <div className={classes.divider} />
<Card className={classes.card2}>
    <CardContent>
 


    </CardContent>
</Card>
<div className={classes.divider} />
<Card className={classes.card3}>
    <CardContent>
 


    </CardContent>
</Card>
</div>
  );
}
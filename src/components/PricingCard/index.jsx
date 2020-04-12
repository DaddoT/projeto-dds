import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/Grid';

const useStyles = makeStyles({
  root: {
    minHeight: 250,
    maxWidth: 350,
    marginLeft: 20,
    marginTop: 20,
    backgroundColor: '#282828',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function SimpleCard() {
  const classes = useStyles();
  
  return (
      <div className="Cards">
 <GridList cols={3} >         
<Card className={classes.root}>
    <CardContent>
        


    </CardContent>
</Card> 
    <br></br> <br></br>
<Card className={classes.root}>
    <CardContent>
 


    </CardContent>
</Card>
</GridList>

</div>
  );
}
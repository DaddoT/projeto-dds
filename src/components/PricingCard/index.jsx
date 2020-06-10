import React from 'react';
import Header from '../Header/index'
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/StarBorder';
import Typography from '@material-ui/core/Typography';
import { Link } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { List } from '@material-ui/core';
import Tiers from './Tiers';



function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  heroContent: {
    padding: theme.spacing(5, 1, 5),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
  
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
  },
}));

const footers = [
  {
    title: 'Company',
    description: ['Team', 'Contact us'],
  },

];

export default function Pricing(props) {

  const classes = useStyles()

  const tiers = Tiers


  return (

    <div>
      <React.Fragment>
        <CssBaseline />
        <div><Header {...props} /></div>
        {/* Hero unit */}
        <Container maxWidth="sm" component="main" className={classes.heroContent}>
          <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
            Pricing
          </Typography>

        </Container>
        {/* End hero unit */}
        <Container maxWidth="md" component="main">
          <Grid container spacing={5} alignItems="flex-end">
            {tiers.map((tier) => (
              // Enterprise card is full width at sm breakpoint
              <Grid item key={tier.title} xs={12} sm={tier.title === 'Enterprise' ? 12 : 6} md={4}>
                <Card>
                  <CardHeader
                    title={tier.title}
                    subheader={tier.subheader}
                    titleTypographyProps={{ align: 'center' }}
                    subheaderTypographyProps={{ align: 'center' }}
                    action={tier.title === 'Pro' ? <StarIcon /> : null}
                    className={classes.cardHeader}
                  />
                  <CardContent>
                    <div className={classes.cardPricing}>
                      <Typography component="h2" variant="h3" color="textPrimary">
                        R${tier.price}
                      </Typography>
                      <Typography variant="h6" color="textSecondary">
                        ,00
                    </Typography>
                    </div>
                    <ul>
                      {tier.description.map((line) => (
                        <Typography component="li" variant="subtitle1" align="center" key={line}>
                          {line}
                        </Typography>
                      ))}
                    </ul>
                  </CardContent>
                  <CardActions>
                    <Button fullWidth variant={tier.buttonVariant} color="primary">
                      <Link href='/SignIn'  className={classes.button}>{tier.buttonText}</Link>
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
        {/* Footer */}
        <Container maxWidth="md" component="footer" className={classes.footer}>
          <Grid container spacing={4} justify="space-evenly">
            {footers.map((footer) => (
              <Grid item xs={6} sm={3} key={footer.title}>
                <Typography variant="h6" color="textSecondary" gutterBottom>
                  {footer.title}
                </Typography>

                <ul>
                  {footer.description.map((item) => (
                    <li key={item}>
                      <List>
                        <Link href='/About' variant="subtitle1" color="textPrimary">
                          {item}
                        </Link>
                      </List>
                    </li>
                  ))}
                </ul>
              </Grid>
            ))}
          </Grid>
          <Box mt={5}>
            <Copyright />
          </Box>
        </Container>
        {/* End footer */}
      </React.Fragment>
    </div>
  );
}
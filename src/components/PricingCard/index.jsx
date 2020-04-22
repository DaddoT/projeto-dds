import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Header from '../Header';
import "./stylesPricing.css";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
const useStyles = makeStyles({
  card: {
    minHeight: 350,
    minWidth: 960,
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
  table: {
    backgroundColor:'#ffffff'
    
  }
});
function createData(name, short, medium, long) {
  return { name, short, medium, long};
}

export default function SimpleCard(props) {
  const classes = useStyles();
  const rows = [
    createData('Empresarial', 'R$ 0', 'R$ 0', 'R$ 0'),
    createData('Empresa', 'R$ 0', 'R$ 0', 'R$ 0'),
    createData('Funcionário', 'R$ 0', 'R$ 0', 'R$ 0'),
  ];

  return (
    <div><Header {...props}/>
  <div className={classes.cards}>  
  <div className={classes.divider} />
<Card className={classes.card}>
    <CardContent>
      <div>
        <h2>Tabela de Preços</h2>  
        <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Tipo de Usuário</TableCell>
            <TableCell align="right"> 1 ano</TableCell>
            <TableCell align="right"> 2 anos</TableCell>
            <TableCell align="right"> 5 anos</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.short}</TableCell>
              <TableCell align="right">{row.medium}</TableCell>
              <TableCell align="right">{row.long}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </div>

    </CardContent>
</Card>
</div>
</div>
  );
}
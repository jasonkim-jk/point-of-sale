import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ReceiptNumber from './receipt-number';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(0, 1)
  }
}));

export default function OrderBill(props) {
  const { table, ...others } = props;
  const classes = useStyles();

  return (
    <Paper className={classes.paper} variant="outlined">
      <Grid container spacing={2}>
        <Grid item xs>
          <Typography gutterBottom variant="h4">
            Table {table}
          </Typography>
        </Grid>
        <ReceiptNumber {...others} />
      </Grid>
      <Divider />
    </Paper>
  );
}

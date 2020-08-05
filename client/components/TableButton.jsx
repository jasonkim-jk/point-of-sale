import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const styles = {
  root: {
    border: 0,
    borderRadius: '40px',
    color: 'black',
    width: '80px',
    height: '80px'
  }
};

const makeStyled = withStyles(styles);

function CustomButton(props) {
  const { classes } = props;
  return (
    <Grid item xs={3}>
      <Button variant="contained" color={props.color} className={classes.root}>
        {props.text}
      </Button>
    </Grid>

  );
}

export const TableButton = makeStyled(CustomButton);

import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

export default function ReceiptNumber(props) {
  const { check, receipt } = props;
  const result = (
    <Grid item>
      <Typography gutterBottom variant="h6" color="textSecondary">
        Receipt #{receipt}
      </Typography>
    </Grid>
  );

  if (check) {
    return result;
  } else {
    return <></>;
  }
}

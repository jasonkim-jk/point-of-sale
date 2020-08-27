import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const useStyles = theme => ({
  root: {
    border: 0,
    borderRadius: '25%',
    color: '#263238',
    width: '7.5rem',
    height: '7.5rem'
  }
});

class TableButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  parseTimeSeated(timeSeated) {
    if (timeSeated) {
      const jsTime = new Date(timeSeated);
      let hours = jsTime.getHours();
      let minutes = jsTime.getMinutes();
      const amPM = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = !hours ? 12 : hours;
      minutes = minutes < 10 ? '0' + minutes : minutes;
      const time = `${hours}:${minutes} ${amPM}`;
      return time;
    }
    return '';
  }

  handleClick(e) {
    this.props.viewDialog(true, this.props.tableData);
  }

  render() {
    const { classes } = this.props;
    const { tableId, tableStatus, timeSeated } = this.props.tableData;
    let color;
    switch (tableStatus) {
      case (0):
        color = 'default';
        break;
      case (1):
        color = 'primary';
        break;
      case (2):
        color = 'secondary';
        break;
      default:
    }
    return (
      <Grid item xs={6} sm={4}>
        <Box display="flex" justifyContent="center" flexWrap="nowrap" m={1}>
          <Button
            id={`T${tableId}`}
            onClick={this.handleClick}
            variant="contained"
            color={color}
            className={classes.root}
          >
            <Box display="flex" justifyContent="center" flexWrap="wrap">
              <Box>
                <Typography variant="h4" noWrap>{`T${tableId}`}</Typography>
              </Box>
              <Box>
                <Typography variant="h6" noWrap>
                  {this.parseTimeSeated(timeSeated)}
                </Typography>
              </Box>
            </Box>
          </Button>
        </Box>
      </Grid>
    );
  }
}

export default withStyles(useStyles)(TableButton);

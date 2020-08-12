import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const useStyles = theme => ({
  root: {
    border: 0,
    borderRadius: '50%',
    color: 'black',
    width: '130px',
    height: '130px'
  }
});

class TableButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  parseTimeSeated(timeSeated) {
    if (timeSeated) {
      const splitTime = timeSeated.split('T');
      const furtherSplit = splitTime[1].split(':');
      let [hours, minutes] = furtherSplit;
      hours = parseInt(hours, 10);
      // this is for timezone.  Idk why 5 works
      hours += 5;
      if (hours > 12) {
        hours -= 12;
      }
      let amPM = 'AM';
      if (hours > 11) {
        amPM = 'PM';
      }
      if (hours === 24 || hours === 0) {
        hours = 12;
        amPM = 'AM';
      } else if (hours > 12) {
        hours -= 12;
      }
      return `${hours}:${minutes} ${amPM}`;
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
      <Grid item xs={4}>
        <Box display="flex" justifyContent="center" flexWrap="nowrap" m={3}>
          <Button
            id={`T${tableId}`}
            onClick={this.handleClick}
            variant="contained"
            color={color}
            className={classes.root}
          >
            <Box display="flex" justifyContent="center" flexWrap="wrap">
              <Box>
                <Typography variant="h4" noWrap>{`T ${tableId}`}</Typography>
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

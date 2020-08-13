import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';

const useStyles = theme => ({
  button: {
    minWidth: 170,
    minHeight: 50,
    padding: theme.spacing(1),
    margin: theme.spacing(0, 5, 5)
  },
  title: {
    margin: theme.spacing(3, 1, 1, 3)
  }
});

class TablePopUp extends React.Component {
  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      isOpen: false
    };
  }

  handleClose() {
    this.props.viewDialog(false, this.props.tableData);
  }

  componentDidUpdate(prevProps) {
    if (this.props.open !== prevProps.open) {
      this.setState({
        isOpen: this.props.open
      });
    }
  }

  handleClick(e) {
    const id = e.currentTarget.id;
    const { tableId } = this.props.tableData;
    if (id === 'seat') {
      this.props.changeTableStatus(tableId, 1);
      this.handleClose();
      return;
    }
    if (id === 'view-order') {
      this.props.history.push(`/order/${this.props.tableData.tableId}`);
    }
    if (id === 'empty') {
      this.props.changeTableStatus(tableId, 0);
      this.handleClose();
    }
  }

  render() {
    const { classes } = this.props;
    let { tableId, tableStatus } = this.props.tableData;
    tableStatus = parseInt(tableStatus, 0);
    let seatState;
    switch (tableStatus) {
      case (0):
        seatState = 'Empty';
        break;
      case (1):
        seatState = 'Seated';
        break;
      case (2):
        seatState = 'Billed';
        break;
      default:
    }
    let buttonId;
    let buttonText;
    if (tableStatus === 0) {
      buttonId = 'seat';
      buttonText = 'Seat Table';
    } else if (tableStatus === 1 || tableStatus === 2) {
      buttonId = 'view-order';
      buttonText = 'View Order';
    }

    const titleText = `Table #${tableId} is ${seatState}`;
    const clearButton = 'Clear Table';

    return (
      <Dialog open={this.state.isOpen} onClose={this.handleClose} maxWidth="lg">
        <DialogTitle className={classes.title}>{titleText}</DialogTitle>
        <DialogActions>
          <Button
            color="primary"
            onClick={this.handleClick}
            id={buttonId}
            variant="contained"
            size="large"
            className={classes.button}
          >
            {buttonText}
          </Button>

        { this.props.tableData.isClosed &&
          <Button
            color="secondary"
            onClick={this.handleClick}
            id="empty"
            variant="contained"
            size="large"
            className={classes.button}
          > 
            {clearButton}
          </Button>
           }

        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(useStyles)(TablePopUp);

import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class TablePopUp extends React.Component {
  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      isOpen: false,
      isSeatable: true
    };
  }

  handleClose() {
    this.props.viewDialog(false, this.props.tableData);
  }

  componentDidUpdate(prevProps) {
    if (this.props.open !== prevProps.open) {
      const status = this.props.tableData.tableStatus;
      let isSeatable;
      if (status === 0) {
        isSeatable = true;
      }
      if (status > 0) {
        isSeatable = false;
      }
      this.setState({
        isOpen: this.props.open,
        isSeatable: isSeatable
      });
    }
  }

  handleClick(e) {
    const id = e.currentTarget.id;
    console.log('id', id);
  }

  render() {
    const { tableId, tableStatus } = this.props.tableData;
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
    let seatButtonId;
    let seatButtonText;
    if (this.state.isSeatable) {
      seatButtonId = 'seat';
      seatButtonText = `Seat Table #${tableId}`;
    } else {
      seatButtonId = 'unseat';
      seatButtonText = `Empty Table #${tableId}`;
    }
    return (
      <Dialog
        open={this.state.isOpen}
        onClose={this.handleClose}
      >
        <DialogTitle>{`Table #${tableId} is ${seatState}`}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Would you like to:
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClick} color="primary" id={seatButtonId}>
            {seatButtonText}
          </Button>
          <Button onClick={this.handleClick} color="primary" id="view-order">
            {`View order for Table #${tableId}`}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

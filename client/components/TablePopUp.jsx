import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class TablePopUp extends React.Component {
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
      buttonText = `Seat Table #${tableId}`;
    } else if (tableStatus === 1 || tableStatus === 2) {
      buttonId = 'view-order';
      buttonText = `View Order for Table #${tableId}`;
    }

    const clearButton = `Clear Table for Table #${tableId}`;

    return (
      <Dialog
        open={this.state.isOpen}
        onClose={this.handleClose}
      >
        <DialogTitle>{`Table #${tableId} is ${seatState}`}</DialogTitle>
        <DialogActions>
          <Button onClick={this.handleClick} color="primary" id={buttonId}>
            {buttonText}
          </Button>
          {
            this.props.tableData.isClosed &&
            <Button color="secondary" id="empty" onClick={this.handleClick}>
              {clearButton}
            </Button>
          }

        </DialogActions>
      </Dialog>
    );
  }
}

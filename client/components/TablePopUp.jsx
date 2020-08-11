import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class TablePopUp extends React.Component {
  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      isOpen: false
    };
  }

  handleClose() {

  }

  render() {
    return (
      <Dialog
        open={this.state.isOpen}
        onClose={this.handleClose}
      >
        <DialogTitle>Hello there</DialogTitle>
      </Dialog>
    );
  }
}

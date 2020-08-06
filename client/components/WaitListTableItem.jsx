import React from 'react';
import { TableRow, TableCell } from '@material-ui/core';

export default class WaitListTableItem extends React.Component {

  render() {
    return (
      <TableRow>
        <TableCell>Party Size</TableCell>
        <TableCell>Name</TableCell>
        <TableCell>Wait Time</TableCell>
        <TableCell>Wait Start Time</TableCell>
        <TableCell>Comment</TableCell>
      </TableRow>
    );
  }
}

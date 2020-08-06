import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow }
  from '@material-ui/core';
import WaitListTableItem from './WaitListTableItem';

export default class WaitListTable extends React.Component {

  render() {
    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Party Size</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Wait Time</TableCell>
              <TableCell>Wait Start</TableCell>
              <TableCell>Comment</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <WaitListTableItem/>
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

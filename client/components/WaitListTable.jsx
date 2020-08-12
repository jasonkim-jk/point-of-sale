import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow }
  from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import WaitListTableItem from './WaitListTableItem';
import Box from '@material-ui/core/Box';

export default class WaitListTable extends React.Component {

  render() {
    const waitList = this.props.waitList;
    const waitListItems = waitList.map(waiting => {
      return (
        <WaitListTableItem
          editCustomer={this.props.editCustomer}
          deleteCustomer={this.props.deleteCustomer}
          seatCustomer={this.props.seatCustomer}
          updateList={this.props.updateList}
          key={waiting.waitId}
          root={waiting}
        />
      );
    });
    return (
      <Box pt={2} pl={1}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle1">Seated</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="subtitle1">Party Size</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="subtitle1">Name</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="subtitle1">Wait Time</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="subtitle1">Comment</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="subtitle1">Operation</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{waitListItems}</TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  }
}

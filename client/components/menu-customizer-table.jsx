import React from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import MenuCustomizerTableItem from './menu-customizer-table-item';
// import Typography from '@material-ui/core/Typography';
// import { withStyles } from '@material-ui/core/styles';

export default class MenuCustomizerTable extends React.Component {
  render() {
    const menuItems = this.props.menuList.map(menu => {
      return <MenuCustomizerTableItem key={menu.itemId} item={menu} />;
    });

    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Number</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Cost</TableCell>
              <TableCell>Sale Price</TableCell>
              <TableCell>Operation</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{menuItems}</TableBody>
        </Table>
      </TableContainer>
    );
  }
}

import React from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import MenuCustomizerTableItem from './MenuCustomizerTableItem';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export default class MenuCustomizerTable extends React.Component {
  render() {
    const menuItems = this.props.menuList.map(menu => {
      return (
        <MenuCustomizerTableItem
          key={menu.itemId}
          item={menu}
          reloadMenus={this.props.reloadMenus}
          editItemId={this.props.editItem}
        />
      );
    });

    return (
      <Box pt={2} pl={1}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <Typography variant="subtitle1">Number</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="subtitle1">Name</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="subtitle1">Image</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="subtitle1">Cost</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="subtitle1">Sale Price</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="subtitle1">Operation</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{menuItems}</TableBody>
          </Table>
        </TableContainer>

      </Box>
    );
  }
}

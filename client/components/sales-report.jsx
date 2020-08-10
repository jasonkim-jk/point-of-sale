import React from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';

export default class SaleReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = { saleData: [] };
  }

  componentDidMount() {
    fetch('/api/sales')
      .then(response => response.json())
      .then(data => {
        this.setState({ saleData: data });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    const salesRow = this.state.saleData.map(item => {
      return (
        <TableRow key={item['Item Name']}>
          <TableCell align="center">1</TableCell>
          <TableCell align="center">{item['Item Name']}</TableCell>
          <TableCell align="center">
            <Box display="flex" justifyContent="center" bgcolor="background.paper">
              <Avatar variant="rounded" alt={item['Item Name']} src={item.Image} />
            </Box>
          </TableCell>
          <TableCell align="center">{item['Total Sold']}</TableCell>
          <TableCell align="center">${item['Sale Price']}</TableCell>
          <TableCell align="center">${item.Cost}</TableCell>
          <TableCell align="center">${item.Profit.toFixed(2)}</TableCell>
        </TableRow>
      );
    });

    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <Typography variant="subtitle1">Ranking</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="subtitle1">Item Name</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="subtitle1">Item Image</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="subtitle1">Total Sold</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="subtitle1">Sale Price</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="subtitle1">Cost</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="subtitle1">Profit</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {salesRow}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

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
import { withStyles } from '@material-ui/core/styles';

const useStyles = theme => ({
  image: {
    width: theme.spacing(12),
    height: theme.spacing(8)
  },
  cell: {
    padding: theme.spacing(1.3)
  }
});

class SaleReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = { saleData: [], totalSold: 0, totalProfit: 0 };
  }

  getTotal(data) {
    let totalSold = 0;
    let totalProfit = 0;

    for (const item in data) {
      totalSold += parseInt(data[item]['Total Sold']);
      totalProfit += parseFloat(data[item].Profit);
    }
    return { totalSold, totalProfit };
  }

  componentDidMount() {
    fetch('/api/sales')
      .then(response => response.json())
      .then(data => {
        const total = this.getTotal(data);
        this.setState({
          saleData: data,
          totalSold: total.totalSold,
          totalProfit: total.totalProfit.toFixed(2)
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    const { classes } = this.props;

    const noReport = (
      <TableRow>
        <TableCell align="center" colSpan={7}>
          <Typography variant="h5">There are no reports yet.</Typography>
        </TableCell>
      </TableRow>
    );

    const salesRow = this.state.saleData.map((item, index) => {
      return (
        <TableRow key={item['Item Name']}>
          <TableCell align="center">{index + 1}</TableCell>
          <TableCell align="center">{item['Item Name']}</TableCell>
          <TableCell align="center" className={classes.cell}>
            <Box display="flex" justifyContent="center" bgcolor="background.paper">
              <Avatar
                variant="rounded"
                alt={item['Item Name']}
                className={classes.image}
                src={item.Image}
              />
            </Box>
          </TableCell>
          <TableCell align="center">{item['Total Sold']}</TableCell>
          <TableCell align="center">${item['Sale Price']}</TableCell>
          <TableCell align="center">${item.Cost}</TableCell>
          <TableCell align="center">
            ${parseFloat(item.Profit).toFixed(2)}
          </TableCell>
        </TableRow>
      );
    });

    const salesTotal = (
      <>
        <TableRow >
          <TableCell rowSpan={2} />
          <TableCell rowSpan={2} />
          <TableCell colSpan={4}>
            <Typography variant="h5" color="secondary">
              Total Items Sold
            </Typography>
          </TableCell>
          <TableCell align="center">
            <Typography variant="h5" color="primary">
              {this.state.totalSold}
            </Typography>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={4}>
            <Typography variant="h5" color="secondary">
              Total Profit
            </Typography>
          </TableCell>
          <TableCell align="center">
            <Typography variant="h5" color="primary">
              ${parseFloat(this.state.totalProfit).toLocaleString()}
            </Typography>
          </TableCell>
        </TableRow>
      </>
    );

    return (
      <Box p={2}>
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
              {this.state.saleData.length ? salesRow : noReport}
              {this.state.saleData.length ? salesTotal : <></>}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  }
}

export default withStyles(useStyles)(SaleReport);

import React from 'react';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {
  Link
} from 'react-router-dom';

export default class ViewCheckItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openCheck: []
    };
  }

  componentDidMount() {
    fetch(`/api/checks/${this.props.match.params.checkId}`)
      .then(res => res.json())
      .then(data => {
        this.setState({ openCheck: data });
      })
      .catch(() => console.error('server response error'));
  }

  ccyFormat(num) {
    return `${num.toFixed(2)}`;
  }

  render() {
    const { openCheck } = this.state;
    const orderItemRows = openCheck.map((orderItems, index) => {
      const { item, cost, salePrice } = orderItems;
      return (
        <TableRow key={index}>
          <TableCell>{item}</TableCell>
          <TableCell align="right">1</TableCell>
          <TableCell align="right">{cost}</TableCell>
          <TableCell align="right">${salePrice}</TableCell>
        </TableRow>
      );
    });
    const taxRate = openCheck.length > 0 ? openCheck[0].taxRate : 0;
    let calculateTotal = 0;
    calculateTotal = openCheck.reduce((accumulator, item) => {

      return accumulator + parseFloat(item.salePrice);
    }, 0);

    const { params } = this.props.match;
    const invoiceTaxes = (taxRate / 100) * calculateTotal;
    const invoiceTotal = invoiceTaxes + calculateTotal;

    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left" colSpan={3}>
                <Typography variant="h4">Table { params.tableId }</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="h5">
                  Check #{ params.checkId }
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left">
                <Typography>Name</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography>Quantity</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography>Unit Cost</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography>Price</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderItemRows}
            <TableRow>
              <TableCell rowSpan={3} />
              <TableCell colSpan={2}>SubTotal</TableCell>
              <TableCell align="right">
                ${this.ccyFormat(calculateTotal)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Tax</TableCell>
              <TableCell align="right">{`${(taxRate).toFixed(2)} %`}</TableCell>
              <TableCell align="right">${invoiceTaxes.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell align="right">${invoiceTotal.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow >
              <TableCell colSpan={3} align="center">
                <Link to={'/'}>
                  <Button variant="contained">
                      Cancel
                  </Button>
                </Link>
              </TableCell>
              <TableCell align="left">
                <Link to={`/paycheck/${params.checkId}/${params.tableId}`}>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ padding: '8px 32px' }}
                  >
                      Pay
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

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
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = theme => ({
  image: {
    width: theme.spacing(8),
    height: theme.spacing(5)
  },
  cell: {
    padding: theme.spacing(0)
  },
  title: {
    padding: theme.spacing(1.5, 4)
  }
});

class ViewCheckItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openCheck: []
    };
  }

  componentDidMount() {
    this.getData();

  }

  getData() {
    const checkId = this.props.match.params.checkId;

    fetch(`/api/checks/${checkId}`)
      .then(res => res.json())
      .then(data => {
        this.setState({ openCheck: data, checkId: checkId });
      })
      .catch(() => console.error('server response error'));
  }

  ccyFormat(num) {
    return `${num.toFixed(2)}`;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.checkId !== this.props.match.params.checkId) {
      this.getData();
    }
  }

  render() {
    const { classes } = this.props;
    const { openCheck } = this.state;
    const orderItemRows = openCheck.map((orderItems, index) => {
      const { item, imageUrl, salePrice, quantity } = orderItems;
      return (
        <TableRow key={index}>
          <TableCell align="center">{item}</TableCell>
          <TableCell align="center" className={classes.cell}>
            <Box display="flex" justifyContent="center" bgcolor="background.paper">
              <Avatar variant="rounded" alt={item} className={classes.image} src={imageUrl} />
            </Box>
          </TableCell>
          <TableCell align="center">{quantity}</TableCell>
          <TableCell align="right">${salePrice}</TableCell>
        </TableRow>
      );
    });
    const taxRate = openCheck.length > 0 ? openCheck[0].taxRate : 0;
    let calculateTotal = 0;
    calculateTotal = openCheck.reduce((accumulator, item) => {
      return accumulator + parseFloat(item.salePrice) * (item.quantity);
    }, 0);

    const { params } = this.props.match;
    const invoiceTaxes = (taxRate / 100) * calculateTotal;
    const invoiceTotal = invoiceTaxes + calculateTotal;

    return (
      <Box pt={2} pr={2}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left" colSpan={3} className={classes.title}>
                  <Typography variant="h5" noWrap>
                    Table {params.tableId}
                  </Typography>
                </TableCell>
                <TableCell align="right" className={classes.title}>
                  <Typography variant="h6" noWrap>
                    Check #{params.checkId}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">
                  <Typography>Name</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography>Image</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography>Quantity</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography>Sale Price</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderItemRows}
              <TableRow>
                <TableCell rowSpan={3} />
                <TableCell colSpan={2}>SubTotal</TableCell>
                <TableCell align="right">${this.ccyFormat(calculateTotal)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Tax</TableCell>
                <TableCell align="right">{`${taxRate.toFixed(2)} %`}</TableCell>
                <TableCell align="right">${invoiceTaxes.toFixed(2)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2}>Total</TableCell>
                <TableCell align="right">${invoiceTotal.toFixed(2)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={3} align="center">
                  <Link to={'/'}>
                    <Button variant="contained">Cancel</Button>
                  </Link>
                </TableCell>
                <TableCell align="left">
                  <Link to={`/paycheck/${params.checkId}/${params.tableId}`}>
                    <Button variant="contained" color="primary" style={{ padding: '8px 32px' }}>
                      Pay
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  }
}

export default withStyles(useStyles)(ViewCheckItem);

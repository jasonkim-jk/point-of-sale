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
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Box from '@material-ui/core/Box';

export default class ViewPay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openCheck: []
    };
    this.userPaid = this.userPaid.bind(this);
  }

  componentDidMount() {
    fetch(`/api/checks/${this.props.match.params.checkId}`)
      .then(res => res.json())
      .then(data => {
        this.setState({ openCheck: data });
      })
      .catch(() => console.error('server response error'));
  }

  userPaid() {
    fetch(`/api/checks/${this.props.match.params.checkId}`, {
      method: 'PUT'
    })
      .then(res => res.json())
      .then(reponse => this.props.history.push('/'))
      .catch(() => console.error('error updating pay'));
  }

  render() {
    const { openCheck } = this.state;
    const taxRate = openCheck.length > 0 ? openCheck[0].taxRate : 0;
    let reduceStuff = 0;
    reduceStuff = openCheck.reduce((accumulator, item) => {

      return accumulator + parseFloat(item.salePrice);
    }, 0);

    const invoiceTaxes = (taxRate / 100) * reduceStuff;
    const invoiceTotal = invoiceTaxes + reduceStuff;
    return (
      <Box pt={2} pl={1}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="h4">Total: ${invoiceTotal}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" align="center">
                  Check #{this.props.match.params.checkId}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell colSpan={3}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-amount">
                    Tips
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-tips"
                      startAdornment={
                        <InputAdornment position="start">$</InputAdornment>
                      }
                      labelWidth={60}
                    />
                  </FormControl>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={3}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-amount">
                    Total
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-total"
                      startAdornment={
                        <InputAdornment position="start">$</InputAdornment>
                      }
                      labelWidth={60}
                    />
                  </FormControl>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={3}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-amount">
                    Cash
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-cash"
                      startAdornment={
                        <InputAdornment position="start">$</InputAdornment>
                      }
                      labelWidth={60}
                    />
                  </FormControl>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={3}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-amount">Card</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-card"
                      startAdornment={
                        <InputAdornment position="start">$</InputAdornment>
                      }
                      labelWidth={60}
                    />
                  </FormControl>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ padding: '10px 60px' }}
                    onClick={this.userPaid}
                  >
                  Pay
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  }
}

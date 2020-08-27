import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Box from '@material-ui/core/Box';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import MoneyIcon from '@material-ui/icons/Money';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

const useStyles = theme => ({
  title: {
    padding: theme.spacing(2)
  },
  form: {
    padding: theme.spacing(0, 2),
    margin: theme.spacing(0)
  },
  button: {
    minWidth: 80,
    padding: theme.spacing(1),
    margin: theme.spacing(1, 2)
  }
});

class ViewPay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openCheck: [],
      total: 0,
      tips: '0',
      totalBill: '',
      cash: '',
      card: ''
    };
    this.handleReset = this.handleReset.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    fetch(`/api/checks/${this.props.match.params.checkId}`)
      .then(res => res.json())
      .then(data => {
        const total = this.getTotal(data);
        this.setState({ openCheck: data, totalBill: total, total: total, cash: 0, card: total });
      })
      .catch(() => console.error('server response error'));
  }

  handleReset() {
  }

  handleChange(event) {
    let value = parseFloat(event.target.value);
    value = isNaN(value) || value < 0 ? 0 : value;

    if (event.target.id === 'tips') {
      const tips = value;
      let total = parseFloat(this.state.total) + tips;
      total = parseFloat(total).toFixed(2);
      this.setState({ totalBill: total, card: total, cash: 0 });
    }

    if (event.target.id === 'cash') {
      let card = parseFloat(this.state.totalBill) - value;
      card = parseFloat(card).toFixed(2);
      this.setState({ card: card });
    }

    if (event.target.id === 'card') {
      let cash = parseFloat(this.state.totalBill) - value;
      cash = parseFloat(cash).toFixed(2);
      this.setState({ cash: cash });
    }

    this.setState({ [event.target.id]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch(`/api/checks/${this.props.match.params.checkId}`, {
      method: 'PUT'
    })
      .then(res => res.json())
      .then(reponse => this.props.history.push('/'))
      .catch(() => console.error('error updating pay'));
  }

  getTotal(data) {
    const taxRate = data.length > 0 ? data[0].taxRate : 0;
    let reduceStuff = 0;
    reduceStuff = data.reduce((accumulator, item) => {
      return accumulator + parseFloat(item.salePrice) * (item.quantity);
    }, 0);

    const invoiceTaxes = (taxRate / 100) * reduceStuff;
    const invoiceTotal = invoiceTaxes + reduceStuff;
    return parseFloat(invoiceTotal).toFixed(2);
  }

  render() {
    const { classes } = this.props;

    return (
      <Box pt={5} p={5}>
        <form onSubmit={this.handleSubmit} onReset={this.handleReset} name="payForm">
          <FormControl fullWidth className={classes.form}>
            <TextField
              onChange={this.handleChange}
              value={this.state.total}
              margin="normal"
              id="totalBill"
              label="TOTAL"
              variant="outlined"
              disabled
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocalAtmIcon />
                  </InputAdornment>
                )
              }}
            />
            <TextField
              onChange={this.handleChange}
              value={this.state.tips}
              margin="normal"
              id="tips"
              label="TIPS"
              variant="outlined"
              helperText="Optional"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MonetizationOnIcon />
                  </InputAdornment>
                )
              }}
            />
            <TextField
              onChange={this.handleChange}
              value={this.state.cash}
              margin="normal"
              id="cash"
              label="CASH"
              variant="outlined"
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MoneyIcon />
                  </InputAdornment>
                )
              }}
            />
            <TextField
              onChange={this.handleChange}
              value={this.state.card}
              margin="normal"
              id="card"
              label="CARD"
              variant="outlined"
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CreditCardIcon />
                  </InputAdornment>
                )
              }}
            />
            <Box display="flex" justifyContent="center" mt={2}>
              <Typography variant="h5" align="center" className={classes.title}>
                Pay for ${this.state.totalBill}
              </Typography>
              <Button type="submit" variant="contained" color="primary" className={classes.button}>
                PAY
              </Button>
            </Box>
          </FormControl>
        </form>
      </Box>
    );
  }
}

export default withStyles(useStyles)(ViewPay);

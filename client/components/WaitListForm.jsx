import React from 'react';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

export default class WaitListForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.state = {
      name: '',
      partySize: '',
      comment: ''
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const newCustomer = {
      name: this.state.name,
      partySize: this.state.partySize,
      comment: this.state.comment
    };

    this.setState({
      name: '',
      partySize: '',
      comment: ''
    });
    console.log('Submit Works');
  }

  handleReset(e) {
    e.preventDefault();
    console.log('reset works');
    this.setState({
      name: '',
      partySize: '',
      comment: ''
    });
  }

  handleChange(e) {
    const target = e.target.id;
    const value = e.target.value;
    this.setState({ [target]: value });
  }

  render() {
    return (
      <Box width="35%" mt={2} ml={4} display="flex" justifyContent="center" flexDirection="column">
        <Typography variant="h4">
          Add New Guest
        </Typography>
        <form onSubmit={this.handleSubmit} onReset={this.handleReset}>
          <FormControl>
            <TextField onChange={this.handleChange} value={this.state.name}
              margin="normal" id="name" label="Name" fullWidth={true} variant="outlined"/>
            <TextField onChange={this.handleChange} value={this.state.partySize}
              margin="normal" id="partySize" label="Party Size" variant="outlined" />
            <TextField onChange={this.handleChange} value={this.state.comment}
              margin="normal" id="comment" label="Comment" variant="outlined" helperText="optional" />
            <Box display="flex">
              <Button type="submit" variant="contained" color="primary">Submit</Button>
              <Box ml={1}>
                <Button type="reset" variant="contained" color="secondary">Cancel</Button>
              </Box>
            </Box>
          </FormControl>
        </form>
      </Box>
    );
  }
}

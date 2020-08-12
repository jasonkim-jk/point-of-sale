import React from 'react';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import PersonIcon from '@material-ui/icons/Person';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import MessageIcon from '@material-ui/icons/Message';
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
    minWidth: 100,
    padding: theme.spacing(1),
    margin: theme.spacing(1, 2)
  }
});

class WaitListForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.state = {
      name: '',
      partySize: '',
      comment: '',
      waitId: '',
      editMode: false
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const partySize = parseInt(this.state.partySize, 10);
    if (!this.state.name || !partySize) {
      return;
    }
    const customerObj = {
      name: this.state.name,
      partySize: this.state.partySize,
      comment: this.state.comment
    };
    if (this.state.editMode) {
      this.props.updateCustomer(customerObj, this.state.waitId);
      this.props.stopEdit();
    } else {
      this.props.addCustomer(customerObj);
    }
    this.setState({
      name: '',
      partySize: '',
      comment: ''
    });
  }

  handleReset(e) {
    e.preventDefault();
    if (this.state.editMode) {
      this.props.stopEdit();
    }
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

  componentDidUpdate(prevProps) {
    if (this.props.mode !== prevProps.mode) {
      if (this.props.mode) {
        const { waitId, name, partySize, comment } = this.props.formEditItem;
        this.setState({
          name: name,
          partySize: partySize,
          comment: comment,
          waitId: waitId,
          editMode: this.props.mode
        });
      } else {
        this.setState({
          editMode: this.props.mode
        });
      }
    }
  }

  render() {
    const { classes } = this.props;
    const partySize = parseInt(this.state.partySize, 10);
    let partyValidationError;
    const submitText = this.state.editMode ? 'Update' : 'Submit';
    const titleText = this.state.editMode ? 'Update Guest' : 'Add New Guest';
    if (!this.state.partySize || partySize) {
      partyValidationError = false;
    } else {
      partyValidationError = true;
    }

    return (
      <Box mt={2}>
        <Typography variant="h4" align="center" className={classes.title}>
          {titleText}
        </Typography>
        <form onSubmit={this.handleSubmit} onReset={this.handleReset}>
          <FormControl fullWidth className={classes.form}>
            <TextField
              onChange={this.handleChange}
              value={this.state.name}
              margin="normal"
              id="name"
              label="Name"
              variant="outlined"
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                )
              }}
            />
            <TextField
              error={partyValidationError}
              onChange={this.handleChange}
              value={this.state.partySize}
              margin="normal"
              id="partySize"
              label="Party Size"
              variant="outlined"
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <GroupAddIcon />
                  </InputAdornment>
                )
              }}
            />
            <TextField
              onChange={this.handleChange}
              value={this.state.comment}
              margin="normal"
              id="comment"
              label="Comment"
              variant="outlined"
              helperText="optional"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MessageIcon />
                  </InputAdornment>
                )
              }}
            />
            <Box display="flex" justifyContent="center" mt={2} p={1}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
              >
                {submitText}
              </Button>
              <Button
                type="reset"
                variant="contained"
                color="secondary"
                className={classes.button}
              >
                Cancel
              </Button>
            </Box>
          </FormControl>
        </form>
      </Box>
    );
  }
}

export default withStyles(useStyles)(WaitListForm);

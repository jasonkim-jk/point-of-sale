import React from 'react';
import Box from '@material-ui/core/Box';

import WaitListTable from './WaitListTable';
import WaitListForm from './WaitListForm';

export default class WaitList extends React.Component {
  constructor(props) {
    super(props);
    this.addCustomer = this.addCustomer.bind(this);
    this.state = {
      waitList: []
    };
  }

  addCustomer(newCustomer) {
    fetch('/api/waitlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newCustomer)
    })
      .then(() => {
        this.updateList();
      });
  }

  updateList() {
    fetch('/api/waitlist')
      .then(response => response.json())
      .then(data => {
        this.setState({ waitList: data });
      })
      .catch(error => {
        console.error(error);
      });
  }

  componentDidMount() {
    this.updateList();
  }

  render() {
    const waitList = this.state.waitList;
    return (
      <Box display="flex">
        <WaitListTable waitList={waitList}/>
        <WaitListForm addCustomer={this.addCustomer}/>
      </Box>
    );
  }
}

import React from 'react';
import Box from '@material-ui/core/Box';

import WaitListTable from './WaitListTable';
import WaitListForm from './WaitListForm';

export default class WaitList extends React.Component {
  constructor(props) {
    super(props);
    this.addCustomer = this.addCustomer.bind(this);
    this.updateList = this.updateList.bind(this);
    this.seatCustomer = this.seatCustomer.bind(this);
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
      .then(response => {
        return response.status;
      })
      .then(status => {
        if (status === 200) {
          this.updateList();
        }
      });
  }

  seatCustomer(params) {
    const { waitId, isSeated } = params;
    const seatedObj = { isSeated: isSeated };
    fetch(`/api/waitlist/${waitId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(seatedObj)
    })
      .then(response => {
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
        <WaitListTable seatCustomer={this.seatCustomer} updateList={this.updateList} waitList={waitList}/>
        <WaitListForm addCustomer={this.addCustomer}/>
      </Box>
    );
  }
}

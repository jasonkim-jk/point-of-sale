import React from 'react';
import Box from '@material-ui/core/Box';

import WaitListTable from './WaitListTable';
import WaitListForm from './WaitListForm';

export default class WaitList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      waitList: []
    };
  }

  componentDidMount() {
    fetch('/api/waitlist')
      .then(response => response.json())
      .then(data => {
        this.setState({ waitList: data });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    const waitList = this.state.waitList;
    return (
      <Box display="flex">
        <WaitListTable waitList={waitList}/>
        <WaitListForm/>
      </Box>
    );
  }
}

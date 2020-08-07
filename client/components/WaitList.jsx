import React from 'react';
import WaitListTable from './WaitListTable';

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
      <WaitListTable waitList={waitList}/>
    );
  }
}

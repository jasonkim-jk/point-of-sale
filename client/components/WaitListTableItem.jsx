import React from 'react';
import { TableRow, TableCell } from '@material-ui/core';

export default class WaitListTableItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleInterval = this.handleInterval.bind(this);
    this.state = {
      waitTime: 0
    };
  }

  getWaitTime(SQLTime) {
    const SQLMinutes = this.parseSQLTime(SQLTime);
    const d = new Date();
    const currentMinutes = (d.getHours() * 60) + parseInt(d.getMinutes(), 10);
    const waitTotal = currentMinutes - SQLMinutes;
    const waitMinutes = waitTotal % 60;
    const waitHours = (waitTotal - waitMinutes) / 60;
    const waitTime = `${waitHours} hours ${waitMinutes} minutes`;
    return waitTime;
  }

  parseSQLTime(SQLTime) {
    const timeArray = SQLTime.split(':');
    const [hour, minute] = timeArray;
    const totalMinutes = (hour * 60) + parseInt(minute, 10);
    return totalMinutes;
  }

  handleInterval() {
    const waitTime = this.getWaitTime(this.props.root.time);
    this.setState({ waitTime: waitTime });
  }

  componentDidMount() {
    this.handleInterval();
    this.interval = setInterval(this.handleInterval, 60000);
  }

  render() {
    const props = this.props.root;
    const waitTime = this.state.waitTime;

    return (
      <TableRow>
        <TableCell>{props.partySize}</TableCell>
        <TableCell>{props.name}</TableCell>
        <TableCell>{waitTime}</TableCell>
        <TableCell>{props.comment}</TableCell>
      </TableRow>
    );
  }
}

import React from 'react';
import { TableRow, TableCell } from '@material-ui/core';

export default class WaitListTableItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleInterval = this.handleInterval.bind.this;
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
    return `${waitHours} hours ${waitMinutes} minutes`;
  }

  parseSQLTime(SQLTime) {
    const timeArray = SQLTime.split(':');
    const [hour, minute] = timeArray;
    const totalMinutes = (hour * 60) + parseInt(minute, 10);
    console.log('parseSQLTime', totalMinutes);
    return totalMinutes;
  }

  handleInterval() {

  }

  render() {
    const props = this.props.root;
    const waitTime = 'waitTime';

    return (
      <TableRow>
        <TableCell>{props.partySize}</TableCell>
        <TableCell>{props.name}</TableCell>
        <TableCell>{this.getWaitTime(props.time)}</TableCell>
        <TableCell>{props.comment}</TableCell>
      </TableRow>
    );
  }
}

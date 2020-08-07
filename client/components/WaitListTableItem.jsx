import React from 'react';
import { TableRow, TableCell, Typography } from '@material-ui/core';

const weight = {
  fontWeight: 600
};

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

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  computeStyle() {
    if (this.props.root.isSeated) {
      const style = {
        background: '#3C3C3C',
        color: 'white'
      };
      return style;
    } else {
      return {};

    }
  }

  render() {
    const props = this.props.root;
    let waitTime;
    if (props.isSeated) {
      waitTime = 'Seated';
    } else {
      waitTime = this.state.waitTime;
    }
    const style = this.computeStyle();

    return (
      <TableRow hover={true} >
        <TableCell style={style}>
          <Typography style={weight}>{props.partySize}</Typography>
        </TableCell>
        <TableCell style={style}>{props.name}</TableCell>
        <TableCell style={style}>{waitTime}</TableCell>
        <TableCell style={style}>{props.comment}</TableCell>
      </TableRow>
    );
  }
}

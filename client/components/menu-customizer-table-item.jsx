import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
// import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';
// import { withStyles } from '@material-ui/core/styles';

export default class MenuCustomizerTableItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <TableRow>
        <TableCell>1</TableCell>
        <TableCell>Gen</TableCell>
        <TableCell>000</TableCell>
        <TableCell>$4.99</TableCell>
        <TableCell>$9.99</TableCell>
        <TableCell>$9.99</TableCell>
      </TableRow>
    );
  }
}

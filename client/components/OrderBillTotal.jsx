import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

export default function OrderBillTotal(props) {
  const result = (
    <>
      <TableRow>
        <TableCell rowSpan={3} />
        <TableCell>Subtotal</TableCell>
        <TableCell align="right">${props.price.subTotal}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Tax</TableCell>
        <TableCell align="right">${props.price.tax}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Total</TableCell>
        <TableCell align="right">${props.price.total}</TableCell>
      </TableRow>
    </>
  );
  return props.price.subTotal === '0.00' ? <></> : result;
}

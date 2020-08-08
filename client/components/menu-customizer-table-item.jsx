import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import { withStyles } from '@material-ui/core/styles';

const useStyles = theme => ({
  image: {
    width: theme.spacing(12),
    height: theme.spacing(8)
  },
  cell: {
    padding: theme.spacing(0)
  },
  icon: {
    margin: theme.spacing(1)
  }
});

class MenuCustomizerTableItem extends React.Component {

  render() {
    const { classes } = this.props;
    const { itemId, item, imageUrl, cost, salePrice } = this.props.item;
    return (
      <TableRow>
        <TableCell align="center">{itemId}</TableCell>
        <TableCell align="center">{item}</TableCell>
        <TableCell align="center" className={classes.cell}>
          <Box display="flex" justifyContent="center" bgcolor="background.paper">
            <Avatar variant="rounded" alt={item} className={classes.image} src={imageUrl} />
          </Box>
        </TableCell>
        <TableCell align="center">${cost}</TableCell>
        <TableCell align="center">${salePrice}</TableCell>
        <TableCell align="center">
          <Box display="flex" justifyContent="center" bgcolor="background.paper">
            <IconButton>
              <EditOutlinedIcon className={classes.icon} />
            </IconButton>
            <IconButton>
              <DeleteOutlinedIcon className={classes.icon} />
            </IconButton>
          </Box>
        </TableCell>
      </TableRow>
    );
  }
}

export default withStyles(useStyles)(MenuCustomizerTableItem);

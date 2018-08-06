import React, { Component } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
    table: {
      minWidth: 700,
    },
  });

class OrdersTableRow extends Component {

    render() {

        return (
            <TableRow>
            <TableCell component="th" scope="row">
            </TableCell>
            <TableCell numeric></TableCell>
            <TableCell numeric></TableCell>
            <TableCell numeric></TableCell>
            <TableCell numeric></TableCell>
          </TableRow>
        )
    }
}

OrdersTableRow.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(OrdersTableRow);
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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

class Orders extends Component {
    render() {
      const {classes} = this.props;
      return (

           <div>
             <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>№</TableCell>
            <TableCell numeric>Products</TableCell>
            <TableCell numeric>Total Price</TableCell>
            <TableCell numeric>Status</TableCell>
            <TableCell numeric>Info</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                </TableCell>
                <TableCell numeric></TableCell>
                <TableCell numeric></TableCell>
                <TableCell numeric></TableCell>
                <TableCell numeric></TableCell>
              </TableRow>
        </TableBody>
      </Table>
    </Paper>
          </div>
      );
    }
  }
  


Orders.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Orders);
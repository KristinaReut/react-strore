import React, { Component } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CategoriesDelete from './CategoriesDelete'
import CategoriesEdit from './CategoriesEdit'
import TableBody from '@material-ui/core/TableBody';


const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  root: {
    width: '60%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
});


class CategoriesTableRow extends Component {

  deleteCategory = (id) => {
    const { deleteCategory } = this.props
    deleteCategory(id)
  }

  render() {

    const { category } = this.props;
    const { index } = this.props;

      return (
        <TableRow>
          <TableCell>
            {index + 1}
          </TableCell>
          <TableCell>
            {category.name}
          </TableCell>
          <TableCell>
            <CategoriesDelete id={category.id} deleteCategory={this.deleteCategory} />
            <CategoriesEdit category={category} />
          </TableCell>
        </TableRow>
      )
  }
}
CategoriesTableRow.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CategoriesTableRow);
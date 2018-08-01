import React, { Component } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CategoriesDelete from './CategoriesDelete'
import CategoriesEdit from './CategoriesEdit'


const styles = theme => ({
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
    },
    root: {
      width: '40%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
  });
  
  
  class CategoriesTableRow extends Component {
  
    render() {
      const { classes } = this.props;
      const {category}=this.props;
      const {index}=this.props;
    
      
      console.log(category);
        return (  
          <TableRow>
          <TableCell>
            {index+1}
          </TableCell>
          <TableCell>
            {category.name}
          </TableCell>
          <TableCell>
            <CategoriesDelete />
            <CategoriesEdit /> 
          </TableCell>
         </TableRow>
         )
    }
}
CategoriesTableRow.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(CategoriesTableRow);
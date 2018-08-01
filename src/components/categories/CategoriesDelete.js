import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { deleteCategory } from '../api';

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
  });

  class CategoriesDelete extends Component {
  
    render() {
      const { classes } = this.props;

        return (  
          <Button variant="contained" color="secondary" className={classes.button} type="submit" onClick={this.onClickDelete}>
            Delete
          </Button>
         )
    }
}
CategoriesDelete.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(CategoriesDelete);

          


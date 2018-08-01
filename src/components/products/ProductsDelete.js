import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { deleteProduct } from '../api';

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
  });

  class ProductsDelete extends Component {
   
    render() {
      const { classes } = this.props;

        return (  
        <Button variant="contained" color="secondary" className={classes.button} type="submit" >
            Delete
         </Button>
         )
    }
}

ProductsDelete.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(ProductsDelete);

          
          
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { updateCategory } from '../api';

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
  });

  class CategoriesEdit extends Component {
    state = {
        name: "",
        category: "",
      }

      updateCategory = (e) => {
        this.updateCategory({name: e.target.value});
       
        } 

    render() {
      const { classes } = this.props;

        return (  
            <Button variant="contained" color="primary" className={classes.button} type="submit" onClick={this.updateCategory.bind(this)}>
            Edit
         </Button>
         )
    }
}

CategoriesEdit.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(CategoriesEdit);

          
          
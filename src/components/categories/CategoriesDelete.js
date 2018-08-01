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
    state = {
        category: "",
        categories: [],
      }

    onDelete(id) {
        deleteCategory(id)
            .then((even) => {
                let categories = this.state.categories.filter((category) => {
                    return id !== category.id;
                });

                this.setState(state => {
                    state.categories = categories;
                    return state;
                });
            })
            
        }
    render() {
      const { classes } = this.props;

        return (  
          <Button variant="contained" color="secondary" className={classes.button} type="submit"  categories={this.state.categories}
          onDelete={this.onDelete.bind(this)}>
            Delete
          </Button>
         )
    }
}
CategoriesDelete.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(CategoriesDelete);

          


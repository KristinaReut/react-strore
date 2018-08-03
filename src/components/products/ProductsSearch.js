import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';

const styles = theme => ({

    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 150,
    },
  
  });
class ProductsSearch extends Component {
    state = {
    }
    
render() {
    const {classes} = this.props;
    
    return (
        <form className={classes.container} noValidate autoComplete="off" >
        <TextField
          label="Search field"
          type="search"
          className={classes.textField}
          margin="normal"
        /> 
        </form>)
    }
    }

    
ProductsSearch.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductsSearch);
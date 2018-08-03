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
class ProductsCategoryFilter extends Component {
    state = {
    }

    render() {
      const {classes} = this.props;
       return ( <form>
           <TextField
          select
          label="Category-filter"
          className={classes.textField}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          helperText="Please select category"
          margin="normal"
        />
          </form>)
        }
        }
        
ProductsCategoryFilter.propTypes = {
    classes: PropTypes.object.isRequired,
          };
          
export default withStyles(styles)(ProductsCategoryFilter); 
          
    
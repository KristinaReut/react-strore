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


    deleteCategory = () => {
        // delete
        // this.setState({
        //     category: event.target.value,
        //   });
        // const id = this.props.id
        console.log(this.props.id)
        deleteCategory(this.props.id)
    }
    render() {
        const { classes } = this.props;
        return (
            <Button variant="contained" color="secondary" className={classes.button} type="submit" categories={this.state.categories}
                onClick={this.deleteCategory}>
                Delete
          </Button>
        )
    }
}
CategoriesDelete.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CategoriesDelete);




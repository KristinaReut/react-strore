import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
});

class CategoriesDelete extends Component {
    state = {
        category: "",
    }
    deleteCategory = () => {
        const { deleteCategory } = this.props
        const id = this.props.id
        deleteCategory(this.props.id)
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Button variant="contained" color="secondary" className={classes.button} type="submit"
                    onClick={this.deleteCategory}
                >
                    Delete
          </Button>
            </div>
        )
    }
}
CategoriesDelete.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CategoriesDelete);




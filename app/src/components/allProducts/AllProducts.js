import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { getAllProducts, getAllCategories } from '../api';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';

const styles = theme => ({
button: {
        margin: theme.spacing.unit,
      },
      extendedIcon: {
        marginRight: theme.spacing.unit,
      },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  titleBar: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  icon: {
    color: 'white',
  },
});
  class AllProducts extends Component {
    state = {
        products: [],
        categories: []
      }
      componentWillMount() {
        Promise.all([getAllCategories(), getAllProducts()])
      }
     


    render() {
    const { classes, products, product } = this.props;
        
    console.log(products)
      return (
        <div>
            <GridList cellHeight={200} spacing={1} className={classes.gridList}>
        {products.map(product => (
          <GridListTile>
          {product.productName} Category={product.category}
            <GridListTileBar>
                Price={product.price}
                Description={product.description}
                Image={product.image}
            </GridListTileBar>
            <Button variant="fab" color="primary" aria-label="Add" className={classes.button}>
        <AddIcon />
      </Button>
          </GridListTile>
        ))}
      </GridList>
      </div>
      );
    }
  }
AllProducts.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(AllProducts);
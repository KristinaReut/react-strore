import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { getAllProducts, getAllCategories, updatedProduct, createCart } from '../api';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';




const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  card: {
    width: 310,
    height: 550,
    marginTop: 50,
    marginBottom: 50, 
    marginLeft: 55, 
    display: 'inline-block',
  },
  media: {
    height: 0,
    paddingTop: '100%', 
   
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: 'white',
  },
  titleBar: {
    background:
    'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
    'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
});


class AllProducts extends Component {
  state = {
    products: [],
    categories: [],
    product: [],
  }
  loadAllCategories = () => {
    getAllCategories().then(categories => {
      this.setState({ categories });
    });
  };
  loadAllProducts = () => {
    getAllProducts().then(products => {
      this.setState({ products });
    });
  };
  componentWillMount() {
    this.loadAllCategories();
    this.loadAllProducts();
  }


  onUpdate = (id, data) => {
    updatedProduct(id, data).then(this.loadAllProducts);
  };
  handleSubmit = (id) => {
    const { products } = this.state;
    const { addProductInCart } = this.props
    const product = products.filter(product => {
      if (product.id == id) {
        return true
      }
    })
    addProductInCart(product)
  }


  render() {
    const { classes } = this.props;
    const { products } = this.state
    
    return (
     <div>
       <h1>Top</h1>
        <div className={classes.root}>
      <GridList className={classes.gridList} cols={2.5}>
        {products.map(product => {
          if (product.featured == true) {
            return(
          <GridListTile key={product.image}>
            <img src={product.image} />
            <GridListTileBar
              title = {product.productName} 
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
              actionIcon={
                <Button size="small" style= {{color: "white"}} onClick={() => this.handleSubmit(product.id)}>
                 {product.price}$
                 <br />
                 Add to cart 
               </Button>
              }
            />
          </GridListTile> )}
          else { return (null) }
        })} 
      </GridList>
    </div>
    <h1>Products</h1>
       {products.map(product => {
           return (
          
       <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={product.image}
        />
        <CardContent>
          <Typography gutterBottom variant="headline" component="h1">
          {product.productName},    {product.price}$ 
          </Typography>
          <Typography component="p">
         Category: {product.category}
         <br />
         Description: {product.description}
         <br />
         Color: {product.color}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary"onClick={() => this.handleSubmit(product.id)}>
           Add to cart
          </Button>
        </CardActions>
      </Card>
    
        );
      })}
      
    </div>
    
     
    );
  }
}
AllProducts.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AllProducts);
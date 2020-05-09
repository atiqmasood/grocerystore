import React from 'react';
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import {Grid, Paper, Typography, Button, ButtonBase} from '@material-ui/core';
import AddItemsButton from './AddItemsButton';
import {removeCartItemAction} from '../store/actions/index';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    maxWidth: 610,
    marginTop: '1rem',
  },
  image: {
    width: 150,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

function CheckoutItemCard(props) {
  const classes = useStyles();
  const {addCartItems, handleAddCart} = props;

  function removeCartItem(item){
    props.removeCartItemAction(item)
  }
  
  return (
    <div className={classes.root}>
      {
          (addCartItems || []).map((item) => {
            return (
              <Paper key={item.id} className={classes.paper}>
                <Grid container spacing={2}>
                  <Grid item>
                    <ButtonBase className={classes.image}>
                      <img className={classes.img} alt="complex" src={item.image} />
                    </ButtonBase>
                  </Grid>
                  <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                      <Grid item xs>
                        <Typography gutterBottom variant="subtitle1">
                            {item.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          UNIT PRICE: 3 AED
                        </Typography>
                      </Grid>
                      <Grid item>
                          <Grid container>
                              <Grid item xs={3}>
                                <Button onClick={() => removeCartItem(item)} variant="outlined" color="secondary">
                                    Remove
                                </Button>
                              </Grid>
                              <Grid item xs={9} style={{textAlign: 'right'}}>
                                <AddItemsButton
                                  addedItems={item.purchaseAmount} 
                                  handleAddCart={handleAddCart} 
                                  selectedItem={item} 
                                />
                              </Grid>
                          </Grid>
                      </Grid>
                      <Grid item style={{textAlign: 'right'}}>
                        <Typography variant="body2" style={{ cursor: 'pointer' }}>
                            {`LINE PRICE: ${item.purchaseAmount*3} AED`}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            )
          })
        }
    </div>
  );
}

export default connect(null, {removeCartItemAction})(CheckoutItemCard);
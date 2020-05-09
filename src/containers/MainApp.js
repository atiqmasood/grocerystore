import React, {useState, useEffect} from 'react';
import { connect } from "react-redux";
import Header from '../components/Header/Header';
import AppCard from '../components/AppCard/AppCard';
import AddItemsButton from '../components/AddItemsButton';
import { Container, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import {getTotalItems, getProductList} from '../store/actions/index';
import Loader from '../components/Loader';
import MuiAlert from '@material-ui/lab/Alert';

function MainApp(props) {
    const {totalSelectedItems, isProducListLoading, productList, addCartItems} = props;
    const [state, setState] = useState({
        searchValue: ''
    })

    // load the product 
    useEffect(() => {
        props.getProductList('food', 10);
    }, []);

    // To add each product to cart
    function handleAddCart(selectedItem, action){ 
        props.getTotalItems(selectedItem, action)
    }

    //To search for product
    function onSearchChange(e){
        const {name, value} = e.target;
        setState({...state, [name]: value});
    }

    //get filter query results
    function getFilterResults(e){
        props.getProductList(state.searchValue, 10);
    }
    if (isProducListLoading){
        return(
            <div>
                <Header totalSelectedItems={totalSelectedItems}/>
                <Loader/>
            </div>
        )
    } else {
        return (
            <div>
                <Header getFilterResults={getFilterResults} searchValue={state.searchValue} onSearchChange={onSearchChange}  totalSelectedItems={totalSelectedItems}/>
                <div className={'main-title'}>
                    Select Your Items
                </div>
                <Container>
                    <Grid container spacing={2}>
                        {
                            productList.length === 0 || productList.isError ?
                            <div style={{padding: '1rem', width: '100%'}}>
                                <MuiAlert elevation={4} variant="outlined" severity="error">
                                    {`${productList.errorMsg || 'No Record found.'}`}
                                </MuiAlert>
                            </div>
                            :
                            ((productList.length && productList) || []).map((item, index) => {
                                let addedItemAmount = addCartItems.find(x => x.id === item.id);
                                return(
                                    <Grid key={item.id} item xs={12} md={3}>
                                        <AppCard
                                            mediaImage={item.image}
                                            content={
                                                <div style={{textAlign: 'center'}}>
                                                    <Typography title={item.title} variant="body2" color="textSecondary" component="p">
                                                        {`${item.title.substring(0,10)}...` || ''}
                                                    </Typography>
                                                    <Typography variant="body2" color="textSecondary" component="p">
                                                        {`price: ${item.price} AED` || ''}
                                                    </Typography>
                                                </div>
                                            }
                                            footer={
                                                <div style={{margin: 'auto'}}>
                                                    <AddItemsButton 
                                                        addedItems={(addedItemAmount && addedItemAmount.purchaseAmount) || 0} 
                                                        handleAddCart={handleAddCart}
                                                        selectedItem={item} 
                                                    />
                                                </div>
                                            }
                                        />
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        addedItems: state.shopReducer.addedItems,
        totalSelectedItems: state.shopReducer.totalSelectedItems,
        productList: state.shopReducer.productList,
        isProducListLoading: state.shopReducer.isProducListLoading,
        addCartItems: state.shopReducer.addCartItems,
    };
  };

export default connect(mapStateToProps, {getTotalItems, getProductList})(MainApp);

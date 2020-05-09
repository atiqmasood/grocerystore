import axios from 'axios';

export const getTotalItems = (selectedItem, operation) => dispatch => {
    dispatch({
      type: 'SELECTED_ITEM_COUNT',
      payload: {operation, selectedItem:{...selectedItem, purchaseAmount: 1}}
    });
};

export const getProductList = (query, number) => dispatch => {
    dispatch({type: 'PRODUCT_LIST_LOADED_STARTED'});
    axios.get('http://localhost:8888/product', {params: {query, number}}).then((response) => {
    // handle success
    dispatch({
        type: 'PRODUCT_LIST_LOADED',
        payload: response && response.data
    });
  }).catch((error) => {
    // handle error
      dispatch({
        type: 'PRODUCT_LIST_LOADED',
        payload: error && {errorMsg: 'Something went wrong.', isError: true}
      });
  })
}

export const removeCartItemAction = (removeItem) => dispatch => {
  dispatch({
    type: 'REMOVE_CART_ITEM',
    payload: {removeItem}
  });
};

export const orderedCompleteAction = () => dispatch => {
  dispatch({
    type: 'RESET_ITEMS',
  });
};

const intialState = {
  isProducListLoading: false,
  productList: [],
  addedItems: 0,
  totalSelectedItems: 0,
  addCartItems: []
};

const shopReducer = (state = intialState, action) => {
    const {type, payload} = action;
    switch (type) {
    case 'SELECTED_ITEM_COUNT':{
        if (payload.operation === 'sub'){
            const reduceItems = [];
            (state.addCartItems).forEach((item) => {
                if (item.id === payload.selectedItem.id){
                    if (item.purchaseAmount > 1){
                        reduceItems.push({...item, purchaseAmount: item.purchaseAmount - 1});
                    }
                } else {
                    reduceItems.push(item);
                }
            })
            state = {
                ...state,
                totalSelectedItems: state.totalSelectedItems - 1,
                addCartItems: reduceItems
            };
        } else {
            let isAlreadySelected = false;
            let checkoutItems = (state.addCartItems).map((item) => {
                if (item.id === payload.selectedItem.id){
                    isAlreadySelected = true;
                    return {...item, purchaseAmount: item.purchaseAmount + 1};
                }
                return item;
            })
            
            checkoutItems = !isAlreadySelected ? [...state.addCartItems, ...[payload.selectedItem]] : checkoutItems;
            state = {
                ...state,
                totalSelectedItems: state.totalSelectedItems + 1,
                addCartItems: checkoutItems
            };
        }
        return state;
    }
    case 'PRODUCT_LIST_LOADED_STARTED':{
        return {
            ...state,
            isProducListLoading: true,
        }
    }
    case 'PRODUCT_LIST_LOADED':{
        if (payload.isError){
            return {
                ...state,
                isProducListLoading: false,
                productList: payload
            }
        }
        return {
            ...state,
            isProducListLoading: false,
            productList: ((payload && payload.products) || []).map(x => ({...x, price: 3.10}))
        }
    }
    case 'REMOVE_CART_ITEM':{
        return {
            ...state,
            isProducListLoading: false,
            addCartItems: (state.addCartItems || []).filter(x => x.id !== payload.removeItem.id),
            totalSelectedItems: state.totalSelectedItems - payload.removeItem.purchaseAmount
        }
    }
    case 'RESET_ITEMS':{
        return {
            ...state,
            addCartItems: [],
            totalSelectedItems: 0
        }
    }
    default:
        break;
    }

    return state;
};

export default shopReducer;

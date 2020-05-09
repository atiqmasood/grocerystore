import React, {useState} from 'react';
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Header from '../components/Header/Header';
import CheckoutItemCard from '../components/CheckoutItemCard';
import {Container, Grid, Paper, TextField, MenuItem, Button} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import styled from 'styled-components'
import {getTotalItems, orderedCompleteAction} from '../store/actions/index';
import AppModal from '../components/AppModal';

const cityOption = [
    { label: 'Abu dhabi', value: 'abu dhabi' },
    { label: 'Dubai', value: 'Dubai' },
    { label: 'Sharja', value: 'Sharja' },
    { label: 'Ajman', value: 'Ajman' },
    { label: 'Fujirah', value: 'Fujirah' },
    { label: 'Ras Al Khaimah', value: 'Ras Al Khaimah' },
    { label: 'Umm Al-Quwain', value: 'Umm Al-Quwain' },
]
const AlertStyled = styled.div`
    padding: 1rem;
`;
const PaperStyle = styled(Paper)`
    height: 23rem;
`;

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: '9px 0px',
      }
    },
    orderBtn: {
        width: '100%',
        marginBottom: '1rem',
        background: 'chocolate'
    }
  }));

function Checkout(props) {

    const [state, setState] = useState({
        city: '',
        note: '',
        address: '',
        phone: '',
        error: {},
        isModalOpen: false
    })

    // To add each product to cart
    function handleAddCart(selectedItem, action){ 
        props.getTotalItems(selectedItem, action)
    }

    // handle change 
    function handleChange(e){
        const {name, value} = e.target;
        if (state.error){
            setState({...state, [name]: value, error: {...state.error, [name]: false }});
            return;
        }
        setState({...state, [name]: value});
    }

    // validate from
    function formValidation(){
        const {city, phone, address} = state;
        let isValid = true
        if (city === ''){
            isValid = false;
            setState({...state, error: { city: true }})
        } else if (address === ''){
            isValid = false;
            setState({...state, error: { address: true }})
        } else if (phone === ''){
            isValid = false;
            setState({...state, error: { phone: true }})
        } else {
            return isValid;
        }
    }

    function handleModal(redirect){
        setState({...state, isModalOpen: !state.isModalOpen})
        if (redirect){
            props.orderedCompleteAction();
            props.history.push('/');
        }
    }

    // order submitt
    function onsubmit(e){
        e.preventDefault();
        const isValid = formValidation();
        if (isValid){
            handleModal(false);
        }
    }

      const {city, phone, address, note, error, isModalOpen} = state;
      const classes = useStyles();
    return (
        <div>
            <Header/>
            <Container>
                <AlertStyled>
                    <MuiAlert elevation={6} variant="filled" severity="info">
                        No advance payment needed. You can pay cash on Delivery
                    </MuiAlert>
                </AlertStyled>
                {
                    props.addCartItems.length > 0 ?
                    <Grid container spacing={2} style={{padding: '1rem'}}>
                        <Grid item xs={12} md={7}>
                            <CheckoutItemCard handleAddCart={handleAddCart} addCartItems={props.addCartItems} />
                        </Grid>
                        <Grid item xs={12} md={5}>
                            <PaperStyle >
                                <Container>
                                    <form className={classes.root}>
                                        <TextField
                                            error={error && error.city}
                                            helperText={error && error.city && "Required"}
                                            required
                                            size={'small'}
                                            select
                                            label="Select City"
                                            name="city"
                                            value={city}
                                            onChange={handleChange}
                                            variant="outlined"
                                            fullWidth
                                            >
                                            {
                                                cityOption.map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))
                                            }
                                        </TextField>
                                        <TextField
                                            error={error && error.address}
                                            helperText={error && error.address && "Required"}
                                            required
                                            size={'small'}
                                            label="Address"
                                            name="address"
                                            value={address}
                                            variant="outlined"
                                            onChange={handleChange}
                                            fullWidth
                                        />
                                        <TextField
                                            error={error && error.phone}
                                            helperText={error && error.phone && "Required"}
                                            required
                                            size={'small'}
                                            label="Phone number"
                                            name="phone"
                                            value={phone}
                                            type={'number'}
                                            onChange={handleChange}
                                            fullWidth
                                            variant="outlined"
                                        />
                                        <TextField
                                            label="Note"
                                            name="note"
                                            value={note}
                                            multiline
                                            rows={4}
                                            variant="outlined"
                                            fullWidth
                                            onChange={handleChange}
                                        />
                                        <Button onClick={onsubmit} className={classes.orderBtn} variant='contained' color={'primary'} >Order items</Button>
                                    </form>
                                </Container>
                            </PaperStyle>
                        </Grid>
                    </Grid>
                    :
                    <AlertStyled>
                        <MuiAlert elevation={6} variant="outlined" severity="warning">
                            Please Select your items.
                        </MuiAlert>
                    </AlertStyled>
                }
            </Container>
            {
                isModalOpen &&
                <AppModal
                    isModalOpen={isModalOpen}
                    handleModal={handleModal}
                />
            }
        </div>
    );
}

const mapStateToProps = state => {
    return {
        addedItems: state.shopReducer.addedItems,
        totalSelectedItems: state.shopReducer.totalSelectedItems,
        addCartItems: state.shopReducer.addCartItems,
    };
};
  
export default connect(mapStateToProps, {getTotalItems, orderedCompleteAction})(Checkout);

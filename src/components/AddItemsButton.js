import React from 'react';
import Add from '@material-ui/icons/Add';
import {  Button, ButtonGroup } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      background: '#45889c',
    }
}));

export default function AddItemsButton({selectedItem, handleAddCart, addedItems}){
    const classes = useStyles();
    return(
        <ButtonGroup
            size="small"
            variant="contained" 
            color="primary" 
            aria-label="contained primary button group"
        >
            <Button 
                onClick={() => handleAddCart(selectedItem, 'sub')} 
                className={classes.root}
            >
                    -
            </Button>
            <Button disabled>
                {addedItems}
            </Button>
            <Button 
                onClick={() => handleAddCart(selectedItem, 'add')} 
                className={classes.root}
            >
                <Add />
            </Button>
        </ButtonGroup>
    )
}
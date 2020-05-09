import React from 'react';
import { CircularProgress } from '@material-ui/core';
import styled from 'styled-components';

const LoaderStyle = styled.div`
    text-align: center;
    padding: 4rem;
`;

function Loader(){
    return(
        <LoaderStyle>
            <CircularProgress disableShrink />
        </LoaderStyle>
    )
}

export default Loader;
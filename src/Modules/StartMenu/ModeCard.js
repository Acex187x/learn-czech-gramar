import React from 'react';
import styled from 'styled-components';
import infinity from "../../icons/infinity.svg";

const ModeCardContainer = styled.div`
    background-color: white;
    width: 15vw;
    height: 20vw;
    border-radius: 40px;
    box-shadow: #0000001c 0 0 20px 10px;
`

const ModeCard = () => {
    return (
        <ModeCardContainer>
            <img src={infinity} />
        </ModeCardContainer>
    );
};

export default ModeCard;
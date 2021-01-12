import React from 'react';
import styled from 'styled-components';
import correct from '../icons/correct.svg';
import wrong from '../icons/wrong.svg';
import score from '../icons/score.svg';

const CountersContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    grid-area: 1 / 2 / 1 / 2;
    padding: 0 25vw;
    transition: opacity 1s;
    ${p => p.isHidden ? `
        opacity: 0;
    ` : {}}

    @media only screen 
		and (min-width: 320px) 
		and (max-width: 480px) {
            padding: 0 30vw;
    }
`
const ItemContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`
const ItemImg = styled.img`
    width: 3rem;

    @media only screen 
		and (min-width: 320px) 
		and (max-width: 480px) {
            width: 8vw;
    }
`
const ItemValue = styled.span`
    margin-left: 20px;
    font-size: 2vw;
    font-family: 'Raleway', sans-serif;
    color: white;

    @media only screen 
		and (min-width: 320px) 
		and (max-width: 480px) {
            font-size: 5vw;
    }
`

const Counters = ({ counters, isHidden }) => {

    return (
        <CountersContainer isHidden={isHidden}>
            <ItemContainer>
                <ItemImg src={correct}></ItemImg>
                <ItemValue>{counters && counters[0]}</ItemValue>
            </ItemContainer>
            <ItemContainer>
                <ItemImg src={wrong}></ItemImg>
                <ItemValue>{counters && counters[1]}</ItemValue>
            </ItemContainer>
            {/* <ItemContainer>
                <ItemImg src={score}></ItemImg>
                <ItemValue>{counters && counters[2]}</ItemValue>
            </ItemContainer> */}
        </CountersContainer>
    );
};

export default Counters;
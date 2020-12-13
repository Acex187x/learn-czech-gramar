import React from 'react';
import styled from 'styled-components';

const TextContainer = styled.div`
    font-size: 1.5vw;
    font-family: 'Raleway', sans-serif;
    color: white;

    @media only screen 
		and (min-width: 320px) 
		and (max-width: 480px) {
        font-size: 5vw;
        margin: 2rem;
	}
`

const DialogText = (props) => {
    return (
        <TextContainer>
            {props.children}
        </TextContainer>
    );
};

export default DialogText;
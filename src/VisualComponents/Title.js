import React from 'react';
import styled from 'styled-components';

const TextContainer = styled.div`
    font-size: 3vw;
    font-family: 'Raleway', sans-serif;
    color: white;
    margin: 2rem;

    @media only screen 
		and (min-width: 320px) 
		and (max-width: 480px) {
        font-size: 8vw;
	}
`

const Title = (props) => {
    return (
        <TextContainer>
            {props.children}
        </TextContainer>
    );
};

export default Title;
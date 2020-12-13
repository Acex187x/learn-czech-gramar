import React from 'react';
import styled from 'styled-components';

const ButtonContainer = styled.button`
    font-family: 'Raleway', sans-serif;
    border: 0;
    font-size: 2vw;
    min-width: 15vw;
    background: white;
    border-radius: 6px;
    padding: 10px 20px;
    outline: none;
    transition: background 0.3s;
    ${p => p.correct ? `
        background: #d0ff92;
    ` : ''}
    ${p => p.wrong ? `
        background: #ff8c96;
    ` : ''}

    @media only screen 
		and (min-width: 320px) 
		and (max-width: 480px) {
        font-size: 5vw;
        padding: 5px 20px;
    }
`

function VariantButton(props) {

    return (
        <ButtonContainer {...props}>
            {props.children}
        </ButtonContainer>
    )
}

export default VariantButton;
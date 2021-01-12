import React from 'react';
import styled from 'styled-components';
import { Title } from '../../VisualComponents';
import ModeCard from './ModeCard';

const StartMenuContainer = styled.div`
    grid-area: 2 / 2 / 2 / 2;
    display: flex;
    flex-direction: column;
`

const TitleContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
`

const ModesContainer = styled.div`
    flex: 2;
` 

const Mode = styled.div`

`


function StartMenu(props) {
    return (
        <StartMenuContainer>
            <TitleContainer>
                <Title>Слыш, выбери режим, БЫСТРО БЛЯТЬ</Title>
            </TitleContainer>
            <ModesContainer>
                <ModeCard />
            </ModesContainer>
        </StartMenuContainer>
    );
}

export default StartMenu;
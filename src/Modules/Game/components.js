import styled from 'styled-components';

const GameContainer = styled.div`
    grid-area: 2 / 2 / 2 / 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: transform .5s, opacity .5s;
    ${p => p.anim === 0 ? `
        transform: translateY(-50px);
        opacity: 0;
    ` : ''}

    ${p => p.anim === 1 ? `
        transition: unset;
        transform: translateY(50px);
        opacity: 0;
    ` : ''}

    ${p => p.anim === 2 ? `
        transform: translateY(0);
        opacity: 1;
    ` : ''}
`

const TaskContainer = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    @media only screen 
		and (min-width: 320px) 
		and (max-width: 480px) {
        flex: 2;
        width: 100%;
        justify-content: flex-start;
        align-items: flex-start;
	}
`

const AnswerContainer = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;

    @media only screen 
		and (min-width: 320px) 
		and (max-width: 480px) {
        padding-bottom: 50px;
	}
`

const ButtonsContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-gap: 20px;

    @media only screen 
		and (min-width: 320px) 
		and (max-width: 480px) {
		width: 100%;
        height: 100%;
        padding: 20px;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr;
	}
`

const AnswerVisualGap = styled.div`
    width: 8vw;
    height: 1.5vw;
    border-bottom: 2px solid white;
    display: inline-block;
`

export {
    GameContainer,
    TaskContainer,
    AnswerContainer,
    ButtonsContainer,
    AnswerVisualGap
}
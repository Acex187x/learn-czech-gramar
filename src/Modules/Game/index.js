import React, { useEffect, useRef, useState } from 'react';
import { VariantButton, TaskText, DialogText, ActivityIndicator } from '../../VisualComponents';
import getRandomCzechWords from '../../Helpers/getRandomCzechWords';
import dialogs from '../../Helpers/dialogs';
import styled from 'styled-components';

const PADS = [
    'Nominativu',
    'Genitivu',
    'Dativu',
    'Akkuzativu',
    'Vocativu',
    'Lokálu',
    'Instrumentálu',
    'Nominativu pl.',
    'Genitivu pl.',
    'Dativu pl.',
    'Akkuzativu pl.',
    'Vocativu pl.',
    'Lokálu pl.',
    'Instrumentálu pl.'
]

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
        padding-top: 5vh;
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

const Game = () => {

    const currentList = useRef(null)
    const preloadedList = useRef(null)

    const [currentWord, setNewWord] = useState(null)
    const [loading, setLoading] = useState(false)
    const [showCorrect, setShowCorrect] = useState(false);
    const [anim, setAnim] = useState(true);
    const [lockButton, setLockButton] = useState(false);
    const [isLoaderTransparent, setIsLoaderTransparent] = useState(true);
    const [wrongCounter, setWrongCounter] = useState(0);
    const [correctCounter, setCorrectCounter] = useState(0);

    const startLoading = () => {
        setAnim(0);
        setIsLoaderTransparent(true)
        setTimeout(() => {
            setAnim(2);
            setLoading(true);
            setIsLoaderTransparent(false);
        }, 500)
    }

    const stopLoading = () => {
        setIsLoaderTransparent(true)

        setTimeout(() => {
            setLoading(false);
            setAnim(1);
        }, 500)
        setTimeout(() => {
            setAnim(2)
        }, 550)
    }

    const fetchNewList = async () => {
        const newWords = await getRandomCzechWords()
        if (!currentWord || !currentList.current) {
            currentList.current = newWords
            stopLoading();
            nextWord();
        } else {
            preloadedList.current = newWords
        }
    }

    const nextWord = () => {

        setShowCorrect(false)
        setLockButton(false);
        if (!currentWord && currentList.current) {
            setNewWord(currentList.current[0])
            return;
        }

        if (currentWord && currentList.current && currentWord.id < currentList.current.length - 1) {
            setNewWord(currentList.current[currentWord.id + 1])

            if (currentWord.id === 1) {
                fetchNewList()
            }
        }

        if (currentWord && currentWord.id >= currentList.current.length - 1) {
            if (preloadedList.current) { // If there is preloaded list
                setNewWord(preloadedList.current[0])
                currentList.current = preloadedList.current
                preloadedList.current = null
            } else { // If preloaded list did not complete the loading
                currentList.current = null
                setNewWord(null)
                startLoading()
            }
        }
    }

    const checkCorrect = (variant) => {
        if (lockButton) return;
        setLockButton(true);
        setShowCorrect(true);
        const isCorrect = variant === currentWord.correctForm;

        if (isCorrect) {
            setCorrectCounter(cc => cc + 1)
        } else {
            setWrongCounter(wc => wc + 1)
        }

        setTimeout(() => {
            setAnim(0)
        }, isCorrect ? 1000 : 3000)
        // }, isCorrect ? 100 : 300)

        setTimeout(() => {
            setAnim(1)
        }, isCorrect ? 1500 : 3500)
        // }, isCorrect ? 600 : 800)

        setTimeout(() => {
            setAnim(2)
            nextWord()
        }, isCorrect ? 1550 : 3550)
        // }, isCorrect ? 650 : 850)
    }

    useEffect(() => {
        startLoading()
        const firstFetch = async () => {
            const newWords = await getRandomCzechWords()
            currentList.current = newWords
            stopLoading()
            setNewWord(currentList.current[0])
        }

        firstFetch()

    }, [])

    return (
        <GameContainer
            anim={anim}
        >   
            {
                loading &&
                    <ActivityIndicator isTransparent={isLoaderTransparent} />
            }
            {
                !loading && currentWord &&
                <TaskContainer>
                    <TaskText>Dejte {<b>{currentWord.cz}</b>} do <b>{PADS[currentWord.correctFormID]}</b></TaskText>
                    <DialogText>
                        – {dialogs[currentWord.correctFormID][0][0]} <br/>
                        – {dialogs[currentWord.correctFormID][0][1].split('{WORD}')[0]}<AnswerVisualGap/> (<b>{currentWord.cz}</b>{currentWord.correctFormID >= 7 ? ' - pl.' : ''}){dialogs[currentWord.correctFormID][0][1].split('{WORD}')[1]}
                    </DialogText>
                </TaskContainer>
            }
            {
                !loading && currentWord &&
                <AnswerContainer>
                    <ButtonsContainer>
                        {
                            currentWord.variants.map(variant => (
                                <VariantButton
                                    onClick={() => checkCorrect(variant)}
                                    correct={showCorrect ? variant === currentWord.correctForm : false}
                                    wrong={showCorrect ? variant !== currentWord.correctForm : false}
                                >
                                    {variant}
                                </VariantButton>
                            ))
                        }
                    </ButtonsContainer>
                </AnswerContainer>
            }
        </GameContainer>
    );
};

export default Game;


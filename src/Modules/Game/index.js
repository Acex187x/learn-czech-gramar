import React, { useEffect, useRef, useState } from 'react';
import { VariantButton, Title, DialogText, ActivityIndicator } from '../../VisualComponents';
import getRandomCzechWords from '../../Helpers/getRandomCzechWords';
import dialogs from '../../Helpers/dialogs';
import PADS from './pads.json'
import { GameContainer, TaskContainer, AnswerContainer, ButtonsContainer, AnswerVisualGap } from './components';

const Game = ({ setCounters, setCountersHidden }) => {

    const currentList = useRef(null)
    const preloadedList = useRef(null)

    const [currentWord, setNewWord] = useState(null)
    const [loading, setLoading] = useState(false)
    const [showCorrect, setShowCorrect] = useState(false);
    const [anim, setAnim] = useState(true);
    const [lockButton, setLockButton] = useState(false);
    const [isLoaderTransparent, setIsLoaderTransparent] = useState(true);
    // const [wrongCounter, setWrongCounter] = useState(0);
    // const [correctCounter, setCorrectCounter] = useState(0);

    const startLoading = () => {
        setAnim(0);
        setIsLoaderTransparent(true);
        setCountersHidden(true);
        setTimeout(() => {
            setAnim(2);
            setLoading(true);
            setIsLoaderTransparent(false);
        }, 500)
    }

    const stopLoading = () => {
        setIsLoaderTransparent(true)
        setCountersHidden(false);
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
            setCounters(c => [c[0] + 1, c[1], c[2]])
        } else {
            setCounters(c => [c[0], c[1] + 1, c[2]])
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
                    <Title>Dejte {<b>{currentWord.cz}</b>} do <b>{PADS[currentWord.correctFormID]}</b></Title>
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


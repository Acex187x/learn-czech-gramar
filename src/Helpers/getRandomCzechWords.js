import { findAllByTestId } from '@testing-library/react';
import firebase from 'firebase/app';
import 'firebase/functions';
import selectRandom from './selectRandom'

function hasDuplicates(array) {
    return (new Set(array)).size !== array.length;
}


async function getRandomCzechWords() {
    const timer = new Date()
    const db = firebase.firestore();
    const getPersonalForm = firebase.functions().httpsCallable('getPersonalForm');

    let isSuitable = false

    // Fetch random dictionary until we find suitable (not empty)
    while (!isSuitable) {
        // Fetch all dictionary docs
        const dictionaryDocs = await db.collectionGroup('dictionaries').get()

        // Select random dictionary doc
        const randomDictionaryDoc = selectRandom(dictionaryDocs.docs)

        // Fetch words from this dictionary
        var randomDictionaryWords = await randomDictionaryDoc.ref.collection('words').get()

        if (!randomDictionaryWords.empty) {

            console.log(randomDictionaryWords.docs)
            // Filter all nouns (we don't need verbs or anything else)
            var nouns = randomDictionaryWords.docs.filter(word => {
                return !!word.data().morfTags && !!word.data().morfTags.includes("podstatné jméno")
            })

        }

        isSuitable = !randomDictionaryWords.empty && nouns && nouns.length > 0
    }

    console.log('words fetched', Date.now() - timer)
    console.log(randomDictionaryWords.docs)


    // Select N random nouns
    const randomWords = Array(10)
        .fill(null)
        .map(() => {
            return selectRandom(nouns).data()
        })
    
    // Get personal forms for all words
    let wordsWithPads = await Promise.all(randomWords.map(async word => {
        // let pads;
        // try {
        //     pads = await getPersonalForm(word.cz)
        // } catch (err) {
        //     return null;
        // }
        // if (!pads || !pads.data) return null;
        // pads = pads.data;

       const pads = word.pads;

       if (!pads) return;

        // Get 4 random unique forms
        let variants;
        let correctFormID;
        let correctForm;
        for (let i = 0; i < 50; i++) {
            variants = Array(4).fill(null).map(el => selectRandom(pads))
            correctFormID = ~~(Math.random() * 13) + 1
            correctForm = pads[correctFormID]
            variants[~~(Math.random() * 4)] = correctForm
            if (!hasDuplicates(variants)) {
                break;
            }
        }

        if (hasDuplicates(variants)) {
            variants = [...new Set(variants)]
        }
        
        return { ...word.trans, pads, variants, correctFormID, correctForm }
    }))

    // Filter failed fetch and give id
    wordsWithPads = wordsWithPads.filter(word => !!word).map((word, id) => ({ ...word, id }));

    console.log('grcw time', Date.now() - timer)

    return wordsWithPads;
}

export default getRandomCzechWords;
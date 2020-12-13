import React from 'react';
import './firebaseConfig'
import firebase from "firebase/app";
import firebaseConfig from './firebaseConfig'
import "firebase/firestore";
import { useEffect, useState } from 'react';
import getRandomCzechWords from './Helpers/getRandomCzechWords'
import styled from 'styled-components';
import Game from './Modules/Game';

const AppContainer = styled.div`
	transition: background 1s;
	width: 100%;
	height: 100%;
	display: grid;
	grid-template-columns: 1fr 4fr 1fr;
  	grid-template-rows: 1fr 4fr 1fr;

	background: linear-gradient(229deg, #3cd2ab, #3cb0d2, #3c7bd2);
	background-size: 150% 150%;

	@media only screen 
		and (min-width: 320px) 
		and (max-width: 480px) {
		grid-template-columns: 0 1fr 0;
		grid-template-rows: 0 1fr 0;
	}

	/* -webkit-animation: gradient 30s ease infinite;
	-moz-animation: gradient 30s ease infinite;
	animation: gradient 30s ease infinite;

	@-webkit-keyframes gradient {
		0%{background-position:97% 0%}
		50%{background-position:4% 100%}
		100%{background-position:97% 0%}
	}
	@-moz-keyframes gradient {
		0%{background-position:97% 0%}
		50%{background-position:4% 100%}
		100%{background-position:97% 0%}
	}
	@keyframes gradient {
		0%{background-position:97% 0%}
		50%{background-position:4% 100%}
		100%{background-position:97% 0%} */
	}
`

function App() {

	useEffect( () => {
		if (process.env.NODE_ENV === 'production') {
			setInterval(() => {
				console.clear();
				console.log ( '%c%s', 'color: green; font: 1.2rem/1 Tahoma;', 'Если уж зашел сюда, то просто обязан подписаться на меня в инсте - @my_acex' );
			}, 5000)
		}
	}, [])

	return (
		<AppContainer>
			<Game />
		</AppContainer>
	);
}

export default App;

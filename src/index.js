import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import firebaseConfig from './firebaseConfig'
import firebase from "firebase/app";

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

if (process.env.NODE_ENV === 'production') {
  setInterval(() => {
    console.clear();
    console.log ( '%c%s', 'color: green; font: 1.2rem/1 Tahoma;', 'Такс, нарушаем значит, да? Кто вам разрешал в консоль заходить? С вас штраф, подписка на мою инсту - @my_acex' );
  }, 5000)
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

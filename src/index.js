import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/App';
import './style/style.scss';
import MarvelService from './services/MarvelService'

let marvelService = new MarvelService();
marvelService.getAllCharacters().then( res =>{
  console.log(res);
})
marvelService.getCharacter(1011196).then(res =>{console.log(res.data)} )




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);


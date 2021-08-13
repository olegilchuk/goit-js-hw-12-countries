import './sass/main.scss';
const debounce = require('lodash.debounce');

import { alert, defaultModules } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import * as PNotifyMobile from '@pnotify/mobile';
import '@pnotify/mobile/dist/PNotifyMobile.css';

import carts from './partials/cart.hbs';

defaultModules.set(PNotifyMobile, {});

const refs = {
  conteinerId: document.getElementById('conteiner'),
  inputId: document.getElementById('input'),
  //   headerId: document.getElementById('header'),
  //   capitaltId: document.getElementById('capital'),
  //   populationId: document.getElementById('population'),
  //   languagesId: document.getElementById('languages'),
  //   imegesId: document.getElementById('imeges'),
};
const debounceHandLeInput = debounce(handLeInput, 500);
refs.inputId.addEventListener('input', debounceHandLeInput);

function handLeInput(e) {
  const query = e.target.value;
  if (query) {
    fetch(`https://restcountries.eu/rest/v2/name/${query}`)
      .then(response => {
        return response.json();
      })
      .then(countries => {
        if (countries.length > 10) {
          alert({
            text: 'Too many matches found. Please enter a more specific query!',
          });
        } else if (countries.length >= 2 && countries.length <= 10) {
          const countrisHtml = countries.map(country => `<h6>${country.name}</h6>`).join('');
          refs.conteinerId.insertAdjacentHTML('afterend', countrisHtml);
        } else if (countries.length === 1) {
          const countrisHtml = carts(countries);
          console.log(countrisHtml);
        }
      })
      .catch(console.error);
  }
}

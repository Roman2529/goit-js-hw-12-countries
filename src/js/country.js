'use strict';
import countrySearch from './country-service';
import refs from './refs';
import oneCountry from '../templates/oneCountry.hbs';
import manyCountrys from '../templates/menyCountrys.hbs';

import '@pnotify/core/dist/BrightTheme.css';
const { error } = require('@pnotify/core');
var debounce = require('lodash.debounce');

refs.formSearch.addEventListener(
  'input',
  debounce(countrySearchInputHandler, 500),
);

function countrySearchInputHandler(e) {
    e.preventDefault();
    clearArticlesContainer();
    const searchQuery = e.target.value;

    countrySearch.fetchArticles(searchQuery).then(data => {
        if (data.length > 10) {
            error({
                text: 'Too many matches found. Please enter a more specific query!',
            });
        } else if (data.status === 404) {
            error({
                text: 'No country has been found. Please enter a more specific query!',
            });
        } else if (data.length === 1) {
            buildList(data, oneCountry);
        } else if (data.length <= 10) {
            buildList(data, manyCountrys);
        }
    })
    .catch(Error => {
        Error({
            text: "You must enter query parameters!"
        });
        console.log(Error);
    })
};

  function buildList(countryes, template) {
    const markup = countryes.map(count => template(count)).join();
    refs.jsArticlesConteiner.insertAdjacentHTML('afterbegin', markup);
  }
  function clearArticlesContainer() {
    refs.jsArticlesConteiner.innerHTML = ' ';
  }

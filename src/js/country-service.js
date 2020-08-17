'use strict';

const baseLink = 'https://restcountries.eu/rest/v2/name/';

export default {
    fetchArticles(query) {
        const getParams = `${query}`
        return fetch(baseLink + getParams).then(res => res.json());
    }
};

import debounce from 'lodash.debounce';
import './css/styles.css';
import { fetchCountriesName } from './fetchCountries';
import country from './templates/country.hbs';
import countryList from './templates/country-list.hbs';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const refs = {
  textInput: document.querySelector('#search-box'),
  listCountry: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

const handleCountiesInput = event => {
  refs.listCountry.innerHTML = '';
  refs.countryInfo.innerHTML = '';

  const inputValue = event.target.value.trim();
  console.log(inputValue);
  fetchCountriesName(inputValue)
    .then(data => {
      if (data.length === 1) {
        return (refs.countryInfo.innerHTML = country(data));
      } else if (data.length > 1 && data.length <= 10) {
        return (refs.listCountry.innerHTML = countryList(data));
      } else if (data.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }
    })
    .catch(err => {
      Notiflix.Notify.failure(err.message);
    });
};

refs.textInput.addEventListener(
  'input',
  debounce(handleCountiesInput, DEBOUNCE_DELAY)
);

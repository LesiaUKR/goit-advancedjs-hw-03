import SlimSelect from 'slim-select';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

const catInfoBox = document.querySelector('.cat-info');
const select = document.querySelector('#selectElement');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

const breedSelect = new SlimSelect({
  select: '#selectElement',
  settings: {
    placeholderText: 'Search cats breeds',
  },
});

fetchBreeds()
  .then(data => {
    const options = [
      {
        value: '',
        text: breedSelect.settings.placeholderText,
        placeholder: true,
      },
      ...data.map(({ name, id }) => ({
        value: `${id}`,
        text: `${name}`,
      })),
    ];
    breedSelect.setData(options);

    select.classList.remove('visually-hidden');
    loader.classList.add('visually-hidden');

    select.addEventListener('change', onChangeSelect);
  })
  .catch(err => {
    loader.classList.add('visually-hidden');
    error.classList.remove('visually-hidden');
    iziToast.show({
      message: 'Failed to fetch cat breeds',
      messageColor: 'red',
      messageSize: '18px',
      backgroundColor: '#ffffff',
      position: 'topRight',
      timeout: 2500,
    });
    console.log(err.message);
  });

function onChangeSelect(evt) {
  const selectedValuesId = evt.target.value;

  loader.classList.remove('visually-hidden');
  catInfoBox.classList.add('visually-hidden');

  fetchCatByBreed(selectedValuesId)
    .then(data => {
      console.log('FetchCatByBreed Response:', data);
      createMarkup(data);
    })
    .catch(err => {
      catInfoBox.innerHTML = '';
      loader.classList.add('visually-hidden');
      error.classList.remove('visually-hidden');
      iziToast.show({
        message: 'Error fetching cat by breed',
        messageColor: 'red',
        messageSize: '18px',
        backgroundColor: '#ffffff',
        position: 'topRight',
        timeout: 2500,
      });
      console.log(err.message);
    })
    .finally(() => {
      loader.classList.add('visually-hidden');
      catInfoBox.classList.remove('visually-hidden');
    });
}

function createMarkup(data) {
  const { url, breeds } = data[0];
  const { name, alt_names, description, temperament } = breeds[0];

  const markup = `
  <div class="imgWrapper">
<img class="image" src="${url}" alt="${alt_names}"/>
  </div>
  <div class="infoWrapper">
    <h2 class='title'>${name}</h2>
    <p class='description'>${description}</p>
    <h3 class='title subtitle'>Temperament</h3>
    <p class='temperament'>${temperament}</p>
  </div>
  `;
  catInfoBox.innerHTML = markup;
}

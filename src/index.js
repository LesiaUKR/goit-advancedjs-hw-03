import SlimSelect from 'slim-select';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

const catInfoBox = document.querySelector('.cat-info');
const select = document.querySelector('#selectElement');
const loader = document.querySelector('.loader');

const breedSelect = new SlimSelect({
  select: '#selectElement',
  settings: {
    placeholderText: 'Search cats beeds',
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
    console.log(err);
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
      console.error('FetchCatByBreed Error:', err);
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

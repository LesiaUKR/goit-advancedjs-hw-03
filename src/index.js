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
  // events: {
  //   afterChange: onChangeSelect,
  // },
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
    select.addEventListener('change', onChangeSelect);

    select.classList.remove('hidden');
    loader.classList.add('hidden');
  })
  .catch(err => {
    console.log(err);
  });

function onChangeSelect(evt) {
  const selectedValuesId = evt.target.value;

  loader.classList.remove('hidden');
  catInfoBox.classList.add('hidden');

  fetchCatByBreed(selectedValuesId)
    .then(data => {
      console.log('FetchCatByBreed Response:', data);
      createMarkup(data);
    })
    .catch(err => {
      console.error('FetchCatByBreed Error:', err);
    })
    .finally(() => {
      loader.classList.add('hidden');
      catInfoBox.classList.remove('hidden');
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

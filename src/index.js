import SlimSelect from 'slim-select';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

console.log(SlimSelect);
const catInfoBox = document.querySelector('.cat-info');

const breedSelect = new SlimSelect({
  select: '#selectElement',
  settings: {
    placeholderText: 'Search cats beeds',
  },
  events: {
    afterChange: onChangeSelect,
  },
});
console.log(breedSelect);

fetchBreeds()
  .then(data => {
    console.log(data);
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
  })
  .catch(err => console.log(err));

function onChangeSelect(selectedOptions) {
  const selectedValuesId = selectedOptions.map(option => option.value);
  console.log(selectedValuesId);

  fetchCatByBreed(selectedValuesId)
    .then(data => {
      console.log(data);
      catInfoBox.innerHTML = createMarkup(data);
    })
    .catch(err => {
      console.log(err);
    });
}

function createMarkup(data) {
  const { url, breeds } = data[0];
  const { name, alt_names, description, temperament } = breeds[0];
  const markup = `
  <div class="imgWrapper">
  <img src="${url}" alt="${alt_names}" width=100% height=500 />
  </div>
  <div class="infoWrapper">
    <h2 class='title'>${name}</h2>
    <p class='description'>${description}</p>
    <h3 class='subtitle'>${temperament}</h3>
  </div>
  `;
  return markup;
}

import SlimSelect from 'slim-select';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

console.log(SlimSelect);

const breedSelect = new SlimSelect({
  select: '#selectElement',
  settings: {
    placeholderText: 'Search cats beeds',
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

const selectedBreedId = e.target.value;
console.log(selectedBreedId);

// fetchCatByBreed(selectedElement).then(data => {
//   console.log(data);
// });

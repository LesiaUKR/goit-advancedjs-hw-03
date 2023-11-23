const BASE_URL = 'https://api.thecatapi.com/v1';
const BREEDS_END_POINT = '/breeds';
const IMAGE_END_POINT = '/images/search';
const API_KEY =
  'live_0MLgLm3ygusJhuSn6RvDBclcWVtxZS27hFvL1qegdoBmEHHqkWml5GyhzLGFd5H8';

export const fetchBreeds = () => {
  return fetch(`${BASE_URL}${BREEDS_END_POINT}`).then(resp => {
    console.log(resp);
    if (!resp.ok) {
      console.log(resp);
      throw new Error('Моя помилка');
    }
    return resp.json();
  });
};

export const fetchCatByBreed = breedId => {
  return fetch(
    `${BASE_URL}${IMAGE_END_POINT}?breeds_ids=${breedId}"&api_key=${API_KEY}`
  ).then(resp => {
    console.log(resp);
    if (!resp.ok) {
      console.log(resp);
      throw new Error('Моя помилка');
    }
    return resp.json();
  });
};

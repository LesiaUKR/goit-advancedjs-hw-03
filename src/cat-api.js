import axios from 'axios';

const BASE_URL = 'https://api.thecatapi.com/v1';
const BREEDS_END_POINT = '/breeds';
const IMAGE_END_POINT = '/images/search';
const API_KEY =
  'live_0MLgLm3ygusJhuSn6RvDBclcWVtxZS27hFvL1qegdoBmEHHqkWml5GyhzLGFd5H8';
axios.defaults.headers.common['x-api-key'] = API_KEY;

export const fetchBreeds = async () => {
  const responce = await axios.get(`${BASE_URL}${BREEDS_END_POINT}`);
  if (!responce || responce.status !== 200) {
    throw new Error('Failed to fetch cat breeds');
  }
  return responce.data;
};

export const fetchCatByBreed = async breedId => {
  const responce = await axios.get(
    `${BASE_URL}${IMAGE_END_POINT}?breed_ids=${breedId}`
  );
  if (!responce || responce.status !== 200) {
    throw new Error('Error fetching cat by breed');
  }
  return responce.data;
};

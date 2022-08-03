const axios = require('axios');
const API_KEY = '28916923-d414eade46dc2c6542ccb3cb8';
const BASE_URL = 'https://pixabay.com/api/';

export const getPhotos = async (searchQuery, page) => {
  const response = await axios.get(
    `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`
  );
  return response.data;
};

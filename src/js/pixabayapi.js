const axios = require('axios');
const API_KEY = 28916923 - d414eade46dc2c6542ccb3cb8;

export const getPhotos = async searchQuery => {
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?key=${API_KEY}&q=${searchQuery}&image_type=photo`
    );
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

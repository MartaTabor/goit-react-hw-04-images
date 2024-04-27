import axios from 'axios';

const API_KEY = '42459291-7f50c47c6b19e5b61fce58d70';

export const fetchPhotos = async (query, page) => {
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

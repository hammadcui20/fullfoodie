import axios from 'axios';

async function fetchMenu() {
  try {
    const api=import.meta.env.VITE_APP_URL;
    const response = await axios.get(`${api}/menu/getmenu`);
    const menuData = response.data;

    
    const snacksBeveragesItems = menuData.filter((item) => item.categories === 'snacks & beverages');

    return snacksBeveragesItems;
  } catch (error) {
    console.error('Error fetching menu:', error);
    throw error;
  }
}

export default fetchMenu;

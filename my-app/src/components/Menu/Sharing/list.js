// import pic_1 from '../imgs/pic-1.png' 
// import pic_2 from '../imgs/pic-2.png' 
// import pic_3 from '../imgs/pic-3.png' 
 
// const arr = [
//     {id : 1, img : pic_1, title : 'Twister Combo', description : 'Twister + 1 Regular fries + 1 Regular drink ', price : 'Rs 670'},
//     {id : 2, img : pic_2, title : 'Twister Combo', description : 'Twister + 1 Regular fries + 1 Regular drink ', price : 'Rs 670'},
//     {id : 3, img : pic_3, title : 'Twister Combo', description : 'Twister + 1 Regular fries + 1 Regular drink ', price : 'Rs 670'},
    
// ]

// export default arr;

import axios from 'axios';

async function fetchcontent() {
  try {
    const api=import.meta.env.VITE_APP_URL;
    const response = await axios.get(`${api}/menu/getmenu`);
    const snacksBeveragesItems = response.data.filter((item) => item.categories === 'sharing');

    return snacksBeveragesItems;
  } catch (error) {
    console.error('Error fetching menu:', error);
    throw error;
  }
}
export default fetchcontent;
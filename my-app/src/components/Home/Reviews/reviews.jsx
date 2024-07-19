import React, { useEffect, useState } from 'react';
import fetchData from './list.js';
import Cards from './cards.jsx';

function Reviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const data = await fetchData();
      setReviews(data);
    };
    fetchReviews();
  }, []);

  return (
    <>
      <div className='text-center mt-10 lg:mt-32 text-3xl lg:text-5xl font-[roboto]'>
        <h1 className='font-bold inline-block'>OUR CUSTOMER REVIEWS</h1>
      </div>
      <div className="reviews grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-10 px-5 md:px-10 lg:px-20 py-10">
        {reviews.map(review => (
          <Cards 
            key={review.id}
            name={review.userid.fname}
            review={review.Comments}
          />
        ))}
      </div>
    </>
  );
}

export default Reviews;

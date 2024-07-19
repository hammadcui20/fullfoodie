import React, { useState, useEffect } from 'react';

function Review() {
  const [user, setUser] = useState({
    name: ''
  });
  const [review, setReview] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const user_id = localStorage.getItem('id');
    const api=import.meta.env.VITE_APP_URL;
    fetch(`${api}/user/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setUser({
          name: data.fname
        });
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
        setMessage('Failed to fetch user data.');
      });
  }, []);

  const handleReviewSubmit = (e) => {
    e.preventDefault();

    if (!review) {
      setMessage('Please enter a review.');
      return;
    }
    const user_id = localStorage.getItem('id');
    const api=import.meta.env.VITE_APP_URL;
    fetch(`${api}/review/postreview`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id: user_id, review }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setMessage('Review submitted successfully!');
          setReview('');
        } else {
          setMessage('Failed to submit review.');
        }
      })
      .catch(error => {
        console.error('Error submitting review:', error);
        setMessage('An error occurred. Please try again.');
      });
  };

  return (
    <div className="flex flex-col items-center p-4 bg-white shadow-md rounded-lg max-w-md mx-auto mt-10 md:max-w-lg lg:max-w-xl">
      <div className="flex items-center mb-4">
        <div className="ml-4">
          <h2 className="text-xl font-semibold">{user.name || 'Name'}</h2>
        </div>
      </div>
      <form onSubmit={handleReviewSubmit} className="w-full">
        <textarea
          name="review"
          id="review"
          placeholder="Feedback or Review"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        ></textarea>
        <button
          type="submit"
          className="mt-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Submit
        </button>
      </form>
      {message && <p className="mt-4 text-red-500">{message}</p>}
    </div>
  );
}

export default Review;

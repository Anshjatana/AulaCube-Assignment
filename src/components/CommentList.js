import React, { useState, useEffect } from 'react';

function CommentList({ postId }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
      .then((response) => response.json())
      .then((data) => {
        setComments(data);
      })
      .catch((error) => {
        console.error('Error fetching comments:', error);
      });
  }, [postId]);

  return (
    <div className="comment-list p-10 bg-[#dab5da] text-black ">
      <h2 className='font-bold text-[25px] uppercase my-10'>Comments for Post #{postId}</h2>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id} className='font-medium my-6'>-{comment.body}
          <strong>{" "}By: {comment.email}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CommentList;

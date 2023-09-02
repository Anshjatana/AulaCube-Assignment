import React, { useState } from 'react';
import './App.css';
import PostList from './components/PostList';
import CommentList from './components/CommentList';

function App() {
  const [selectedPostId, setSelectedPostId] = useState(null);

  const handlePostClick = (postId) => {
    setSelectedPostId(postId);
  };

  return (
    <div className="app">
      <div className="left-side">
        <PostList onPostClick={handlePostClick} />
      </div>
      <div className="right-side">
        {selectedPostId && <CommentList postId={selectedPostId} />}
      </div>
    </div>
  );
}

export default App;

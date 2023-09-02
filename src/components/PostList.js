import React, { useState, useEffect } from "react";

function PostList({ onPostClick }) {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [postIdFilter, setPostIdFilter] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
        setFilteredPosts(data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  useEffect(() => {
    if (postIdFilter) {
      setFilteredPosts(
        posts.filter((post) => post.id.toString() === postIdFilter)
      );
    } else {
      setFilteredPosts(posts);
    }
  }, [postIdFilter, posts]);

  const handlePostClick = (postId) => {
    onPostClick(postId);
  };

  return (
    <div className="post-list flex flex-col items-center justify-center bg-[#250c25] text-white p-8 ">
      <input
        type="number"
        placeholder="Enter Post No"
        value={postIdFilter}
        onChange={(e) => setPostIdFilter(e.target.value)}
        className="border-2 border-black rounded text-center text-gray-900"
      />
      <ul>
        {filteredPosts.map((post) => (
          <li
            key={post.id}
            onClick={() => handlePostClick(post.id)}
            className="my-10"
          >
            <strong>
              {post.id}. Post Title: {post.title}
            </strong>
            <p className="text-gray-300">Content: {post.body}</p>

            <FirstCommentLoader postId={post.id} />
          </li>
        ))}
      </ul>
    </div>
  );
}

// Component to load and display the first comment
function FirstCommentLoader({ postId }) {
  const [firstComment, setFirstComment] = useState("");

  useEffect(() => {
    const fetchComment = async () => {
      const comment = await fetchFirstComment(postId);
      setFirstComment(comment);
    };
    fetchComment();
  }, [postId]);

  return <i>First Comment: {firstComment}</i>;
}

const fetchFirstComment = async (postId) => {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch comments for post #${postId}`);
    }
    const data = await response.json();
    if (data && data.length > 0) {
      return data[0].body; // Return the body of the first comment
    }
  } catch (error) {
    console.error("Error fetching comments:", error);
  }
  return ""; // Return an empty string if there are no comments
};

export default PostList;

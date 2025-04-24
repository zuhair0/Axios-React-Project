import { useEffect, useState } from "react";
import { getPosts } from "../api/PostAPI";
import "../App.css";
export const Posts = () => {
  const [posts, setPosts] = useState([]);
  const getPostData = async () => {
    try {
      const res = await getPosts();
      console.log("Post data:", res.data);
      setPosts(res.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };
  useEffect(() => {
    getPostData();
  }, []);
  return (
    <>
      <ol>
        {posts.map((post) => {
          return (
            <li key={post.id}>
              <p>{post.title}</p>
              <p>{post.body}</p>
              <button>Edit</button>
              <button>Delete</button>
            </li>
          );
        })}
      </ol>
    </>
  );
};

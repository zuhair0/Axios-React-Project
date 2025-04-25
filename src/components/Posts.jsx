import { useEffect, useState } from "react";
import { deletePost, getPosts } from "../api/PostAPI";
import "../App.css";
import { Form } from "./Form";
export const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [updatePost, setUpdatePost] = useState({});

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

  const handleDelete = async (id)=>{
    try {
        const res = await deletePost(id);
        if(res.status=== 200){
            console.log("Post deleted successfully:", res.data);
            setPosts(posts.filter((post) => post.id !== id));
        }
        
    } catch (error) {
        console.error("Error deleting post:", error);
        
    }
  }
  const handleUpdatePost = (post) => {
    setUpdatePost(post);
  }
  return (
    <>
    <Form posts={posts} setPosts={setPosts} updatePost={updatePost} setUpdatePost={setUpdatePost}/>
      <ol>
        {posts.map((post) => {
          return (
            <li key={post.id}>
              <p>{post.title}</p>
              <p>{post.body}</p>
              <button onClick={()=>handleUpdatePost(post)}>Edit</button>
              <button onClick={()=>handleDelete(post.id)}>Delete</button>
            </li>
          );
        })}
      </ol>
    </>
  );
};

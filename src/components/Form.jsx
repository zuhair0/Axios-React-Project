import { useEffect, useState } from "react";
import { createPost, updatePostData } from "../api/PostAPI";
// posts and setPosts are used to manage the list of posts
// updatePost and setUpdatePost are used to manage the post being edited
export const Form = ({ posts, setPosts, updatePost, setUpdatePost }) => {
  const [addData, setData] = useState({
    title: "",
    body: "",
  });

  let isEmpty = Object.keys(updatePost).length === 0;
  useEffect(() => {
    updatePost &&
      setData({
        title: updatePost.title || "",
        body: updatePost.body || "",
      });
  }, [updatePost]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const addPostData = async () => {
    const res = await createPost(addData);
    console.log("Post data:", res.data);
    if (res.status === 201) {
      setPosts([...posts, res.data]);
      setData({
        title: "",
        body: "",
      });
    }
  };
  const updateFullPost = async () => {
    try {
      const res = await updatePostData(updatePost.id, addData);
      console.log("updated data:", res);
      setPosts((prev)=>{
        return prev.map((currPost)=>{
            return currPost.id === res.data.id ? res.data : currPost
        })
      })
      setData({
        title: "",
        body: "",
      });
      setUpdatePost({});
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const action = e.nativeEvent.submitter.value;
    if (action === "Add") {
      addPostData();
    } else if (action === "Edit") {
      updateFullPost();
    }
  };
  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Title"
          value={addData.title}
          onChange={handleInputChange}
        />
        <input
          type="text"
          id="body"
          name="body"
          placeholder="Body"
          value={addData.body}
          onChange={handleInputChange}
        />
        <button type="submit" value={isEmpty ? "Add" : "Edit"}>
          {isEmpty ? "Add" : "Edit"}
        </button>
      </form>
    </>
  );
};

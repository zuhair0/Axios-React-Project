import { useState } from "react";
import { createPost } from "../api/PostAPI";

export const Form = ({ posts, setPosts }) => {
    const [addData, setData] = useState({
        title: "",
        body: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const addPostData = async () => {
        const res = await createPost(addData);
        console.log("Post data:", res.data);
        if(res.status === 201 ){
            setPosts([...posts, res.data]);
            setData({
                title: "",
                body: "",
            });
        }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        addPostData()
    }
  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <input type="text" id="title" name="title" placeholder="Title" value={addData.title} onChange={handleInputChange}/>
        <input type="text" id="body" name="body" placeholder="Body" value={addData.body} onChange={handleInputChange}/>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

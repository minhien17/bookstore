
import axios from "axios";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
export default function EditPost(){
    const [blog,setBlog] = useState({});
    const [newpost,setNewPost] = useState('');
    const {slug} = useParams();
    useEffect(() =>{
        const fetchData = async() => {
            try{
                const response = await axios.get(`http://localhost:3030/posts/${slug}`);
                if(response){
                    const data = response.data;
                    console.log(data)
                    setBlog({slug:data.slug, title: data.title, description: data.description});
                }
            }catch(error){
                console.error(error);
            }
        }
        fetchData();
    },[]) 
    const handleSubmit = async() => {
        try{
            const response = await axios.patch(`http://localhost:3030/posts/${slug}`,blog);
            if(response)
                setNewPost("Post create successfully!");
        }catch(error){
            console.error("Error creating post: ",error);
            setNewPost("Post created failed!")
        }
    }
    return(
        <>
            <h2>Add new post</h2>
            <label>Slug: </label><br/>
            <input type = 'text' value={blog.slug}  onChange={(e) => setBlog({...blog, slug: e.target.value})}/> <br/>
            <label>Title: </label><br />
            <input type = 'text' value={blog.title} onChange={(e) => setBlog({...blog, title: e.target.value})}  /> <br/>
            <label>Description: </label> <br />
            <input type='text' value={blog.description} onChange={(e) => setBlog({...blog, description: e.target.value})} /> <br />
            <button onClick={handleSubmit}>
                Edit post
            </button>
            <p>{newpost}</p>
        </>
    )
}
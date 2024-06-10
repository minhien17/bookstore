import axios from 'axios';
import { useState } from 'react'
import {BrowserRouter as Router,Routes, Route, Link} from 'react-router-dom'

export default function NewPost (){
    const [blog,setBlog] = useState({});
    const [newpost,setNewPost] = useState('');
    
    const handleSubmit = async() => {
        try{
            const response = await axios.post('http://localhost:3030/newpost',blog);
            console.log(response);
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
            <input type = 'text' onChange={(e) => setBlog({...blog, slug: e.target.value})} /> <br/>
            <label>Title: </label><br />
            <input type = 'text' onChange={(e) => setBlog({...blog, title: e.target.value})} /> <br/>
            <label>Description: </label> <br />
            <input type='text' onChange={(e) => setBlog({...blog, description: e.target.value})} /> <br />
            <button onClick={handleSubmit}>
                Add post
            </button>
            <p>{newpost}</p>
        </>
    )
}
import axios from "axios";
import { useEffect, useState } from "react"
import {BrowserRouter as Router,Routes, Route, Link, Outlet, useNavigate} from 'react-router-dom'

export default function PostList (){// lấy api cho tiêu đề posts
    const [data,setData] = useState([]);
    const [loading,setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    useEffect(()=>{
        const fetchData = async() =>{
            try{
                const response = await axios.get("http://localhost:3030/posts");
                if(!response){
                    throw new Error(`HTTP error! Status: ${response.status}`)
                }
                const result = response.data;
                
                setData(result);
                setLoading(false);
            }catch(error){
                console.error("error fetching data: ",error);
                setError("An error occurred while fetching the data");
                setLoading(false);
            }
        }
        fetchData();
    },[])
    const handleEdit = (slug) => {

        navigate(`/posts/${slug}/edit`);
    }
    const handleDelete = async(slug) => {
        try{
            const response = await axios.delete(`http://localhost:3030/posts/${slug}`);
            if(response) alert('delete success');
        }catch(error){
            console.log(error)
        }
    }
    return(
        
        <ul>
            {data.map((d) => (
                <li key={d.slug}>
                    <Link to = {`/posts/${d.slug}`} >
                    <h3>{d.title}</h3>
                    </Link>
                    <button onClick={() => handleEdit(d.slug)} style={{}} >Edit</button>
                    <button onClick={() => handleDelete(d.slug)}>Delete</button>
                </li>
            ))}
        </ul>
        
    )
}
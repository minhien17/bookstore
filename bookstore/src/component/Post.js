import { useEffect, useState } from "react"
import {BrowserRouter as Router,Routes, Route, Link, useParams} from 'react-router-dom'
import axios from 'axios';

export default function Post (){// lấy api cho tiêu đề posts
    const {slug} = useParams();
    const [data,setData] = useState([]);
    const [loading,setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(()=>{
        const fetchData = async() =>{
            try{
                const response = await axios.get("http://localhost:3030/posts/"+slug);
                if(!response){
                    throw new Error(`HTTP error! Status: ${response.status}`)
                }
                console.log(response)
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
    return(
        <>
            <h2>{data.title}</h2>
            <p>{data.description}</p>
        </>
    )
}
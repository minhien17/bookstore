import axios from "axios";
import { useEffect, useState } from "react"

export default function Information(){
    const username = Object.keys(localStorage)[0];
    const token = localStorage.getItem(username);
    const headers = {'authorization': `Bearer ${token}`}

    const [user, setUser] = useState('');
    useEffect(() => {
        const fetchData = async() =>{
            const res = await axios.get('http://localhost:8080/infor',{headers});
            setUser(res.data.last_name)
        }
        fetchData();
    });
    return(
        <div>
            hello {user}
        </div>
    )
}
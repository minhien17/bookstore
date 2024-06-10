import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { Button, Card, Form, Input } from "antd";

export default function Login ({onlogin}){
    const [user, setUser] = useState({});
    const [check, setCheck] = useState('');
    const navigate = useNavigate();
    const handleClick = async() => {
        try{
            const response = await axios.post('http://localhost:8080/login',user);
            const data = response.data;
            
            localStorage.setItem(user.username, data.token)

            if(data){
                onlogin&&onlogin({username: user.username});
                navigate('/');
            }
        }catch(error){
            console.error("Error login: ",error);
            setCheck(error.response.data.message);
        }
    }
    return(
        <div className="login-page">
            <Card className="login-form" title= 'Đăng nhập' >

                <p style={{color: 'red'}}>{check}</p>

                <Input className="input" type = 'text' placeholder="Tên đăng nhập" onChange={(e) => setUser({...user, username: e.target.value})} /> <br/>
                
                <Input className="input" type = 'password' placeholder="Mật khẩu" onChange={(e) => setUser({...user, password: e.target.value})} /> <br/>

                <Button style={{margin: '10px', width: '300px', backgroundColor: 'rgb(66, 64, 64)', color: 'white'}} onClick={handleClick}>Đăng nhập</Button>

                <p>Chưa có tài khoản? <Link to = '/signup'>Đăng ký</Link></p> 
            </Card>
        </div>
    )
}
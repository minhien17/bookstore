import { Button, Card, Input } from "antd";
import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";

export default function Signup(){
    const [user,setUser] = useState({});
    const [noti,setNoti] = useState('');
    const navigate = useNavigate();
    const handleClick = async() => {
        try{
            const res = await axios.post('http://localhost:8080/signup',user);
            const data = res.data;

            if(res){
                navigate('/login');
            }

        }catch(error){
            console.error(error);
            setNoti(error.response.data.message)
        }
    }
    return(
        <div className="login-page">
            <Card className="signup-form" title= 'Đăng Ký' >

                <p>Tài khoản</p>

                <Input className="input" type = 'text' placeholder="Tên đăng nhập" onChange={(e) => setUser({...user, username: e.target.value})} /> <br/>
                <Input className="input" type = 'password' placeholder="Mật khẩu" onChange={(e) => setUser({...user, password: e.target.value})} /> <br/>

                <p>Thông tin cá nhân</p>
                <Input className="input" type = 'text' placeholder="Họ và tên đệm" onChange={(e) => setUser({...user, first_name: e.target.value})} />
                <Input className="input" type = 'text' placeholder="Tên" onChange={(e) => setUser({...user, last_name: e.target.value})} />
                <Input className="input" type = 'text' placeholder="Email" onChange={(e) => setUser({...user, email: e.target.value})} />
                <Input className="input" type = 'text' placeholder="Địa chỉ" onChange={(e) => setUser({...user, address: e.target.value})} />

                <p style={{color: 'red'}}>{noti}</p>
                <Button style={{margin: '10px', width: '300px', backgroundColor: 'rgb(66, 64, 64)', color: 'white'}} onClick={handleClick}>Đăng ký</Button>

            </Card>
        </div>
        
    )
}
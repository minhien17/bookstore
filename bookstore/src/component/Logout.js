import { useNavigate } from "react-router-dom";

export default function Logout({onLogin}){// Có tất cả các tùy chọn chuyển hướng trang đơn
    
    localStorage.clear();
    
    const navigate = useNavigate();
    {onLogin && onLogin(true)
        navigate('/');
    }
}
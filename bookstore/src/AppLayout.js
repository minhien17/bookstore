import Head from './component/Head';
import Body from './component/Body';
import {BrowserRouter as Router,Routes, Route, Link, useLocation} from 'react-router-dom'
import Buyform from './component/Buyform';
import BookDetail from './component/BookDetail';
import { useState } from 'react';
import Login from './component/Login';
import About from './component/About';
import PostList from './component/PostList';
import Posts from './component/Posts';
import Post from './component/Post';
import NewPost from './component/NewPost';
import ProtectedRoute from './component/ProtectedRoute';
import EditPost from './component/EditPost';
import Signup from './component/Signup';
import Home from './component/Home';
import Package from './component/Package';
import Logout from './component/Logout';
import Information from './component/Information';
import './App.css';
export default function AppLayout(){
    const [login,setLogin] = useState(false);

    const handleLogin = () =>{
        setLogin(true);
    }

    const handleLogout = () => {
        setLogin(false);
    }

    const location = useLocation();
    let isLoginPage = false
    if(location.pathname === '/login' || location.pathname === '/signup')
        isLoginPage = true

    return (
        <div>
        {/* các tùy chọn link cho web */}
        {/* <div  className= {isLoginPage ? 'blur-background' : ''} >   --- làm mờ kiểu này hơi ngu vì được có mỗi header*/}
            {!isLoginPage && <Head onLogin={login} /> }
        {/* </div> */}
        <>
            <Routes>
                <Route path='/home' element = {<Home />} />
                <Route path='/' element = {<Body />} />
                <Route path='/login' element = {<Login onlogin={handleLogin}/>} />
                <Route path='/about' element = {<About />} />
                <Route path='/logout' element = {<Logout onLogin={handleLogout} />}  />
                <Route path='/infor' element = {<ProtectedRoute user={login}> <Information /></ProtectedRoute>} />
                {/* <Route path='/posts' element = {<Posts />}>
                    <Route index element = {<PostList />} />
                    <Route path=':slug' element = {<Post />}/>
                </Route> */}
                <Route path='/signup' element ={<Signup />} />
                
                <Route path='/newpost' element = {<ProtectedRoute user={login}> <NewPost /> </ProtectedRoute>}/>
                <Route path='/posts/:slug/edit' element={<EditPost />} />
                <Route path='/book/:slug' element = {<BookDetail />} />

                <Route path='/package' element = {<ProtectedRoute user={login}> <Package /> </ProtectedRoute>}/>
                {/* <Route path='/buyform' element = {<ProtectedRoute user={login}> <Buyform /> </ProtectedRoute>} /> */}
            </Routes>
        </>
        </div>
    )
}
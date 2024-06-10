import { Outlet } from "react-router-dom";
import Head from "./Head";
import {BrowserRouter as Router,Routes, Route, Link} from 'react-router-dom'


export default function Posts (){
    return(
        <>
        <Head />
        <h3>Post review book</h3>
        <h3><Link to= '/newpost'>Add new post</Link></h3>
        <Outlet />
        </>
    )
}
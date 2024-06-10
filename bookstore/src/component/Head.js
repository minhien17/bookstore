import { Link } from 'react-router-dom'
import './style.css'
import { Input, Space } from 'antd';
import {BookOutlined, HomeOutlined, ShoppingCartOutlined, UserOutlined} from '@ant-design/icons';
import { useState } from 'react';
export default function Head({onLogin}){// Có tất cả các tùy chọn chuyển hướng trang đơn
    const {Search} = Input;
    
    const onSearch = (e) =>{// xu ly 
        alert(e);
    }

    return(
        <div className="head">
            <div className='head-container'>
                <div className='head-option'>
                    
                    <div className='item-header'><span>
                        <Link to={'/home'}>
                            <HomeOutlined style={{margin: 0}} /> Trang chủ
                        </Link></span>
                    </div>
                    <div className='item-header'><span>
                        <Link to = {'/'}><BookOutlined style={{margin: 0}}  /> Sản Phẩm
                        </Link>
                    </span></div>
                    {onLogin && <div className='item-header'><span>
                        <Link to={'/package'}><ShoppingCartOutlined style={{margin: 0}}  /> Giỏ hàng
                        </Link>
                    </span></div>}
                </div>
                <Search  placeholder="type name of book" 
                    onSearch={ value => onSearch(value) } 
                    style={{ width: 400, minWidth: 200 }} 
                    enterButton="Tìm kiếm"
                />
                
                <div className='head-login'>
                    {onLogin && 
                    <div className='account-menu' style={{width: 140, color: 'rgb(46, 46, 55)'}}>
                        <span style={{fontSize: 20}}><UserOutlined style={{fontSize:28, margin:0}}/>Tài khoản</span>
                        <div className='dropdown'>
                            <Link to={'/infor'}>Thông tin cá nhân</Link>
                            <Link>Đơn hàng của tôi</Link>
                            <Link to={'/logout'}>Đăng xuất</Link>
                        </div>
                    </div>
                    }
                    
                    {!onLogin && <div className='item-header'><span ><Link to = {'/login'}>Đăng nhập</Link></span></div>}
                </div>
                
            </div>
            
        </div>
    )
}
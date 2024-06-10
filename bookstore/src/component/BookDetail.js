import { useNavigate, useParams } from "react-router-dom";
import './style.css'
import { Button, Col, Image, Input, InputNumber, Radio, Row } from "antd";
import { MinusOutlined, PlusOutlined, StarFilled } from "@ant-design/icons";
import { useEffect, useState } from "react";
import axios from 'axios';

export default function BookDetail(){

    const link = 'http://localhost:8080';
    const { slug } = useParams();//{`D:web/bookstore/public/img/${bookId}.jpg`}
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [total, setTotal] = useState(price);

    // dinh danh
    const username = Object.keys(localStorage)[0];
    const token = localStorage.getItem(username);
    const headers = {'Authorization':`Bearer ${token}`};

    // thong tin users 
    const [posts, setPosts] = useState([])
    const [users, setUsers] = useState([])
    const [owner, setOwner] = useState({})

    // comment
    const [cmt,setCmt] = useState('');// cmt cua owner
    const [reviews, setReviews] = useState([]);
    const navigate = useNavigate();
    const [checkNewCmt, setCheckNewCmt] = useState(false);

    // thong tin san pham
    const [product, setProduct] = useState({});
    
    const addButton = (v) =>{
        v +=1;
        setQuantity(v);
        setTotal(price*v);
    }
    
    const subButton = (v) =>{
        if(v>1) v-=1;
            
        setQuantity(v);
        setTotal(price*v);
    }

    useEffect(() =>{
        const fetchData = async() =>{
            try {
                // lay thong tin san pham
                const resProduct = await axios.get(`${link}/book/${slug}`);
                setProduct(resProduct.data);
                setPrice(resProduct.data.price);
                setTotal(resProduct.data.price*quantity)

                // lay thong tin bai post
                const res = await axios.get(`${link}/book/post/${slug}`);
                if(res.data !== null){
                    setPosts(res.data.comments)
                }
                //console.log(res.data)
                
                // dinh danh nguoi dung
                if(username){
                    const resUser = await axios.get(`${link}/infor`,{headers});
                    if(resUser.data) setOwner(resUser.data)
                    // console.log(resUser.data)
                }
            

                // lay thong tin nguoi post bai
                const resPost = await axios.get(`${link}/users`);
                setUsers(resPost.data);


                // lay thong tin review san pham
                const resReview = await axios.get(`${link}/book/review/${slug}`, cmt);
                if(resReview.data) setReviews(resReview.data.comments);

            } catch (error) {
                console.error(error)
            }
        }
        fetchData();
    },[checkNewCmt])

    const handleClick = async() =>{
        if(owner.length = 0) navigate('/login');
        if(cmt !== ''){
            const reqData = {comment: cmt, userid: owner._id}
            const resNewCmt = await axios.post(`${link}/book/review/${slug}`,reqData);
            if(resNewCmt.data) setCheckNewCmt(true);
        }
    }

    const findUserById = (users, userid) =>{
        const user = users.find(user => user._id === userid);
        return user ? user.last_name : 'not found';
    }

    return(
        <div className="main-page-detail">
            <Row style={{padding: '16px',backgroundColor: 'white', margin: '10px', borderRadius: '10px'}}>
                <Col span='10' style={{borderRight: '1px solid #e5e5e5'}}>
                    <Image className="img-big" src= {product.src} alt= {product.slug} preview={false} />
                    <Row>
                        <Col span={6}  className="img-small-contain">
                            <Image className="img-small" src= {product.src} alt= {product.slug} preview={false} />
                        </Col>
                        <Col span={6}>
                            <Image className="img-small" src= {product.src} alt= {product.slug} preview={false} />
                        </Col>
                        <Col span={6}>
                            <Image className="img-small" src= {product.src} alt= {product.slug} preview={false} />
                        </Col>
                        <Col span={6}>
                            <Image className="img-small" src= {product.src} alt= {product.slug} preview={false} />
                        </Col>
                    </Row>
                    

                </Col>
                <Col span='14' style={{paddingLeft: '15px'}}>
                    <div className='name-product-detail' style={{margin: '10px'}}><h3>{product.name}</h3></div>
                    <div className='rate-product' style={{margin: '10px'}}><span>{product.rate}</span><StarFilled className='star' /><span> | đã bán 100+</span></div>
                    <div className='price-product' style={{margin: '10px', fontSize: '25px'}}><span>{price.toLocaleString('vi-VN')} đ</span></div>

                    <div className="option-product" >
                        <p>Phân loại</p>
                        <Radio.Group style={{marginTop: 10}}>
                            <Radio.Button value={'hard'}>Bìa cứng</Radio.Button>
                            <Radio.Button value={'sorf'}>Bìa mềm</Radio.Button>
                        </Radio.Group>

                    </div>
                   
                    <div className="address">Giao đến Thái Bình<span style={{color: 'rgb(10,104,255)'}}>-Đổi địa chỉ</span></div>

                    <div className="quantity-product">
                        <p>Số lượng:</p>
                        <Button icon={<MinusOutlined />} className="quantity-button" onClick={() => subButton(quantity)}></Button>
                        <InputNumber min={1} max={10} style={{width: 40}} value={quantity}/>
                        <Button icon={<PlusOutlined />} className="quantity-button" onClick={() => addButton(quantity)}></Button>
                    </div>

                    <div className="buy-product">
                        <p>Tạm tính</p>
                        <div style={{fontSize: 25}}><span>{total.toLocaleString('vi-VN')} đ</span></div>
                        <Button type="primary" style={{margin: '10px', backgroundColor: 'red'}}>Mua ngay</Button>
                        <Button type="primary" style={{backgroundColor: 'white',color: 'blue', border: '1px solid blue'}}>Thêm vào giỏ hàng</Button>
                    </div>
                    
                </Col>
            </Row>
            <div className="information-product">
                <h3>Thông tin giới thiệu sản phẩm</h3>
                <h4>Kích cỡ</h4>
                <h4>Chất liệu</h4>
            </div>

            <div className="blog-post">
                <h5>Các Blog về cuốn sách này</h5>
                {posts.length > 0 ? (posts.map((post) => {
                    return(
                        <div key={post._id}>
                            <p>{findUserById(users,post.userid)}</p>
                            <p>{new Date(post.date_time).toLocaleString()}</p>
                            <p>{post.comment}</p>
                        </div>
                    )
                })) : (
                    <p>- no comment</p>
                )
                }
            </div>

            <div className="comment-product">
                <h5>Đánh giá sản phẩm</h5>
                {/* thêm điều kiện đăng nhập để cmt */}
                {username ? 
                    <p>{owner.last_name}</p>
                : <p>chưa đăng nhập</p>
                }
                <Input style={{width:'500px'}}  onChange={(e) => setCmt(e.target.value)} placeholder="Review this book"/>

                <Button style={{margin: 10, backgroundColor: 'blue'}} type= 'primary' onClick={handleClick}>Bình luận</Button>
                {reviews.length > 0 ? (reviews.map((review) =>(
                    <div key={review.date_time}>
                        <p>{findUserById(users,review.userid)}</p>
                        <p>{review.comment}</p>
                    </div>
                )
                )):(
                    <p>-no review</p>
                )}


            </div>
        </div>
    )
}
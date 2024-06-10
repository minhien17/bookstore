import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, Image, InputNumber, Row } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Package (){

    const [quantity, setQuantity] = useState(1);
    const price = 100000; // sẽ lấy giá phía backend
    const [total, setTotal] = useState(price);

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

    return(
        <div className="package-page">
            <h4>Giỏ hàng</h4>
            <div className="total-package">
                <Row style={{margin: 0}}>
                    <Col span = {12}>
                        <Checkbox style={{marginRight: 5}}/>
                        Tất cả
                    </Col>
                    <Col span = {3}>
                        Đơn giá
                    </Col>
                    <Col span = {4}>
                        Số lượng
                    </Col>
                    <Col span = {3}>
                        Thành tiền
                    </Col>
                    <Col span = {1}>
                        Xóa
                    </Col>
                </Row>
            </div>
            <div className="product-list-package">
                <Row style={{margin: 0}}>
                    <Col span = {12}>
                        <div className="product-infor-package">
                            <Checkbox style={{marginRight: 5}}/>
                            <Image 
                                width={80} 
                                style={{marginRight: 5, border: '0.5px solid gray'}}
                                src="https://sumenhkimcuong.com/wp-content/uploads/nang-doan-kim-cuong-front-cover.jpg" preview={false}
                            />
                            <Link to = '/book/nang-doan-kim-cuong' ><span className="name-product-package">Năng đoạn kim cương</span>
                                
                            </Link>
                        </div>
                    </Col>
                    <Col span = {3}>
                        <div className="other-infor-package">
                            <span>100000</span>
                        </div>
                    </Col>
                    <Col span = {4}>
                        <div className="other-infor-package">
                            <Button icon={<MinusOutlined />} style={{width:25}}  onClick={() => subButton(quantity)}></Button>
                            <InputNumber min={1} max={10} style={{width: 30}} value={quantity}/>
                            <Button icon={<PlusOutlined />} style={{width: 25}} onClick={() => addButton(quantity)}></Button>
                        </div>
                    </Col>
                    <Col span = {3}>
                        <div className="other-infor-package">
                            <span>{total}</span>
                        </div>
                    </Col>
                    <Col span = {1}>
                        <div className="other-infor-package">
                            <span>xóa</span>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

import {useNavigate} from 'react-router-dom';
import './style.css'
// import {} from '@ant-design/icons';
import { Card } from 'antd';
import Meta from 'antd/es/card/Meta.js';
import { ShoppingCartOutlined, StarFilled } from '@ant-design/icons';
export default function Body(){

    const navigate = useNavigate();

    function removeVietnameseTones(str) {
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
        str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
        str = str.replace(/đ/g,"d");
        str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
        str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
        str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
        str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
        str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
        str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
        str = str.replace(/Đ/g, "D");
        // Some system encode vietnamese combining accent as individual utf-8 characters
        // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
        str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
        str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
        // Remove extra spaces
        // Bỏ các khoảng trắng liền nhau
        str = str.replace(/ + /g," ");
        str = str.trim();
        // Remove punctuations
        // Bỏ dấu câu, kí tự đặc biệt
        str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
        return str;
    }// clone github

    const handleClick = (name) =>{
        const tam = removeVietnameseTones(name);
        const bookId = tam.toLowerCase().replace(/\s+/g,'-');
        console.log(bookId)
        navigate(`./book/${bookId}`);
    }

    const Book = ({link,name}) => {
        return (
            <Card
            className='card'
            hoverable
            cover={<img 
                alt="tên sách" 
                src= {link}
                style={{width: 230, height: 230}}
                />}
            onClick={() => handleClick(name)}
            >
            <div className='name-product'><h3>{name}</h3></div>
            <div className='rate-product'><span>5</span><StarFilled className='star' /><span> | đã bán 100+</span></div>
            <div className='price-product'><span>100.000 đ</span></div>
            <div className='buy-product'><ShoppingCartOutlined className='shopping' /><span>Thêm vào giỏ hàng</span></div>

            </Card>
        )
    }

    return(
        <div className="container">
            <Book 
                link = 'https://salt.tikicdn.com/ts/product/2a/0f/8f/c987b451f57f4a36cf355ed193562965.jpg' 
                name = 'Năng đoạn kim cương'
            />
            <Book 
                link = 'https://bizweb.dktcdn.net/100/445/986/products/8935278607311.jpg?v=1696296854263' 
                name = 'Không sinh không diệt đừng sợ hãi'
            />
            <Book 
                link = 'https://vn-test-11.slatic.net/p/e5ae5f5dca6c5fceba466e4d30f47e9a.png' 
                name = 'Nguyên lý 80/20'
            />
        </div>
    )
}
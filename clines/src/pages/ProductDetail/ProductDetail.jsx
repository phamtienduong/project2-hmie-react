import React, { useEffect, useState } from 'react'
import './ProductDetail.css'
import { useDispatch, useSelector } from 'react-redux';
import { action } from '../../action/action';
import { message } from 'antd';
import { useNavigate } from "react-router-dom"
export default function ProductDetail() {
    // lấy id của product cần vẽ
    const idProductDetail = localStorage.getItem("idProductDetail")
    // lưu thông tin sản phẩm
    const [productDetail, setProductDetail] = useState({})

    const data = useSelector(store => store.reducer)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000,
    };


    useEffect(() => {
        // lấy thông tin sản phẩm cần vẽ
        fetch(`http://localhost:7500/products/${idProductDetail}`)
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                setProductDetail(data);
            })
    }, [])

    // thêm sản phẩm vào giỏ hàng
    const handleAddToCart = (id) => {
        // lấy thông tin người mua
        const userLogin = JSON.parse(localStorage.getItem("currentUser")) || {}
        // lấy ra giỏ hàng của người đó
        const cart = userLogin.cart
        if (!userLogin.id) {
            message.error("Bạn chưu đăng nhập")
            setTimeout(()=>{
                navigate("/login");
            },2000)
            return
        }

        // tìm xem có sp muốn thêm chưa
        const index = cart.findIndex(item => item.idProduct == id)
        // chưa có thì thêm mới
        if (index == -1) {
            cart.push({
                idProduct: id,
                quantity: 1
            })
        } else {
            // có rồi thì tăng số lượng
            cart[index].quantity++
        }
        // cập nhật lại thông tin cho local
        userLogin.cart = cart
        localStorage.setItem("currentUser", JSON.stringify(userLogin))
        dispatch(action("setUserLogin"))
    }



    return (
        <div>
            <main style={{ position: 'relative' }}>
                <div className="main mt-[-75px]">
                    <div className="main_img">
                        <div className="img_sale">
                            <div className="img_sale_1">
                                <span>SALE 50%</span>
                            </div>
                            <img src="../../../src/assets/img/anh_sale.webp" alt="img" />
                        </div>
                        <img id="img_product" src={productDetail.image} alt="img" ></img>
                    </div>
                    <div className="detail-container">
                        <div className="detail-product-wrap">
                            <div className="main_product">
                                <h1 id="name_product" >{productDetail?.name}</h1>
                                <span>SKU: <span id="id_product" />{productDetail?.id}</span>
                            </div>
                            <div className="main_product_price">
                                <span id="price_product" >{Number(productDetail?.price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                            </div>
                        </div>
                        <div className="wrap-addcart">
                            <button onClick={() => handleAddToCart(productDetail?.id)} className="btn-cart w-[479.33px] h-[56px]">Thêm vào giỏ hàng</button>
                        </div>
                        <div className="product-description">
                            <p><strong>Chất liệu:&nbsp;</strong>vải tweed</p><br />
                            <p><strong>Kiểu dáng:&nbsp;</strong>váy mini thiết kế dáng chữ A, cỏ tròn, eo đính nơ bản to</p><br />
                            <p><strong>Sản phẩm kết hợp:</strong> áo tay bèo H313 - áo dài tay H272</p><br />
                            <p><strong>Thông tin người mẫu:</strong>  cao 1m60, số đo 84 - 60 - 90 mặc sản phẩm size S</p><br />
                        </div>
                    </div>
                </div>
                {/* Swiper */}
                {/* <div className='truncate'>
                    <Slider {...settings}>
                        <div >
                            <h3 className='flex justify-center'>
                                <img className='w-[295px] h-[400px] mr-1' src='../../../src/assets/img/ao/ao-ren-tay-bong-0.webp'></img>
                                <img className='w-[295px] h-[400px] mr-1' src='../../../src/assets/img/ao/ao-ren-tay-bong-0.webp'></img>
                                <img className='w-[295px] h-[400px] mr-1' src='../../../src/assets/img/ao/ao-ren-tay-bong-0.webp'></img>
                                <img className='w-[295px] h-[400px] mr-1' src='../../../src/assets/img/ao/ao-ren-tay-bong-0.webp'></img>
                                <img className='w-[295px] h-[400px] mr-1' src='../../../src/assets/img/ao/ao-ren-tay-bong-0.webp'></img>
                            </h3>
                        </div>
                        <div>
                            <h3></h3>
                        </div>
                    </Slider>
                </div> */}
            </main>
        </div>
    )
}

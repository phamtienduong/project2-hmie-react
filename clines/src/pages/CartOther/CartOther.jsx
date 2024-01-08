import React, { useEffect, useMemo, useState } from 'react'
import "./CartOther.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Button, message, Popconfirm } from 'antd';
export default function CartOther() {
    // lấy thông tin người mua
    const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {}

    // lấy ra cái giỏ hàng của người mua
    const [cart, setCart] = useState(currentUser.cart)
    // cái giỏ hàng thật sự dùng để vẽ vì nó đã có thêm thông tin sản phẩm
    const [cartRender, setCartRender] = useState([])

    // tính toán tổng tiền
    let totalMoney = cartRender.reduce((total, current) => {
        return total + current.quantity * current.price
    }, 0)


    const navigate = useNavigate()
   
    // lấy thông tin từng sản phẩm trong giỏ
    const getInfoProducts = async () => {
        const newCartRender = []
        for (let i = 0; i < cart.length; i++) {
            const result = await axios.get(`http://localhost:7500/products/${cart[i].idProduct}`)
            newCartRender.push({ ...result.data, quantity: cart[i].quantity, })
        }
        setCartRender(newCartRender)
    }

    // click vào sản phẩm để xem chị tiết sp đó
    const handleClickProduct = (id) => {
        localStorage.setItem("idProductDetail", id)
        navigate("/productDetail")
    }

    // xoá một sản phẩm khỏi giỏ hàng
    const confirm = async (e, id) => {

        const newCart = cart.filter((item) => item.idProduct != id)
        currentUser.cart = newCart

        localStorage.setItem('currentUser', JSON.stringify(currentUser))
        await axios.patch(`http://localhost:7500/users/${currentUser.id}`, { cart: newCart })

        message.success('Thành Công');
        setCart(newCart)

    };
    const cancel = (e) => { };

    // chỉnh số lượng các sản phẩm
    const changeQuantity = async (id, status) => {
        // lấy thông tin sản phẩm
        const product = cartRender.find(product => product.id == id)
        // vị trí sản phẩm cần update trong giỏ hàng
        let indexCart = cart.findIndex(item => item.idProduct == id)

        const newCart = [...cart]
        switch (status) {
            // 1 là trừ
            case 1:
                if (product.quantity - 1 > 0) {
                    newCart[indexCart].quantity -= 1
                }
                break;
            // 2 là tăng
            case 2:
                if (product.quantity + 1 <= product.stock) {
                    newCart[indexCart].quantity += 1
                    } else {
                        message.error('Vượt quá số lượng trong kho')
                }
                break;
        }
        // cập nhật lại thông tin cart
        currentUser.cart = newCart

        localStorage.setItem('currentUser', JSON.stringify(currentUser))
        await axios.patch(`http://localhost:7500/users/${currentUser.id}`, { cart: newCart })
        setCart(newCart)
    }

    // mua hàng
    const handleCheckout = async () => {
        await axios.put(`http://localhost:7500/users/${currentUser.id}`, currentUser)
        navigate("/checkout")
    }
    const handleByMore = ()=>{
        navigate("/products")
    }

    useEffect(() => {
        getInfoProducts()
    }, [cart])

    return (
        <div className='w-[1140px] m-auto ' >
            <div className='text-center mb-4'>
                <h1 className='font-bold text-3xl'>Giỏ hàng của bạn</h1>
                <span>Có {cartRender.length} sản phẩm trong giỏ hàng</span>
            </div>
            <div className='container-cart'>
                <div className='list_product'>
                    <table className="table-auto" cellPadding={10} cellSpacing={10}>
                        <thead className=' thead-cart  h-[60.4px] text-center rounded'>
                            <tr>
                                <th>Hình ảnh</th>
                                <th>Thông tin</th>
                                <th>Số lượng</th>
                                <th>Giá tiền</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cartRender.map((item) => (
                                    <tr key={item.id} className='text-center' >
                                        <td className='w-[86.77px] h-[115.15px] rounded'><img width={100} src={item.image} alt='img'></img></td>
                                        <td>
                                            <span>{item.name}</span> <br></br>
                                            <span onClick={() => handleClickProduct(item.id)} className='underline decoration-2 text-blue-500 cursor-pointer'>Xem lại</span>
                                        </td>
                                        <td>
                                            <button className='btn-quantity' onClick={() => changeQuantity(item.id, 1)}>
                                                -
                                            </button>
                                            <span className='ml-4 mr-4'>{item.quantity}</span>
                                            <button className='btn-quantity' onClick={() => changeQuantity(item.id, 2)}>
                                                +
                                            </button>
                                        </td>
                                        <td className=''>{Number(item.price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                                        <td >

                                            <Popconfirm
                                                title="Xoá nghiệm vụ"
                                                description="Bạn có muốn xoá sản phẩm?"
                                                onConfirm={(e) => confirm(e, item.id)}
                                                onCancel={cancel}
                                                okText="Đồng ý"
                                                cancelText="Không đồng ý"
                                            >
                                                <div className='w-[25px] h-[25px] rounded bg-red-700 text-white' >
                                                    &times;
                                                </div>
                                            </Popconfirm>


                                        </td>
                                    </tr>
                                ))
                            }

                        </tbody>
                    </table>
                </div>

                <div className='order-summary'>
                    <div className='content-order'>
                        <div className='name-order-summary border-b-2' >
                            <h1 className='text-xl mb-4'>Tóm tắt đơn hàng</h1>
                        </div>
                        <div className='flex justify-between mt-4 pb-4 border-b-2 mb-4'>
                            <span>Tạm tính:</span>
                            <span>{Number(totalMoney).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })} đ</span>
                        </div>
                        <div className='flex justify-between mt-4 pb-4 border-b-2 mb-4'>
                            <span>Tổng tiền</span>
                            <span>{Number(totalMoney).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })} đ</span>
                        </div>
                        <div className=''>
                            <button className='w-[302px] h-[48px] rounded-none bg-red-600 hover:bg-red-200 mb-3 text-white ' onClick={() => handleCheckout()}>TIẾN HÀNH ĐẶT HÀNG</button>
                            <button className='w-[302px] h-[48px] rounded-none bg-stone-200 hover:bg-red-200 ' onClick={() =>handleByMore()}>MUA THÊM SẢN PHẨM</button>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}

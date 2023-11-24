import React, { useEffect, useState } from 'react'
import "./CartOther.css"
export default function CartOther() {
    const idProductDetail = localStorage.getItem("idProductDetail")
    const [product,setProduct]= useState([])
    const userLogin = JSON.parse(localStorage.getItem("currentUser")) || {}
    const [cart, setCart] = useState(userLogin?.cart);
    useEffect(() => {
        localStorage.setItem(
          "currentUser",
          JSON.stringify({ ...userLogin, cart })
        );
      }, [cart]);
    useEffect(()=>{
        fetch(`http://localhost:7500/products/${idProductDetail}`)
        .then(res => res.json ())
        .then(data=>{
            setProduct(data)
            setCart(data)
            console.log("ssss",data);
        })
    },[])
    return (
        <div className='w-[1140px] m-auto ' >
            <div className='text-center mb-4'>
                <h1 className='font-bold text-3xl'>Giỏ hàng của bạn</h1>
                <sp>Có {userLogin?.cart?.length}sản phẩm trong giỏ hàng</sp>
            </div>
            <div className='container-cart'>
                <div>
                    <table class="table-auto" cellPadding={10} cellSpacing={10}>
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
                                <tr  className='text-center border-b-2'>
                                <td className='w-[86.77px] h-[115.15px] rounded'><img src={product.image}></img></td>
                                <td>
                                    <span>{product?.name}</span> <br></br>
                                    <span className='underline decoration-2 text-blue-500'>Xem lại</span>
                                </td>
                                <td>
                                    <button className=''>
                                        -
                                    </button>
                                    <span className='ml-4 mr-4'>{product.quantity}</span>
                                    <button className=''>
                                        +
                                    </button>
                                </td>
                                <td className=''>{product.price}</td>
                                <td >
                                    <div className='w-[25px] h-[25px] rounded bg-red-700'>
                                        x
                                    </div>
                                </td>
                            </tr>
                           
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
                            <span>21212 đ</span>
                        </div>
                        <div className='flex justify-between mt-4 pb-4 border-b-2 mb-4'>
                            <span>Tổng tiền</span>
                            <span>21212 đ</span>
                        </div>
                        <div className=''>
                            <button className='w-[302px] h-[48px] rounded-none bg-red-600 hover:bg-red-200 mb-3 text-white '>TIẾN HÀNH ĐẶT HÀNG</button>
                            <button className='w-[302px] h-[48px] rounded-none bg-stone-200 hover:bg-red-200 '>MUA THÊM SẢN PHẨM</button>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}

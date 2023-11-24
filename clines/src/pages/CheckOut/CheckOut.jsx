import React, { useEffect, useState } from 'react'
import "./CheckOut.css"
import axios from 'axios';
export default function CheckOut() {
    const [dataCity, setDataCity] = useState([]);
    const [dataDistrict, setDataDistrict] = useState([]);
    const [dataWard, setDataWard] = useState([]);
    const [city,setCity]=useState("")
    const [district,setDistrict]=useState("")
    const [ward,setWard]=useState("")
    


    useEffect(async () => {
        let data = await axios.get("https://provinces.open-api.vn/api/");
        setDataCity(data.data);
    }, [])
    const changeCity = async (e) => {
        let idCity = +(e.target.value);
        const nameCity = dataCity.find(item=>item.code==idCity)

        let data = await axios.get(`https://provinces.open-api.vn/api/p/${idCity}?depth=2`);
        setCity(nameCity.name)
        setDataDistrict(data.data.districts)
    }
    const changeDistrict = async (e) => {
        let idWard = +(e.target.value);
        const nameDistrict= dataDistrict.find(item=>item.code==idWard)
        console.log(idWard);
        let data = await axios.get(`https://provinces.open-api.vn/api/d/${idWard}?depth=2`);
        setDistrict(nameDistrict.name)
        setDataWard(data.data.wards);

    }
  console.log(city);
  console.log(district);
  console.log(ward);

    return (
        <div className='w-[1140px] m-auto mt-3 flex justify-between '>
            <div>
                <div>
                    <h1 className='text-2xl font-bold'>Thông tin giao hàng</h1>
                </div>
                <div className='info-delivery'>
                    <div className=''>
                        <label>Tên</label>
                        <input
                            placeholder='Họ và tên'
                        />
                    </div>
                    <div className='ml-1'>
                        <label>Điện Thoại</label>
                        <input

                            placeholder='Số điện thoại'
                        />
                    </div>

                </div>
                <div className='info-email'>
                    <label>Địa chỉ Email</label>
                    <input
                        placeholder='Địa chỉ Email'
                    />
                </div>
                <div className='info-address'>
                    <select onChange={changeCity}>
                        <option >chọn Tỉnh</option>
                        {dataCity.map((item,index) => (
                            <option key={index} value={item.code}>{item.name}</option>
                        ))}
                    </select>
                    <select onChange={changeDistrict} className='ml-3.5'>
                        <option>Quận/Huyện</option>
                        {dataDistrict.map((item,index) => (
                            <option key={index} value={item.code}>{item.name}</option>
                        ))}
                    </select>
                    <select onChange={(e)=>setWard(e.target.value)} className='ml-3'>
                        <option>Phường/Xã</option>
                        {dataWard.map((item,index)=>(
                             <option key={index}>{item.name}</option>
                        ))}
                    </select>

                </div>
                <div className='info-message'>
                    <label>Lời nhắn</label>
                    <textarea
                        placeholder='Ghi chú thêm (Ví dụ:Giao hàng giờ hành chính)'
                    />
                </div>
                <div >
                    <button className='w-[258px] h-[50px] rounded-none bg-black hover:bg-red-200 mb-3 text-white'>
                        ĐẶT HÀNG NGAY
                    </button>
                </div>
            </div>


            <div className='total-cart' >
                <div >
                    <div className='flex'>
                        <div className='w-[100px] h-[115.15px] rounded mr-3'>
                            <img src='../../../src/assets/img/anh_sale.webp'></img>
                        </div>
                        <div>
                            <span>Đầm đuôi cá trễ vai trắng phối tapta nơ - Hồng - S</span><br></br>
                            <san>1,497,000đ</san>
                            <div>
                                <span>Số lượng:</span>
                                <button className='ml-2 '>-</button>
                                <span className='ml-2'>3</span>
                                <button className='ml-2'>+</button>
                            </div>
                        </div>
                        <div>
                            <button>Xoá</button>
                            <button>Sửa</button>
                        </div>
                    </div>
                    <div className='flex justify-between'>
                        <h2 className='font-bold text-xl'>TỔNG CỘNG</h2>
                        <span className='text-red-500 font-bold text-xl'>1,497,000đ</span>
                    </div>
                </div>
            </div>

        </div>
    )
}

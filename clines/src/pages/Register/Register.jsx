import React, { useEffect, useState } from 'react'
import './Regiser.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import { notification } from "antd";
import api from "../../service/apis/api.users.js"

export default function Register() {
    // ****************************************
    const navigate = useNavigate();
    const [nameInput, setNameInput] = useState({
        userName: '',
        email: '',
        phone: "",
        password: '',
        confirmPassword: ''
    })


    const [errorInput, setErrorInput] = useState({
        errName: "",
        errEmail: "",
        errPass: "",
        errConfirm: ""
    })

    const [users, setUsers] = useState([]);
    // Lấy data từ json-server về
    const handleGetUsers = async () => {
        const response = await axios.get("http://localhost:7500/users");
        setUsers(response.data)
    }

    useEffect(() => {
        handleGetUsers();
    }, []);

    const handleChange = (e) => {
        setNameInput({ ...nameInput, [e.target.name]: e.target.value });
    };

    const handleRegister = async () => {
        const err = {
            errName: "",
            errEmail: "",
            errPass: "",
            errConfirm: ""
        }

        const regexName = /^.{4,}$/;
        const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        const regexPhone = /^(0|\+84)\d{9,10}$/;
        const regexPass = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;
        api.checkRegister(nameInput.email).then((res)=>{
            if (res.data.length!=0) {
 
                notification.error({
                    message: "email đã tồn tại",
                    style: {
                        top: 100,
                    },
                });
            }
        
        let check = true

        if (!regexName.test(nameInput.userName)) {
            err.errName = "Tên có 6 ký tự trở lên"
            check = false
        }

        if (!regexEmail.test(nameInput.email)) {
            err.errEmail = "Chưa đúng định dạng email"
            check = false
        } else {
            if (users.find((user) => user.email == nameInput.email)) {
                err.errEmail = "Email đã tồn tại"
                check = false
            }
        }

        if (!regexPhone.test(nameInput.phone)) {
            err.errPhone = "Chưa đúng định dạng Phone VN"
            check = false
        }
        
        if (!regexPass.test(nameInput.password)) {
            err.errPass = "Mật khẩu ít nhất 6 ký tự chứa cả chữ cái và số"
            check = false
        }

        if (!(nameInput.password == nameInput.confirmPassword)) {
            err.errConfirm = "Nhập lại mật khẩu cho đúng"
            check = false
        }
   
    
        if (!check) {
            setErrorInput(err)
            return
        } else {
            const {confirmPassword, ...data} = nameInput
            api.register({
                ...data,
                cart:[]
            })
            notification.success({
                message: "Đăng ký thành công",
                style: {
                    top: 100,
                },
            });
            // setErrorInput({
            //     errName: "",
            //     errEmail: "",
            //     errPass: "",
            //     errConfirm: ""
            // })
            navigate("/login");
            return
        }
         })
        // if (check) {
        //     notification.error({
        //         message: "Email đã được đăng ký",
        //         style: {
        //             top: 95,
        //         },
        //     });
        // } else {
        //     
        //     setNameInput({
        //         userName: '',
        //         email: '',
        //         password: '',
        //         confirmPassword: ''
        //     });
        //     
        // }
    }

    return (
        <div>
            <div className="formRegister">
                <h1 className='text-4xl font-bold' id="formTitle">Đăng ký</h1>
                <div className="inputRegister">
                    <form autoComplete="off">
                        <div className="input_scope">
                            <label htmlFor="username" /><br />
                            <input type="text" onChange={handleChange} name='userName' value={nameInput.userName} placeholder="Tên đăng nhập" required /><br />
                            <p id="userName-error" style={{ paddingLeft: 150, color: 'red' }}>{errorInput.errName}</p>
                        </div>
                        <div className="input_scope">
                            <label htmlFor="email" /><br />
                            <input type="email" onChange={handleChange} name='email' value={nameInput.email} placeholder="Email" required /><br />
                            <p id="email-error" style={{ paddingLeft: 150, color: 'red' }}>{errorInput.errEmail}</p>
                        </div>
                        <div className="input_scope">
                            <label htmlFor="phone" /><br />
                            <input type="text" onChange={handleChange} name='phone' id="phone" value={nameInput.phone} placeholder="Số điện thoại" required /><br />
                            <p id="phone-error" style={{ paddingLeft: 150, color: 'red' }}>{errorInput.errPhone}</p>
                        </div>
                        <div className="input_scope">
                            <label htmlFor="password" /><br />
                            <input type="password" onChange={handleChange} name='password' value={nameInput.password} placeholder="Mật khẩu" required /><br />
                            <p id="password-error" style={{ paddingLeft: 150, color: 'red' }}>{errorInput.errPass}</p>
                        </div>
                        <div className="input_scope">
                            <label htmlFor="confirmPassword" /><br />
                            <input type="password" onChange={handleChange} name='confirmPassword' value={nameInput.confirmPassword} placeholder="Nhập lại mật khẩu" required /><br />
                            <p id="confirm-password-error" style={{ paddingLeft: 150, color: 'red' }}>{errorInput.errConfirm}</p>
                        </div>
                        <button className='mt-4' type="button" onClick={handleRegister}>Đăng ký</button>
                    </form>
                </div>
            </div>

        </div>
    )
}

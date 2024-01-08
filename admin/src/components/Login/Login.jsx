import React from 'react'
import "./Login.css"
import {useNavigate} from "react-router-dom"
import { useState } from 'react'
import {message} from "antd"
function Login() {

    const navigate = useNavigate()
    const [user, setUser] = useState({
        userName: "",
        password: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
    }

    const handleLogin = () => {
        if (user.userName === "admin" && user.password === "admin") {
            navigate("admin")
        } else {
            message.error("Thon tin dang nhap khong dung")
        }
    }
    return (
        <div>
            <div className="formLogin">
                <h1 className='formTitle' id="formTitle" style={{padding: 0}}>Đăng nhập</h1>
                <div className="inputLogin">
                    <form>
                        <label htmlFor="username" /><br />
                        <input type="text" id="username" name='userName' onChange={handleChange} placeholder="Tên đăng nhập" required /><br />
                        <label htmlFor="password" /><br />
                        <input type="password" id="password" name='password' onChange={handleChange} placeholder="Mật khẩu" required /><br />
                        <button type="button" onClick={handleLogin} > Đăng nhập</button>
                        {/* <div className="login-register">
                            <p>Không có tài khoản?<Link to="/register" className="register-link underline decoration-2 text-blue-500">Đăng ký</Link></p>
                        </div> */}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
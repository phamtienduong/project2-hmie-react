import React, { useState } from 'react'
import './Login.css'
import { Link, useNavigate } from 'react-router-dom'
import { message, notification } from 'antd'
import apiUsers from '../../service/apis/api.users'
import { useDispatch } from 'react-redux'
import { action } from '../../action/action'
import bcrypt from "bcryptjs";
export default function Login({setIsLogin}) {
  const [nameInput, setNameInput] = useState({
    userName: "",
    password: ""
  })
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const handleChange = (e) => {
    const { name, value } = e.target
    setNameInput({ ...nameInput, [name]: value })
  }
  const handleLogin = (e) => {
    e.preventDefault()

    if (!nameInput.userName || !nameInput.password) {
      notification.error({
        message: "Thông tin không được để trống",
      });
      return;
    }

    apiUsers.checkLogin(nameInput.userName,nameInput.password)
      .then((res) => {
        if (res.status) {
          console.log(res);
          if(!res.user.active) {
            message.error("Tài khoản đã bị khoá")
            return
          }
          notification.success({
            message: "Đăng nhập thành công",
          });
          localStorage.setItem("currentUser", JSON.stringify(res.user))
          dispatch(action("setUserLogin"))
          setIsLogin(true)
          navigate("/");
        } else {
          notification.error({
            message: "Error",
          });
        }
      })
      .catch((error) => console.log(error));
  }


return (
  <div>
    <div className="formLogin">
      <h1 className='text-4xl font-bold' id="formTitle">Đăng nhập</h1>
      <div className="inputLogin">
        <form>
          <label htmlFor="username" /><br />
          <input type="text" id="username" name='userName' onChange={handleChange} placeholder="Tên đăng nhập" required /><br />
          <label htmlFor="password" /><br />
          <input type="password" id="password" name='password' onChange={handleChange} placeholder="Mật khẩu" required /><br />
          <button type="button" onClick={handleLogin} > Đăng nhập</button>
          <div className="login-register">
            <p>Không có tài khoản?<Link to="/register" className="register-link underline decoration-2 text-blue-500">Đăng ký</Link></p>
          </div>
        </form>
      </div>
    </div>
  </div>
)
}

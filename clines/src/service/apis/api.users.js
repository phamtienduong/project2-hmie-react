import axios from "axios"

export default {
    register : async(data)=>{
        return await axios.post(`${import.meta.env.VITE_HOST_NAME}users`,data)
    },
    
    checkRegister :async(email)=>{
        return await axios .get(`${import.meta.env.VITE_HOST_NAME}users?email=${email}`)
    },
    checkLogin:async(userName,password)=>{
        return await axios.get(`${import.meta.env.VITE_HOST_NAME}users?userName=${userName}&password=${password}`)
    }
}
import axios from "axios"
const urlAPI = 'http://localhost:8080/api/v1/login'

export default class GetUser {
    fetchUser(credentials) {
        axios.post(urlAPI, credentials).then(res=>{
            if (res.status == 200){
            sessionStorage.setItem('role', res.data.role)
            window.location.reload(true)
            }
        }).catch(res =>{
            if (res){
                alert('Email o contraseña incorrectos')
            }}
        )
    }
}


import axios from 'axios'
const baseUrl = 'http://localhost:8000/login'

export default class GetUser {
    fetchUser(credentials) {
        axios.post(baseUrl, credentials).then(res => {
            if (res.data.data.status) {
                  const token = 'Bearer ' + res.data.data.token
                  sessionStorage.setItem('token', token)
                  sessionStorage.setItem('user', credentials.username)
                  return true
            }
            else{
                alert(res.data.data.errors)
            }
        })
    }
}


import axios from "axios"
const urlAPI = 'http://localhost:8080/api/v1/login'
const urlAPIadd = 'http://localhost:8080/api/v1/registro'


  const getUser = async (credentials) => {
    try{
        const {data} = await axios.post(urlAPI, credentials)
        return data
    }
    catch{
      console.log('Error')
    }
  }

  const addUser = async (credentials) => {
    try{
        const {data} = await axios.post(urlAPIadd, credentials)
        return data
    }
    catch{
      console.log('Error')
    }
  }

export default {getUser, addUser}


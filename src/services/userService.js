import axios from "axios"
const urlAPI = 'https://back-tpids.herokuapp.com/api/v1/login'
const urlAPIadd = 'https://back-tpids.herokuapp.com/api/v1/registro'


  const getUser = async (credentials) => {
    try{
        const {data} = await axios.post(urlAPI, credentials)
        console.log(data)
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


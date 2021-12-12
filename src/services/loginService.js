import axios from "axios"
const urlAPI = 'http://localhost:8080/api/v1/login'


  const getUser = async (credentials) => {
        const {data} = await axios.post(urlAPI, credentials)
        return data
  }

export default getUser;


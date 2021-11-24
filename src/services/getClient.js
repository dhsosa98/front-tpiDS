import axios from "axios";
const baseURL = 'localhost:8080/api/v1/propietarios/'

export default class GetClient{
    getClientByID(clientID){
        axios.get(baseURL + clientID).then(
            res => {
                if (res.data.data.status){
                     console.log(res.data.data)
                }
                else{    
                    alert('El cliente con ese ID no existe')
                }
        })
    }
}
import axios from "axios";
const baseURL = 'localhost:8000/api/v1/registrarPropiedad'

export default class ServRegisterEstate {
    fetchEstate(estate){
        axios.post(baseURL, estate).then(
            res => {
                if (res.data.status){
                    return true
                }
                else
                    alert('Formulario no enviado')
            }
        )
    }
}
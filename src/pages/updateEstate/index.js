import React from 'react'
import axios from 'axios'
axios.defaults.headers.common.authorization = sessionStorage.getItem('token')
import { Container, Form } from 'react-bootstrap'
import { withRouter } from 'react-router'
import NavBar from '../components/NavBar'
import ModalWindow from '../components/ModalWindow'
import FormItemClient from '../components/FormItemClient'
import FormItemEstate from '../components/FormItemEstate'
import FormItemLocation from '../components/FormItemLocation'
import FormItemFooter from '../components/FormItemFooter'

class UpdateEstate extends React.Component {
    constructor(props){
        super(props)
        this.state={
                param: location.pathname.split("/estates/")[1],
                isShow:  false,
                isConfirm: false,
                search: true,
                dataClient: {
                    idPropietario : '',
                    dni: '',
                    nombres: '',
                    apellidos: '',
                    email: '',
                    telefono: ''
                },
                dataEstate: {
                    tipo: 'Alquiler',
                    amueblado: 'SI',
                    medida1: '',
                    medida2: '',
                    monto: '',
                    antiguedad: '',
                    artefactos: '',
                    servicios: '',
                },
               dataLocation: {
                    pais: '',
                    provincia: '',
                    ciudad: '',
                    barrio: '',
                    direccion: '',
                    numero: '',
                    piso: '',
                    dpto: ''
               },  
        }
        this.modalText = ''
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmitForm = this.handleSubmitForm.bind(this)
        this.handleSearchClient = this.handleSearchClient.bind(this)
        this.handleCloseModal = this.handleCloseModal.bind(this)
        this.handleConfirmModal = this.handleConfirmModal.bind(this)
    }
        async componentDidMount(){
            try{
                const urlApiPropiedades='http://localhost:8080/api/v1/'
                const urlApiUbicacion='http://localhost:8080/api/v1/ubicacion/'
                const urlApiPropietario='http://localhost:8080/api/v1/propietarios/'
                var {data: propiedad}  = await axios.get(urlApiPropiedades+this.state.param)
                var {data: ubicacion} = await axios.get(urlApiUbicacion+propiedad.ubicacion)
                var {data: propietario} = await axios.get(urlApiPropietario+propiedad.propietario)  
                propiedad["medida1"] = propiedad.medidas.split("x")[0]
                propiedad["medida2"] = propiedad.medidas.split("x")[1]
                delete propiedad["medidas"]
                delete propiedad["ubicacion"]
                delete propiedad["propietario"]
                delete propiedad["idPropiedad"]
                delete ubicacion["ubic"]
                {!ubicacion["barrio"] && (ubicacion["barrio"] = '')}
                {!ubicacion["piso"] && (ubicacion["piso"] = '')}
                {!ubicacion["dpto"] && (ubicacion["dpto"] = '')}
                this.setState({dataClient: propietario})
                this.setState({dataEstate: propiedad})
                this.setState({dataLocation: ubicacion})  
                }
                catch{
                    console.log('Error')
                }            
        }

        handleChange(e){
            let [containerName, name] = e.target.name.split('-')
            let data = this.state[containerName]
            data[name]=  e.target.value
            this.setState( {[data]: data} )
        }
    
        handleSubmitForm(e) {
            e.preventDefault()
            const baseURLLocation = `http://localhost:8080/api/v1/ubicacion/${this.state.param}`
            const baseURLEstate = `http://localhost:8080/api/v1/${this.state.param}`
            const dataUbicacion = {...this.state.dataLocation}
            let estate = {...this.state.dataEstate}
            {(!dataUbicacion.piso) && delete dataUbicacion["piso"]}
            {(!dataUbicacion.barrio) && delete dataUbicacion["barrio"]}
            {(!dataUbicacion.dpto) && delete dataUbicacion["dpto"]}
            axios.put(baseURLLocation, dataUbicacion).then(
                res => {
                    console.log(res)
                    estate["ubicacion"] = res.data.ubic
                    estate["medidas"] = `${estate.medida1}x${estate.medida2}`
                    estate["propietario"] = this.state.dataClient.idPropietario
                    delete estate["medida1"]
                    delete estate["medida2"]
                    axios.put(baseURLEstate, estate).then(
                        res => {
                            console.log(res)
                            this.modalText = "Formulario enviado exitosamente"
                            this.setState({isShow: true})
                        }
                    )
                }
            ).catch(
                res => {
                    if (res){
                        this.modalText = "No se pudo cargar la propiedad. Ya existe una propiedad en esa ubicacion"
                        this.setState({isShow: true})
                    }
                }
            )
        }
        
        handleSearchClient(e) {
            e.preventDefault()
            const clientID = this.state.dataClient.idPropietario
            const baseURL = 'http://localhost:8080/api/v1/propietarios/'
            axios.get(baseURL + clientID).then(
                res => {
                    if (res.status = 204){
                        const {data} = res
                        const search = this.state.search
                        this.setState({dataClient: data})                                 
                        if (!this.state.search){
                            this.setState({search: !search})
                        }
                    }
                    else{
                        console.log(res)
                        }
                    }  
                    ).catch(res=>{
                        if (!res.status){
                            this.modalText = "No existe propietario con ese ID"
                            this.setState({isShow: true})}})      
        }
    
    handleCloseModal(){
        this.setState({isShow: false})
        this.setState({isConfirm: false})
    }
    
    handleConfirmModal(){
        this.setState({isConfirm: true})
        this.setState({isShow: false})
    }

    render(){
        return (
        <div className='color-bc d-flex flex-row min-vh-100 ' >
            <ModalWindow isShow={this.state.isShow} onHide={this.handleCloseModal} onConfirm={this.handleConfirmModal} type="success" >
                {this.modalText}
            </ModalWindow>
            <NavBar className='min-vh-100' setToken={this.props.setToken} />
            <Container>
                <Container className='my-5'>
                    <h1>Modificar propiedad</h1>
                </Container>
                <Container>
                    <Form onSubmit={this.handleSubmitForm}>
                        <FormItemClient dataClient={this.state.dataClient} onChange={this.handleChange} onSearch={this.handleSearchClient} search={this.state.search}/>
                        <FormItemEstate dataEstate={this.state.dataEstate} onChange={this.handleChange} />
                        <FormItemLocation dataLocation={this.state.dataLocation} onChange={this.handleChange} />
                        <FormItemFooter dataClient={this.state.dataClient} dataEstate={this.state.dataEstate} 
                        dataLocation={this.state.dataLocation} type='primary'>Modificar</FormItemFooter>
                    </Form>
                </Container>
            </Container>
        </div>
        )
    }
}

export default withRouter(UpdateEstate)
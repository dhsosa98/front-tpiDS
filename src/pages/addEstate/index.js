import axios from 'axios'
axios.defaults.headers.common.authorization = sessionStorage.getItem('token')
import React from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { withRouter } from 'react-router'
import NavBar from '../components/NavBar'
import ModalWindow from '../components/ModalWindow'
import FormItemClient from '../components/FormItemClient'
import FormItemEstate from '../components/FormItemEstate'
import FormItemLocation from '../components/FormItemLocation'
import FormItemFooter from '../components/FormItemFooter'

class AddEstate extends React.Component{
    constructor(props){
        super(props)
        this.state = {
                isShow:  false,
                isConfirm: false,
                search: false,
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

    componentDidMount(){
        const clientID = location.search.split("?idClient=")[1]
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
                    )    
    }
    
        handleChange(e){
            let [containerName, name] = e.target.name.split('-')
            let data = this.state[containerName]
            data[name]=  e.target.value
            this.setState( {[data]: data} )
        }
    
        handleSubmitForm(e) {
            e.preventDefault()
            const baseURLLocation = 'http://localhost:8080/api/v1/registrarUbicacion'
            const baseURLEstate = 'http://localhost:8080/api/v1/registrarPropiedad'
            const dataUbicacion = {...this.state.dataLocation}
            let estate = {...this.state.dataEstate}
            {(!dataUbicacion.piso) && delete dataUbicacion["piso"]}
            {(!dataUbicacion.barrio) && delete dataUbicacion["barrio"]}
            {(!dataUbicacion.dpto) && delete dataUbicacion["dpto"]}
            axios.post(baseURLLocation, dataUbicacion).then(
                res => {
                    console.log(res)
                    estate["ubicacion"] = res.data.ubic
                    estate["medidas"] = `${estate.medida1}x${estate.medida2}`
                    estate["propietario"] = this.state.dataClient.idPropietario
                    delete estate["medida1"]
                    delete estate["medida2"]
                    axios.post(baseURLEstate, estate).then(
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
            <ModalWindow isShow={this.state.isShow} onHide={this.handleCloseModal} onConfirm={this.handleConfirmModal} type="success">
                    {this.modalText}
            </ModalWindow>
            <NavBar className='min-vh-100' setToken={this.props.setToken} />
            <Container>
                <Container className='my-5'>
                    <h1>Agregar propiedad</h1>
                </Container>
                <Container>
                    <Form onSubmit={this.handleSubmitForm}>
                        <FormItemClient dataClient={this.state.dataClient} onChange={this.handleChange} onSearch={this.handleSearchClient} search={this.state.search}/>
                        <FormItemEstate dataEstate={this.state.dataEstate} onChange={this.handleChange} />
                        <FormItemLocation dataLocation={this.state.dataLocation} onChange={this.handleChange} />
                        <FormItemFooter dataClient={this.state.dataClient} dataEstate={this.state.dataEstate} 
                        dataLocation={this.state.dataLocation} type='success'>Enviar</FormItemFooter>
                    </Form>
                </Container>
            </Container>
        </div>
        )
    }
}

export default withRouter(AddEstate);
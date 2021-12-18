import axios from 'axios'
import React from 'react'
import { Container, Form } from 'react-bootstrap'
import { withRouter } from 'react-router'
import NavBar from '../components/NavBar'
import ModalWindow from '../components/ModalWindow'
import Loader from '../components/Loader'
import FormItemClient from '../components/FormItemClient'
import FormItemEstate from '../components/FormItemEstate'
import FormItemLocation from '../components/FormItemLocation'
import FormItemFooter from '../components/FormItemFooter'

class AddEstate extends React.Component{
    constructor(props){
        super(props)
        this.state = {
                isSend: false,
                isShow:  false,
                isConfirm: false,
                search: false,
                loading: true,
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
        const baseURL = 'https://back-tpids.herokuapp.com/api/v1/propietarios/'
        const config = {headers: {authorization: sessionStorage.getItem('token')}}
            axios.get(baseURL + clientID, config).then(
                res => {
                    if (res.status = 204){
                        const {data} = res
                        const search = this.state.search
                        this.setState({dataClient: data, loading: false})
                        if (!this.state.search){
                        this.setState({search: !search})
                            }
                        }
                    }  
                    ).catch(e=>{
                        console.log(e.message.includes(404))
                        {e.message.includes(403) && (this.modalText="Sesion vencida, vuelva a loguearse")}
                        {e.message.includes(404) && (this.modalText="Error, la propiedad no existe")}
                        this.setState({loading: false})
                        this.setState({isShow: true} )}

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
            this.setState({loading: true})
            const baseURLLocation = 'https://back-tpids.herokuapp.com/api/v1/registrarUbicacion'
            const baseURLEstate = 'https://back-tpids.herokuapp.com/api/v1/registrarPropiedad'
            const dataUbicacion = {...this.state.dataLocation}
            const config = {headers: {authorization: sessionStorage.getItem('token')}}
            let estate = {...this.state.dataEstate}
            {(!dataUbicacion.piso) && delete dataUbicacion["piso"]}
            {(!dataUbicacion.barrio) && delete dataUbicacion["barrio"]}
            {(!dataUbicacion.dpto) && delete dataUbicacion["dpto"]}
            axios.post(baseURLLocation, dataUbicacion, config).then(
                res => {
                    estate["ubicacion"] = res.data.ubic
                    estate["medidas"] = `${estate.medida1}x${estate.medida2}`
                    estate["propietario"] = this.state.dataClient.idPropietario
                    delete estate["medida1"]
                    delete estate["medida2"]
                    axios.post(baseURLEstate, estate, config).then(
                        res => {
                            this.setState({loading: false})
                            this.modalText = "Propiedad cargada exitosamente"
                            this.setState({isShow: true})
                        }
                    ).catch(
                        res => {
                            if (res){
                                this.setState({loading: false})
                                this.modalText = "No se pudo cargar la propiedad. Error en algún campo ingresado"
                                this.setState({isShow: true})
                            }
                        }
                    )
                }
            ).catch(
                res => {
                    if (res){
                        this.setState({loading: false})
                        this.modalText = "No se pudo cargar la propiedad. Ya existe una propiedad en esa ubicacion"
                        this.setState({isShow: true})
                    }
                }
            )
        }
        
        handleSearchClient(e) {
            e.preventDefault()
            this.setState({loading: true})
            const clientID = this.state.dataClient.idPropietario
            const baseURL = 'https://back-tpids.herokuapp.com/api/v1/propietarios/'
            const config = {headers: {authorization: sessionStorage.getItem('token')}}
            axios.get(baseURL + clientID, config).then(
                res => {
                    if (res.status = 204){
                        const {data} = res
                        const search = this.state.search
                        this.setState({dataClient: data, loading: false})                                 
                        if (!this.state.search){
                            this.setState({search: !search})
                        }
                    }
                    }  
                    ).catch(res=>{
                        if (!res.status){
                            this.setState({loading: false})
                            this.modalText = "No existe propietario con ese ID"
                            this.setState({isShow: true})}})      
        }
    
    handleCloseModal(){
        this.setState({isShow: false})
        this.setState({isConfirm: false})
        {this.state.isSend && window.location.reload(true)}
    }
    
    handleConfirmModal(){
        this.setState({isConfirm: true})
        this.setState({isShow: false})
        {this.state.isSend && window.location.reload(true)}
    }

    render(){
        return (
        <div className='color-bc d-flex flex-row flex-wrap' >
            <Loader loading={this.state.loading} />
            <ModalWindow isShow={this.state.isShow} onHide={this.handleCloseModal} onConfirm={this.handleConfirmModal} type="success">
                    {this.modalText}
            </ModalWindow>
            <NavBar />
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
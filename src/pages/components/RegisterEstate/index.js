import axios from 'axios'
import React from 'react'
import {Alert, Button, FormControl, FormGroup, FormLabel, InputGroup, Modal} from 'react-bootstrap'
import NavBar from '../NavBar'
import { Container, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default class RegisterEstate extends React.Component{
    constructor(props){
        super(props)
        this.state = {
                search: [],
                idClient : [],
                dataClient: {
                    dni: [],
                    nombres: [],
                    apellidos: [],
                    email: [],
                    telefono: []
                },
                tipo: 'Alquiler',
                medida1: [],
                medida2: [],
                monto: [],
                antiguedad: [],
                amueblado: 'SI',
                artefactos: [],
                servicios: [],
                pais: [],
                provincia: [],
                ciudad: [],
                barrio: [],
                direccion: [],
                numero: [],
                piso: [],
                dpto: []
        }
        this.isDisabled = true
        this.isSearch = false
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmitForm = this.handleSubmitForm.bind(this)
        this.handleSearchClient = this.handleSearchClient.bind(this)
    }
    
        handleChange(e){
            this.setState( {[e.target.name]: e.target.value} )
        }
    
        handleSubmitForm(e) {
            e.preventDefault()
            const baseURLUbication = 'http://localhost:8080/api/v1/registrarUbicacion'
            const baseURLEstate = 'http://localhost:8080/api/v1/registrarPropiedad'
            const dataUbicacion = {
                pais: this.state.pais,
                provincia: this.state.provincia,
                ciudad: this.state.ciudad,
                barrio: this.state.barrio,
                direccion: this.state.direccion,
                numero: this.state.numero,
                piso: this.state.piso, 
                dpto: this.state.dpto
            }
            if (!dataUbicacion.piso.length) {
                delete dataUbicacion["piso"]
            }
            if (!dataUbicacion.barrio.length) {
                delete dataUbicacion["barrio"]
            }
            if (!dataUbicacion.dpto.length) {
                delete dataUbicacion["dpto"]
            }
            console.log(dataUbicacion)
            alert('Desea Confirmar los cambios')
            axios.post(baseURLUbication, dataUbicacion).then(
                res => {
                    console.log(res)
                    const estate = {
                        tipo: this.state.tipo,
                        medidas: this.state.medida1+'x'+this.state.medida2,
                        monto: this.state.monto,
                        antiguedad: this.state.antiguedad,
                        amueblado: this.state.amueblado,
                        artefactos: this.state.artefactos,
                        servicios: this.state.servicios,
                        ubicacion: res.data.ubic,
                        propietario: this.state.idClient
                    }
                    console.log(estate)
                    axios.post(baseURLEstate, estate).then(
                        res => {
                            console.log(res)
                            alert('Propiedad cargada con exito')
                            window.location.reload(true);
                        }
                    )
                }
            )
            
        }
        
        handleSearchClient(e) {
            e.preventDefault()
            const clientID = this.state.idClient
            console.log(this.state.idClient)
            const baseURL = 'http://localhost:8080/api/v1/propietarios/'
            axios.get(baseURL + clientID).then(
                res => {
                    if (res.status = 204){
                        console.log(res.status)
                        this.setState(prevState => {
                            let dataClient = Object.assign({}, prevState.dataClient);  
                            dataClient.dni = res.data.dni; 
                            dataClient.nombres = res.data.nombres 
                            dataClient.apellidos = res.data.apellidos
                            dataClient.email = res.data.email   
                            dataClient.telefono = res.data.telefono                                   
                            return { dataClient };                                 
                          })
                        const search = this.state.search
                        if (!this.state.search){
                        this.setState({search: !search})
                        }
                        }
                    else{
                        console.log(res)
                        alert('No existe el propietario con ese id')
                        }
                    }  
                    ).catch(res=>{
                        if (!res.status){alert('No existe el propietario con ese id')}})      
        }
        
    
        

    render(){
        return (
        <div className='color-bc d-flex flex-row min-vh-100 ' >
            <NavBar className='min-vh-100'></NavBar>
            <Container>
                <Container className='my-5'>
                    <h1>Agregar propiedad</h1>
                </Container>
                <Container>
                    <Form onSubmit={this.handleSubmitForm}>
                        <Container className='mb-3'>
                        <h2 className='mb-3'>Datos Propietario</h2>
                            <FormGroup className='d-flex justify-content-center' >
                                    <FormGroup className='w-75 mx-5' >
                                    <FormLabel >Buscar por id Cliente</FormLabel>
                                    <FormGroup className='w-100' >
                                        <InputGroup>
                                            <FormControl value={this.state.idClient} name='idClient' type='number' className='shadow-none' style={{backgroundColor: 'transparent', outline: 'none', border: 'none', borderBottom: 'solid 1px gray'}} onChange={this.handleChange}/>
                                            {(!this.state.idClient.length) ? (<Button onClick={this.handleSearchClient} type='search' disabled={true}>Buscar</Button>) : <Button onClick={this.handleSearchClient} type='search' disabled={false}>Buscar</Button>}
                                        </InputGroup>
                                    </FormGroup>
                                    </FormGroup>
                                    {this.state.search && 
                                    (
                                    <>
                                    <FormGroup className='w-100 mx-5'>
                                    <FormLabel>DNI</FormLabel>
                                        <FormControl value={this.state.dataClient.dni} name='DNI' type='number' onChange={this.handleChange} disabled={true}/>
                                        <FormLabel>Nombres</FormLabel>
                                        <FormControl value={this.state.dataClient.nombres} name='nombres' onChange={this.handleChange} disabled={true}/> 
                                        <FormLabel>Apellidos</FormLabel>
                                        <FormControl value={this.state.dataClient.apellidos} name='apellidos' onChange={this.handleChange} disabled={true}/> 
                                        </FormGroup>
                                        <FormGroup className='w-100 mx-5'>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl value={this.state.dataClient.email}  name='email' type='email' onChange={this.handleChange} disabled={true}/>
                                        <FormLabel>Teléfono</FormLabel>
                                        <FormControl value={this.state.dataClient.telefono}  name='telefono' type='number' onChange={this.handleChange} disabled={true}/>
                                    </FormGroup>
                                    </>
                                )}
                            </FormGroup>   
                        </Container>
                        <Container className='mb-3'>
                        <h2 className='mb-3'>Datos Propiedad</h2>
                            <FormGroup className='d-flex'>
                                <FormGroup className='w-100 mx-5'>
                                    <FormLabel>Imagen</FormLabel>
                                    <FormControl type='file' accept="image/png, image/gif, image/jpeg" />
                                    <FormLabel>Medidas - Obligatorio</FormLabel>
                                    <InputGroup>
                                        <FormControl type='number' value={this.state.medida1} name='medida1' onChange={this.handleChange} />
                                        <InputGroup.Text>X</InputGroup.Text>
                                        <FormControl type='number' value={this.state.medida2} name='medida2' onChange={this.handleChange} />
                                        <InputGroup.Text>m2</InputGroup.Text>
                                    </InputGroup>
                                    <FormLabel>Antiguedad - Obligatorio</FormLabel>
                                    <InputGroup>
                                    <FormControl value={this.state.antiguedad} name='antiguedad' type='number' onChange={this.handleChange} />
                                    <InputGroup.Text>años</InputGroup.Text>
                                    </InputGroup>
                                    <FormLabel>Precio - Obligatorio</FormLabel>
                                    <InputGroup>
                                        <InputGroup.Text>$</InputGroup.Text>
                                        <FormControl value={this.state.monto} name='monto' type='number' onChange={this.handleChange} />
                                    </InputGroup>
                                    
                                </FormGroup>
                                <FormGroup className='w-100 mx-5'>
                                    <FormLabel>Tipo - Obligatorio</FormLabel>
                                    <Form.Select name='tipo' defaultValue={this.state.amueblado} className='w-25' aria-label="Floating label select example" onChange={this.handleChange}>
                                        <option value="Alquiler">Alquiler</option>
                                        <option value="Venta">Venta</option>
                                    </Form.Select>
                                    <FormLabel >Amueblado - Obligatorio</FormLabel>
                                    <Form.Select defaultValue={this.state.amueblado} name='amueblado' className='w-25' aria-label="Floating label select example" onChange={this.handleChange}>
                                        <option  value="SI">SI</option>
                                        <option value="NO">NO</option>
                                    </Form.Select>
                                    <FormLabel>Artefactos - Obligatorio</FormLabel>
                                    <FormControl value={this.state.artefactos} name='artefactos' onChange={this.handleChange} />
                                    <FormLabel  >Servicios - Obligatorio</FormLabel>
                                    <FormControl value={this.state.servicios} name='servicios' onChange={this.handleChange} />    
                                </FormGroup>
                            </FormGroup>
                        </Container>
                        <Container className='mb-3'>
                        <h2 className='mb-3'>Ubicacion</h2>
                        <FormGroup className='d-flex'>
                                <FormGroup className='w-100 mx-5'>
                                    <FormLabel>Pais - Obligatorio</FormLabel>
                                    <FormControl value={this.state.pais} name='pais' onChange={this.handleChange} />
                                    <FormLabel>Provincia - Obligatorio</FormLabel>
                                    <FormControl value={this.state.provincia} name='provincia' onChange={this.handleChange}  />
                                    <FormLabel>Ciudad - Obligatorio</FormLabel>
                                    <FormControl value={this.state.ciudad} name='ciudad' onChange={this.handleChange} />
                                    <FormLabel  >Barrio</FormLabel>
                                    <FormControl value={this.state.barrio} name='barrio' onChange={this.handleChange} />
                                </FormGroup>
                                <FormGroup className='w-100 mx-5'>
                                    <FormLabel  >Calle - Obligatorio</FormLabel>
                                    <FormControl value={this.state.direccion} name='direccion' onChange={this.handleChange}/>
                                    <FormLabel  >Numero - Obligatorio</FormLabel>
                                    <FormControl value={this.state.numero} name='numero' type='number' onChange={this.handleChange} />
                                    <FormLabel  >Piso</FormLabel>
                                    <FormControl value={this.state.piso} name='piso' type='number' onChange={this.handleChange} />
                                    <FormLabel  >Depto</FormLabel>
                                    <FormControl value={this.state.dpto} name='dpto' onChange={this.handleChange}  />
                                </FormGroup>
                        </FormGroup>
                        </Container>
                        <Container className='text-center my-5'>
                            {
            (!!this.state.dataClient.dni.length &&
            !!this.state.pais.length &&
            !!this.state.provincia.length &&
            !!this.state.ciudad.length &&
            !!this.state.direccion.length &&
            !!this.state.numero.length &&
            !!this.state.antiguedad.length &&
            !!this.state.servicios.length &&
            !!this.state.artefactos.length &&
            !!this.state.medida1.length &&
            !!this.state.medida2.length) 
            ? (<Button className='w-25 m-5' variant="success" type='submit' disabled={false}>Enviar</Button>) 
            : (<Button className='w-25 m-5' variant="success" type='submit' disabled={true}>Enviar</Button>)}
                            <Link to='/estates'><Button className='w-25 m-5' variant="secondary">Volver</Button></Link>
                        </Container>
                    </Form>
                </Container>
            </Container>
        </div>
        )
    }
}
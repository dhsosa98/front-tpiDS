import React from 'react'
import {Button, FormControl, FormGroup, FormLabel, InputGroup} from 'react-bootstrap'
import { Container, Form } from 'react-bootstrap'
import GetClient from '../../../services/getClient'
import ServRegisterEstate from '../../../services/registerEstateService'

export default class RegisterEstate extends React.Component{
    constructor(props){
        super(props)
        this.state = {
                success: false,
                idClient : [],
                dataClient: {
                    dni: [],
                    nombres: [],
                    apellidos: [],
                    email: [],
                    telefono: []
                },
                tipo: 'Alquiler',
                medidas: [],
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
        this.serviceRegisterEstate = new ServRegisterEstate()
        this.GetClient = new GetClient()
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmitForm = this.handleSubmitForm.bind(this)
        this.handleSearchClient = this.handleSearchClient.bind(this)
    }
    
        handleChange(e){
            this.setState( {[e.target.name]: e.target.value} )
        }
    
        handleSubmitForm(e) {
            e.preventDefault()
            dataUbicacion = {
                pais: this.state.pais,
                provincia: this.state.provincia,
                ciudad: this.state.ciudad,
                barrio: this.state.barrio,
                direccion: this.state.direccion,
                numero: this.state.numero,
                piso: this.state.piso,
                dpto: this.state.dpto
            }
            estate = {
                tipo: this.state.tipo,
                medidas: this.state.medidas[0]+this.state.medidas[1],
                monto: this.state.monto,
                antiguedad: this.state.antiguedad,
                amueblado: this.state.amueblado,
                artefactos: this.state.artefactos,
                servicios: this.state.servicios,
                ubicacion: dataUbicacion,
                propietario: this.state.dataClient
            }
            this.serviceRegisterEstate.fetchEstate(estate)
        }
        
        handleSearchClient(e) {
            e.preventDefault()
            const clientID = this.state.idClient
            console.log(this.state.idClient)
            const data = this.GetClient.getClientByID(clientID)
            if (data){
                console.log(data)
                this.setState(prevState => {
                    let dataClient = Object.assign({}, prevState.dataClient);  
                    dataClient.dni = data.dni; 
                    dataClient.nombres = data.nombres 
                    dataClient.apellidos = data.apellidos
                    dataClient.email = data.email   
                    dataClient.telefono = data.telefono                                   
                    return { dataClient };                                 
                  })
            }
            else{
                this.setState(prevState => {
                    let dataClient = Object.assign({}, prevState.dataClient);  // creating copy of state variable jasper
                    dataClient.dni = 952222; 
                    dataClient.nombres = 'Juan Ignacio'                    // update the name property, assign a new value                 
                    return { dataClient };                                 // return new object jasper object
                  })
                console.log('hola')
                const success = this.state.success
                this.setState({success: !success}) 
                }
            console.log(this.state.dataClient)
        }

    render(){
        return (
            <Container>
                <Container className='my-3'>
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
                                        <Button onClick={this.handleSearchClient} type='search' >Buscar</Button>
                                    </InputGroup>
                                    </FormGroup>
                                    </FormGroup>
                                    {this.state.success && 
                                    (
                                    <>
                                    <FormGroup className='w-100 mx-5'>
                                    <FormLabel>DNI</FormLabel>
                                    <FormControl value={this.state.dataClient.dni} name='DNI' type='number' placeholder='Ej. 11111111'onChange={this.handleChange} disabled={true}/>
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
                                    <FormLabel>Medidas</FormLabel>
                                    <InputGroup>
                                        <FormControl value={this.state.medidas[0]} name='medida1' onChange={this.handleChange} />
                                        <InputGroup.Text>X</InputGroup.Text>
                                        <FormControl value={this.state.medidas[1]} name='medida2' onChange={this.handleChange} />
                                        <InputGroup.Text>m2</InputGroup.Text>
                                    </InputGroup>
                                    <FormLabel>Antiguedad</FormLabel>
                                    <InputGroup>
                                    <FormControl value={this.state.antiguedad} name='antiguedad' type='number' onChange={this.handleChange} />
                                    <InputGroup.Text>años</InputGroup.Text>
                                    </InputGroup>
                                    <FormLabel>Precio</FormLabel>
                                    <InputGroup>
                                        <InputGroup.Text>$</InputGroup.Text>
                                        <FormControl value={this.state.monto} name='monto' type='number' onChange={this.handleChange} />
                                    </InputGroup>
                                    
                                </FormGroup>
                                <FormGroup className='w-100 mx-5'>
                                    <FormLabel>Tipo</FormLabel>
                                    <Form.Select name='tipo' defaultValue={this.state.amueblado} className='w-25' aria-label="Floating label select example" onChange={this.handleChange}>
                                        <option value="1">Alquiler</option>
                                        <option value="2">Venta</option>
                                    </Form.Select>
                                    <FormLabel >Amueblado</FormLabel>
                                    <Form.Select defaultValue={this.state.amueblado} name='amueblado' className='w-25' aria-label="Floating label select example" onChange={this.handleChange}>
                                        <option  value="1">SI</option>
                                        <option value="2">NO</option>
                                    </Form.Select>
                                    <FormLabel>Artefactos</FormLabel>
                                    <FormControl value={this.state.artefactos} name='artefactos' onChange={this.handleChange} />
                                    <FormLabel name='servicios' >Servicios</FormLabel>
                                    <FormControl />    
                                </FormGroup>
                            </FormGroup>
                        </Container>
                        <Container className='mb-3'>
                        <h2 className='mb-3'>Ubicacion</h2>
                        <FormGroup className='d-flex'>
                                <FormGroup className='w-100 mx-5'>
                                    <FormLabel>Pais</FormLabel>
                                    <FormControl value={this.state.pais} name='pais' onChange={this.handleChange} />
                                    <FormLabel>Provincia</FormLabel>
                                    <FormControl value={this.state.provincia} name='provincia' onChange={this.handleChange}  />
                                    <FormLabel>Ciudad</FormLabel>
                                    <FormControl value={this.state.ciudad} name='ciudad' onChange={this.handleChange} />
                                    <FormLabel  >Barrio</FormLabel>
                                    <FormControl value={this.state.barrio} name='barrio' onChange={this.handleChange} />
                                </FormGroup>
                                <FormGroup className='w-100 mx-5'>
                                    <FormLabel  >Calle</FormLabel>
                                    <FormControl value={this.state.direccion} name='direccion' onChange={this.handleChange}/>
                                    <FormLabel  >Numero</FormLabel>
                                    <FormControl value={this.state.numero} name='numero' type='number' onChange={this.handleChange} />
                                    <FormLabel  >Piso</FormLabel>
                                    <FormControl value={this.state.piso} name='piso' type='number' onChange={this.handleChange} />
                                    <FormLabel  >Depto</FormLabel>
                                    <FormControl value={this.state.dpto} name='dpto' onChange={this.handleChange}  />
                                </FormGroup>
                        </FormGroup>
                        </Container>
                        <Container className='text-center my-5'>
                            <Button className='w-25' variant="success" type='submit'>Enviar</Button>
                        </Container>
                    </Form>
                </Container>
            </Container>
        )
    }
}
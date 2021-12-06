import axios from 'axios'
import React from 'react'
import { Container, Button, Table, Card, Accordion } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import NavBar from '../components/NavBar'
import Img from '../../../public/cliente.png'
import './styles.css'

export default class Estates extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            propiedades: [],
            p: []
        }
        this.handleDelete = this.handleDelete.bind(this)
    }

   async componentDidMount(){
        try{
        const urlApiPropiedades='http://localhost:8080/api/v1/propiedades'
        const urlApiUbicacion='http://localhost:8080/api/v1/ubicacion/'
        const urlApiPropietario='http://localhost:8080/api/v1/propietarios/'
        let aux = []
        let p = []
        var propiedades  = await axios.get(urlApiPropiedades)
        for (const propiedad of propiedades.data){
            var ubicacion = await axios.get(urlApiUbicacion+propiedad.ubicacion)
            var propietario = await axios.get(urlApiPropietario+propiedad.propietario)
            propiedad.ubicacion = ubicacion.data
            propiedad.propietario = propietario.data
        };
        propiedades = propiedades.data.sort(
            (a,b) => (a.propietario.nombres > b.propietario.nombres) ? 1 : ((b.propietario.nombres > a.propietario.nombres) ? -1 : 0)
            )
        var idPropietario = propiedades[0].propietario.idPropiedario
        for (const propiedad of propiedades){
            if (idPropietario != propiedad.propietario.idPropiedario){
                idPropietario = propiedad.propietario.idPropiedario
                p.push(aux)
                aux = []
            }
            aux.push(propiedad)
        }
        p.push(aux)
        this.setState({propiedades: propiedades})
        this.setState({p: p})
        }
        catch{
            console.log('No hay propiedades en la BD')
        }              
   }

    handleDelete(e, id, propiedades, index){
        const urlApiPropiedadesDelete = 'http://localhost:8080/api/v1/'
        const p = propiedades?.filter(propiedad => {return propiedad.idPropiedad != id})
        let aux = this.state.p
        const cont = index
        e.preventDefault()
        aux[cont] = p
        axios.delete(urlApiPropiedadesDelete + id).then(res=>{
        this.setState({p: aux
        })}
        ).catch(res => {
            if (res){
                console.log('No hay propiedad con ese id')
            }}
        )}

    render (){
        return (
            <div className='color-bc d-flex flex-row min-vh-100 ' >
                <NavBar className='min-vh-100'></NavBar>
                {this.state.p && <Container className='d-flex align-items-center justify-content-center flex-column'>
                    <h1>Listado Propiedades</h1>
                    <Card className='mt-5 p-2 w-100'>
                    {this.state.p?.map((propiedades, index) =>(
                    <>
                    {propiedades[0] &&
                    (<Accordion>
                    <Accordion.Item eventKey={0} flush='true'>
                    <Table style={{color: 'white', background: '#333', marginBottom: '-0.01em'}} className='text-center mt-5' key={propiedades[0].propietario.idPropiedario} id={propiedades[0].propietario.idPropiedario}>
                    
                        <thead>
                            <tr>
                                <th></th>
                                <th>Nombre Propietario</th>
                                <th></th>
                                <th>DNI</th>
                                <th>Tel</th>
                                <th>Email</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody >
                            <tr>
                                <td><img src={Img} height='30px' /></td>
                                <td>{propiedades[0].propietario.nombres}{', '}{propiedades[0].propietario.apellidos}</td>
                                <td className='text-center'>
                                <Link to={'/register-estate?idClient='+propiedades[0].propietario.idPropiedario}><Button className='w-75' variant='success'>Agregar Inmueble</Button></Link>
                                </td>
                                <td>{propiedades[0].propietario.dni}</td>
                                <td>{propiedades[0].propietario.telefono}</td>
                                <td>{propiedades[0].propietario.email}</td>
                                <td><Accordion.Header className='m-0 p-0'></Accordion.Header></td>
                            </tr>
                        </tbody>
                    </Table>
                    <Accordion.Body className='p-0'>
                    <Table key={propiedades[0].propietario.idPropiedario+'-t'} id={propiedades[0].propietario.idPropiedario+'-t'} variant='dark' className='text-center' striped bordered hover>
                    <thead>
                        <tr>
                            <th>Tipo</th>
                            <th>Medidas</th>
                            <th>Estado</th>
                            <th>Monto</th>
                            <th>Direccion</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {propiedades?.map((propiedad) => (
                        <tr id={propiedades[0].propietario.idPropiedario + ' ' + propiedad.idPropiedad} className='my-2' key={propiedades[0].propietario.idPropiedario + ' ' + propiedad.idPropiedad} >
                            <td>{propiedad.tipo}</td>
                            <td>{propiedad.medidas}</td>
                            
                            {(propiedad.estado=='Disponible') ? (<td>{propiedad.estado}</td>) : (<td style={{color: 'red'}}><strong>{propiedad.estado}</strong></td>)}
                            
                            <td>{'$'}{propiedad.monto}</td>
                            <td>
                                {propiedad.ubicacion.pais}{', '}
                                {propiedad.ubicacion.provincia}{', '}
                                {propiedad.ubicacion.ciudad}{', '}
                                {propiedad.ubicacion.direccion}{' '}
                                {propiedad.ubicacion.numero}
                            </td>
                            <td><Link to={'/estates/'+propiedad.idPropiedad}><Button variant='secondary'>Modificar</Button></Link></td>
                            <td><Button variant='danger' onClick={(e)=>this.handleDelete(e, propiedad.idPropiedad, propiedades, index)}><span className='fi-rr-trash'></span></Button></td> 
                        </tr>
                        ))} 
                    </tbody>
                    </Table>
                    </Accordion.Body>
                    </Accordion.Item>
                    </Accordion>)}
                    </>
                    ))}
                    </Card>
                </Container>}  
            </div>
        )
    }
}
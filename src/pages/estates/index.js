import axios from 'axios'
import React from 'react'
import { Container, Button, Table, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import NavBar from '../components/NavBar'
import Img from '../../../public/cliente.png'
import './styles.css'

export default class Estates extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            propiedades: [],
        }
        this.handleDelete = this.handleDelete.bind(this)
    }

   async componentDidMount(){
        try{
        const urlApiPropiedades='http://localhost:8080/api/v1/propiedades'
        const urlApiUbicacion='http://localhost:8080/api/v1/ubicacion/'
        const urlApiPropietario='http://localhost:8080/api/v1/propietarios/'
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
        this.setState({propiedades: propiedades})
        }
        catch{
            console.log('Error')
        }              
   }

    handleDelete(e, id){
        const urlApiPropiedadesDelete = 'http://localhost:8080/api/v1/'
        e.preventDefault()
        axios.delete(urlApiPropiedadesDelete + id).then(res=>{
        this.setState({propiedades: this.state.propiedades.filter(propiedad => {return propiedad.idPropiedad != id})})
        }
        )
    }

    render (){
        return (
            <div className='color-bc d-flex flex-row min-vh-100 ' >
                <NavBar className='min-vh-100'></NavBar>
                <Container className='d-flex align-items-center justify-content-center flex-column'>
                    <h1>Listado Propiedades</h1>
                    <Card className='mt-5 p-2'>
                    <Table variant='dark' className='text-center' striped bordered hover>
                    <thead  >
                        <tr>
                            <th></th>
                            <th>Nombre Propietario</th>
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
                    {this.state.propiedades.map((propiedad) => (
                        <tr id={"1 " + propiedad.idPropiedad} className='my-2' key={propiedad.idPropiedad} >
                            <td><img src={Img} height='30px' /></td>
                            <td>{propiedad.propietario.nombres}{', '}{propiedad.propietario.apellidos}</td>
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
                            <td><Button variant='danger' onClick={(e)=>this.handleDelete(e, propiedad.idPropiedad)}><span className='fi-rr-trash'></span></Button></td> 
                        </tr>
                        
                        ))} 
                    </tbody>
                    </Table>
                            <Container className='text-center'>
                                <Link to='/register-estate'><Button className='w-75' variant='success'>Registrar otra propiedad</Button></Link>
                            </Container>
                    </Card>
                </Container>    
            </div>
        )
    }
}
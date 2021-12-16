import React from 'react'
import { Accordion, Table, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Img from '../../../../public/cliente.png';

export default class HeaderClientTable extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <Table style={{color: 'white', background: '#333', marginBottom: '-0.01em'}} className='text-center mt-5' id={this.props.propiedades[0].propietario.idPropietario}
            responsive="sm">
            <thead>
                <tr>
                    <th></th>
                    <th>Id</th>
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
                    <td>{'#'}{this.props.propiedades[0].propietario.idPropietario}</td>
                    <td>{this.props.propiedades[0].propietario.nombres}{', '}{this.props.propiedades[0].propietario.apellidos}</td>
                    <td className='text-center'>
                    <Link to={'/register-estate?idClient='+this.props.propiedades[0].propietario.idPropietario}><Button className='w-100' variant='success'>Agregar Inmueble</Button></Link>
                    </td>
                    <td>{this.props.propiedades[0].propietario.dni}</td>
                    <td>{this.props.propiedades[0].propietario.telefono}</td>
                    <td>{this.props.propiedades[0].propietario.email}</td>
                    <td>{this.props.children}</td>
                </tr>
            </tbody>
        </Table>
        )
    }
}
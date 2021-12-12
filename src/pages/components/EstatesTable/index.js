import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default class EstatesTable extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <tbody>
                {this.props.propiedades?.map((propiedad) => (
                    <tr id={this.props.propiedades[0].propietario.idPropietario + ' ' + propiedad.idPropiedad} className='my-2' key={this.props.propiedades[0].propietario.idPropietario + ' ' + propiedad.idPropiedad} >
                        <td>{propiedad.tipo}</td>
                        <td>{propiedad.medidas}</td>
                        
                        {(propiedad.estado=='Disponible') 
                        ? (<td>{propiedad.estado}</td>) 
                        : (<td style={{color: 'red'}}><strong>{propiedad.estado}</strong></td>)}
                        
                        <td>{'$'}{propiedad.monto}</td>
                        <td>
                            {propiedad.ubicacion.pais}{', '}
                            {propiedad.ubicacion.provincia}{', '}
                            {propiedad.ubicacion.ciudad}{', '}
                            {propiedad.ubicacion.direccion}{' '}
                            {propiedad.ubicacion.numero}
                        </td>
                        <td><Link to={'/estates/'+propiedad.idPropiedad}><Button variant='secondary'>Modificar</Button></Link></td>
                        <td><Button variant='danger' onClick={()=>this.props.onDelete(propiedad.idPropiedad)}><span className='fi-rr-trash'></span></Button></td> 
                    </tr>
                    ))} 
            </tbody>
        )
    }
}
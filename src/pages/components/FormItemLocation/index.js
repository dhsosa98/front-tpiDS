import React from 'react'
import {FormLabel, FormGroup, FormControl, Container } from 'react-bootstrap'

export default class FormItemLocation extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <Container className='mb-3'>
            <h2 className='mb-3'>Ubicacion</h2>
            <Container className='w-75' fluid="sm">
                    <FormGroup className='w-100 mx-5'>
                        <FormLabel>Pais - Obligatorio</FormLabel>
                        <FormControl value={this.props.dataLocation.pais} name='dataLocation-pais' onChange={this.props.onChange} />
                        <FormLabel>Provincia - Obligatorio</FormLabel>
                        <FormControl value={this.props.dataLocation.provincia} name='dataLocation-provincia' onChange={this.props.onChange}  />
                        <FormLabel>Ciudad - Obligatorio</FormLabel>
                        <FormControl value={this.props.dataLocation.ciudad} name='dataLocation-ciudad' onChange={this.props.onChange} />
                        <FormLabel  >Barrio</FormLabel>
                        <FormControl value={this.props.dataLocation.barrio} name='dataLocation-barrio' onChange={this.props.onChange} />
                    </FormGroup>
                    <FormGroup className='w-100 mx-5'>
                        <FormLabel  >Calle - Obligatorio</FormLabel>
                        <FormControl value={this.props.dataLocation.direccion} name='dataLocation-direccion' onChange={this.props.onChange}/>
                        <FormLabel  >Numero - Obligatorio</FormLabel>
                        <FormControl value={this.props.dataLocation.numero} name='dataLocation-numero' type='number' onChange={this.props.onChange} />
                        <FormLabel  >Piso</FormLabel>
                        <FormControl value={this.props.dataLocation.piso} name='dataLocation-piso' type='number' onChange={this.props.onChange} />
                        <FormLabel  >Depto</FormLabel>
                        <FormControl value={this.props.dataLocation.dpto} name='dataLocation-dpto' onChange={this.props.onChange}  />
                    </FormGroup>
            </Container>
            </Container>
        )
    }
}
import React from 'react'
import {Button, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default class FormItemFooter extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <Container className='text-center my-5'>
                 {
                 (this.props.dataClient.dni &&
                this.props.dataEstate.medida1 &&
                this.props.dataEstate.medida2 &&
                this.props.dataEstate.antiguedad &&
                this.props.dataEstate.monto &&
                this.props.dataEstate.tipo &&
                this.props.dataEstate.amueblado &&
                this.props.dataEstate.artefactos &&
                this.props.dataEstate.servicios &&
                this.props.dataLocation.pais &&
                this.props.dataLocation.provincia &&
                this.props.dataLocation.ciudad &&
                this.props.dataLocation.direccion &&
                this.props.dataLocation.numero) 
                 ? (<Button className='w-25 m-4' variant={this.props.type} type='submit' disabled={false}>{this.props.children}</Button>) 
                 : (<Button className='w-25 m-4' variant={this.props.type} type='submit' disabled={true}>{this.props.children}</Button>)}
                 <Link to='/estates'><Button className='w-25 m-4' variant="secondary">Volver</Button></Link>
            </Container>
        )
    }
}
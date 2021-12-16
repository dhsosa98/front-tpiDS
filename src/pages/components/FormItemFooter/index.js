import React from 'react'
import {Button, Row, Col, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default class FormItemFooter extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <Container fluid className='my-5'>
            <Row className='text-center w-100' >
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
                 ? (<Col><Button className='w-50 mx-5 mb-3' variant={this.props.type} type='submit' disabled={false}>{this.props.children}</Button></Col>) 
                 : (<Col><Button className='w-50 mx-5 mb-3' variant={this.props.type} type='submit' disabled={true}>{this.props.children}</Button></Col>)}
                 <Col><Link to='/estates'><Button className='w-50 mx-5 mb-3' variant="secondary">Volver</Button></Link></Col>
            </Row>
            </Container>
        )
    }
}
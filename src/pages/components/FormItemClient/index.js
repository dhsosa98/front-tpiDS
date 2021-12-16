import React from 'react'
import {Row, Col, FormLabel, FormGroup, InputGroup, FormControl, Container, Button } from 'react-bootstrap'

export default class FormItemClient extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <Container className='mb-3'>
                        <h2 className='mb-3'>Datos Propietario</h2>
                            <Row className='w-100' fluid='false'>
                                <Col className='w-50 me-5' >
                                    <FormLabel >Buscar por id Cliente</FormLabel>
                                    <FormGroup className='w-100' >
                                        <InputGroup>
                                            <FormControl value={this.props.dataClient.idPropietario} name='dataClient-idPropietario' type='number' className='shadow-none' style={{backgroundColor: 'transparent', outline: 'none', border: 'none', borderBottom: 'solid 1px gray'}} onChange={this.props.onChange}/>
                                            {(!this.props.dataClient.idPropietario) ? (<Button onClick={this.props.onSearch} type='search' disabled={true}>Buscar</Button>) : <Button onClick={this.props.onSearch} type='search' disabled={false}>Buscar</Button>}
                                        </InputGroup>
                                    </FormGroup>
                                    </Col>
                                    {this.props.search && 
                                    (
                                    <>
                                    <Col className='w-100 md-5'>
                                    <FormLabel>DNI</FormLabel>
                                        <FormControl value={this.props.dataClient.dni} name='dni' type='number' onChange={this.props.onChange} disabled={true}/>
                                        <FormLabel>Nombres</FormLabel>
                                        <FormControl value={this.props.dataClient.nombres} name='nombres' onChange={this.props.onChange} disabled={true}/> 
                                        <FormLabel>Apellidos</FormLabel>
                                        <FormControl value={this.props.dataClient.apellidos} name='apellidos' onChange={this.props.onChange} disabled={true}/> 
                                        </Col>
                                        <Col className='w-100 md-5'>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl value={this.props.dataClient.email}  name='email' type='email' onChange={this.props.onChange} disabled={true}/>
                                        <FormLabel>Teléfono</FormLabel>
                                        <FormControl value={this.props.dataClient.telefono}  name='telefono' type='number' onChange={this.props.onChange} disabled={true}/>
                                    </Col>
                                    </>
                                )}
                            </Row>   
                        </Container>
        )
    }
}
import React from 'react'
import {Row, Col, Form, FormLabel, FormGroup, InputGroup, FormControl, Container } from 'react-bootstrap'

export default class FormItemEstate extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <Container className='mb-3'>
                <h2 className='mb-3'>Datos Propiedad</h2>
                <Container className='w-75' fluid="sm">
                    <FormGroup className='w-100 mx-5'>
                        <FormLabel>Imagen</FormLabel>
                        <FormControl  type='file' accept="image/png, image/gif, image/jpeg" />
                        <FormLabel>Medidas - Obligatorio</FormLabel>
                        <InputGroup >
                            <FormControl type='number' value={this.props.dataEstate.medida1} name='dataEstate-medida1' onChange={this.props.onChange} />
                            <InputGroup.Text>X</InputGroup.Text>
                            <FormControl type='number' value={this.props.dataEstate.medida2} name='dataEstate-medida2' onChange={this.props.onChange} />
                            <InputGroup.Text>m2</InputGroup.Text>
                        </InputGroup>
                        <FormLabel>Antiguedad - Obligatorio</FormLabel>
                        <InputGroup>
                        <FormControl value={this.props.dataEstate.antiguedad} name='dataEstate-antiguedad' type='number' onChange={this.props.onChange} />
                        <InputGroup.Text>años</InputGroup.Text>
                        </InputGroup>
                        <FormLabel>Precio - Obligatorio</FormLabel>
                        <InputGroup>
                            <InputGroup.Text>$</InputGroup.Text>
                            <FormControl value={this.props.dataEstate.monto} name='dataEstate-monto' type='number' onChange={this.props.onChange} />
                        </InputGroup>
                        
                    </FormGroup>
                    <FormGroup className='w-100 mx-5'>
                        <FormLabel>Tipo - Obligatorio</FormLabel>
                        <Form.Select name='dataEstate-tipo' defaultValue={this.props.dataEstate.amueblado} className='w-50' aria-label="Floating label select example" onChange={this.props.onChange}>
                            <option value="Alquiler">Alquiler</option>
                            <option value="Venta">Venta</option>
                        </Form.Select>
                        <FormLabel >Amueblado - Obligatorio</FormLabel>
                        <Form.Select defaultValue={this.props.dataEstate.amueblado} name='dataEstate-amueblado' className='w-50' aria-label="Floating label select example" onChange={this.props.onChange}>
                            <option  value="SI">SI</option>
                            <option value="NO">NO</option>
                        </Form.Select>
                        <FormLabel>Artefactos - Obligatorio</FormLabel>
                        <FormControl value={this.props.dataEstate.artefactos} name='dataEstate-artefactos' onChange={this.props.onChange} />
                        <FormLabel  >Servicios - Obligatorio</FormLabel>
                        <FormControl value={this.props.dataEstate.servicios} name='dataEstate-servicios' onChange={this.props.onChange} />    
                    </FormGroup>
                </Container>
            </Container>
        )
    }
}
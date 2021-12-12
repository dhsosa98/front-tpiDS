import React from 'react'
import { Container, Button, Modal } from 'react-bootstrap'

export default class ModalWindow extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <Modal show={this.props.isShow} onHide={this.props.onHide}>
                <Modal.Header closeButton />

                <Modal.Body className='text-center'>
                    <strong>{this.props.children}</strong>
                </Modal.Body>

                <Modal.Footer >
                    <Container className='d-flex justify-content-around'>
                        {this.props.type=='success' 
                        ? <Button variant="success" onClick={this.props.onConfirm}>Aceptar</Button>
                        : <Button variant="danger" onClick={this.props.onConfirm}>Eliminar</Button>}
                        <Button variant="secondary" onClick={this.props.onHide}>Cerrar</Button>
                    </Container>
                </Modal.Footer>
            </Modal>
        )
    }
}
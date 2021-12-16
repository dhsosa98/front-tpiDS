import React from 'react'
import { Modal, Spinner, ModalBody} from 'react-bootstrap'

export default class Loader extends React.Component{
    render(){
        return(
            <Modal size='sm' className='text-center'  show={this.props.loading} centered>
                <ModalBody className=' bg-opacity-10' style={{backgroundColor: "transparent"}}>
                    <Spinner animation="border" role="hidden" >
                    <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </ModalBody>
            </Modal>
        )
    }
}
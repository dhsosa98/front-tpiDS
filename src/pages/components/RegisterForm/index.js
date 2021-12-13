import React from 'react'
import { Container, Form, FormGroup, FormLabel, FormControl, Button, Image, Row } from 'react-bootstrap'
import srcLogo from "../../../../public/logo.png"
import { Link } from 'react-router-dom'


export default class RegisterForm extends React.Component {
    render (){
        return (
            <Container className='d-flex flex-column min-vh-100 justify-content-center align-items-center' >
                <Row className='col-sm-4'>
                <Image src={srcLogo} />
                <Form onSubmit={this.props.onSubmit} className='d-flex flex-column'>
                    {this.props.isShow && 
                    <Container className=' bg-danger text-center border-5 p-1 bg-opacity-75 my-3'>
                        <strong><h5>Por favor ingrese otro email,</h5> 
                                <h5>el email ya existe</h5></strong>
                    </Container>}
                    <FormGroup className="mb-3" controlId="formBasicEmail">
                        <FormLabel>Correo Electrónico</FormLabel>
                        <FormControl name='email' type='email' value={this.props.userEmail} placeholder="Ingrese email" onChange={this.props.onChange} />
                    </FormGroup>
                    <FormGroup className="mb-3" controlId="formBasicPassword">
                        <FormLabel>Contraseña</FormLabel>
                        <FormControl name='password' value={this.props.userPassword} type="password" placeholder="Contraseña" onChange={this.props.onChange} />
                    </FormGroup>
                    <FormGroup className="mb-3 text-center" >
                        <Link to='/login' className='text-white'>Ya estoy registrado</Link>
                    </FormGroup>
                    <FormGroup className="mb-3 text-center" >
                        <Button className='w-75' variant="secondary" type='submit' value='Submit'>
                            Registrarme
                        </Button>
                    </FormGroup>
                </Form>
                </Row> 
            </Container>  
        )
    }
}

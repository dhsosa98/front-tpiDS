import React from 'react'
import { Container, Form, FormGroup, FormLabel, FormControl, Button, Image, Row } from 'react-bootstrap'
import PropTypes from 'prop-types'
import srcLogo from "../../../../public/logo.png"
import { Link } from 'react-router-dom'
import GetUser from '../../../services/loginService'
import {withRouter} from 'react-router-dom'

class LoginForm extends React.Component {
    static propTypes = {
        history: PropTypes.object.isRequired
    }

    constructor(props){
    super(props)
    this.state = {
        email: [], 
        password: []
        }
    this.serviceUser = new GetUser()
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e){
        this.setState( {[e.target.name]: e.target.value} )
    }

    handleSubmit(e) {
        e.preventDefault()
        const email = this.state.email
        const password = this.state.password
        const user = {
            username: email,
            password: password
        }
        if (this.serviceUser.fetchUser(user)){
            history.push('/')
        }
    }

    render (){
        return (
            <Container className='d-flex flex-column min-vh-100 justify-content-center align-items-center' >
                <Row className='col-sm-4'>
                <Image src={srcLogo} />
                <Form onSubmit={this.handleSubmit} className='d-flex flex-column'>
                    <FormGroup className="mb-3" controlId="formBasicEmail">
                        <FormLabel>Correo Electrónico</FormLabel>
                        <FormControl name='email' type='email' value={this.state.email} placeholder="Ingrese email" onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup className="mb-3" controlId="formBasicPassword">
                        <FormLabel>Contraseña</FormLabel>
                        <FormControl name='password' value={this.state.password} type="password" placeholder="Contraseña" onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup className="mb-3 text-center" >
                        <Link to='/' className='text-white'>¿Olvidó su contraseña?</Link>
                    </FormGroup>
                    <FormGroup className="mb-3 text-center" >
                        <Button className='w-75' variant="secondary" type='submit' value='Submit'>
                            Enviar
                        </Button>
                    </FormGroup>
                </Form>
                </Row> 
            </Container>
            
        )
    }
}

export default withRouter(LoginForm)
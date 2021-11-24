import React from 'react'
import { Container, Image, Nav, NavItem, ListGroup, h5 } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import srcLogo from '../../../../public/logo.png'
import srcUser from '../../../../public/login.png'
import './styles.css'

export default class NavBar extends React.Component{

    render(){
        return (
            <Nav className='d-flex flex-column min-vh-100 position-fixed' style={{background: '#363740'}}>
                    <Container className='text-center my-3'>
                        <Container className='img-login text-center my-3'>
                            <Image className='img-login' src={srcUser} height="90" width="90" />
                        </Container>
                        <h5 className='text_nav-bar'>James Fernand</h5>
                        <h5 className='text_nav-bar'>Agente Inmobiliario</h5>
                    </Container>
                    <ListGroup className='mt-5' style={{background: '#363740'}}>
                        <NavItem><Link to='/' className='link-item'><span className='fi-rr-home mx-2'></span>Inicio</Link></NavItem>
                        <NavItem><Link to='/' className='link-item'><span className='fi-rr-building mx-2'></span>Propiedades</Link></NavItem>
                        <NavItem><Link to='/' className='link-item'><span className='fi-rr-users mx-2'></span>Clientes</Link></NavItem>
                        <NavItem><Link to='/' className='link-item'><span className='fi-rr-calendar mx-2'></span>Eventos</Link></NavItem>
                        <NavItem><Link onClick={()=>{sessionStorage.removeItem('role')}} to='/' className='link-item'><span className='fi-rr-user-remove mx-2'></span>Cerrar Sesión</Link></NavItem>
                    </ListGroup>

                    <Container className='text-center position-relative' style={{top: '25em'}}>
                        <Image src={srcLogo} height="80" />
                    </Container>
            </Nav>
        )
    }
}
import React from 'react'
import { Container, Image, Nav, NavItem, ListGroup, Navbar} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import srcLogo from '../../../../public/logo.png'
import srcUser from '../../../../public/login.png'
import AuthContext from '../../../AuthContex'
import './styles.css'

class NavBar extends React.Component{
    static contextType = AuthContext;
    constructor(props){
        super(props)
        this.state = {responsiveStyles: "", fixed: "position-fixed"}
        this.closeSesion = this.closeSesion.bind(this)
        this.handleToggle = this.handleToggle.bind(this)
    }

    closeSesion(e){
        e.preventDefault()
        this.context.logOut()
        this.props.history.push("/login")
    }

    handleToggle(e){
        {e ?
       this.setState({responsiveStyles: "min-vw-100", fixed: ""}) : 
       this.setState({responsiveStyles: "", fixed: "position-fixed"})}
    }

    render(){
        return (
            <Navbar collapseOnSelect style={{padding: "0"}} onToggle={e=>{this.handleToggle(e)}} className={this.state.fixed} expand="lg"  >
                <div className=' h-100' >
                <Navbar.Toggle aria-controls="responsive-navbar-nav" style={{background: '#363740'}} />
                <Navbar.Collapse id='responsive-navbar-nav'    >
                <Nav className={`d-flex flex-column text-white min-vh-100 ${this.state.responsiveStyles}`} style={{background: '#363740'}} >
                    <Container className='text-center my-3'>
                        <Container className='img-login text-center my-3'>
                            <Image className='img-login' src={srcUser} height="90" width="90" />
                        </Container>
                        <h5 className='text_nav-bar'>James Fernand</h5>
                        <h5 className='text_nav-bar'>Agente Inmobiliario</h5>
                    </Container>
                    <ListGroup className='mt-5' >
                    <Link to='/' className='link-item'><NavItem><span className='fi-rr-home mx-2'></span>Inicio</NavItem></Link>
                    <Link to='/estates' className='link-item'><NavItem><span className='fi-rr-building mx-2'></span>Propiedades</NavItem></Link>
                    <Link to='/' className='link-item'><NavItem><span className='fi-rr-users mx-2'></span>Clientes</NavItem></Link>
                    <Link to='/' className='link-item'><NavItem><span className='fi-rr-calendar mx-2'></span>Eventos</NavItem></Link>
                    <NavItem onClick={this.closeSesion} ><span className='fi-rr-user-remove mx-2'></span>Cerrar Sesión</NavItem>
                    </ListGroup>

                    <Container className='text-center position-relative' style={{top: '25vh'}}>
                        <Image src={srcLogo} height="80" />
                    </Container>
                    </Nav>
                    </Navbar.Collapse>
                    </div>
            </Navbar>
        )
    }
}
export default withRouter(NavBar)
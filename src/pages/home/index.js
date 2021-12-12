import React from 'react'
import { Button, Card, Container } from 'react-bootstrap'
import NavBar from '../components/NavBar'
import { Link } from 'react-router-dom';
import ReactBuild from '../../../public/uicons-regular-rounded/svg/fi-rr-building.svg';
import './styles.css'

export default class Home extends React.Component {
    render (){
        return (
            <div className='color-bc d-flex flex-row min-vh-100 ' >
                <NavBar className='min-vh-100' setToken={this.props.setToken} /> 
                <Container className='d-flex align-items-center justify-content-center flex-column'>
                    <h1 className='mb-5'>Bienvenido James Fernand</h1>
                    <Card style={{ width: '20em', padding: '1em' }}>
                        <ReactBuild className='mb-3' style={{height: '180px'}}/>
                        <Link to='/estates' className='text-center'><Button variant='info' size='lg' style={{height: '100px', color: 'white'}}>Agregar propiedades</Button></Link>
                    </Card>
                </Container>   
            </div>
        )
    }
}
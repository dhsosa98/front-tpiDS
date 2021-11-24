import React from 'react'
import NavBar from '../components/NavBar'
import RegisterEstate from '../components/RegisterEstate'
import './styles.css'

export default class Home extends React.Component {
    render (){
        return (
            <div className='color-bc d-flex flex-row min-vh-100 ' >
                <NavBar className='min-vh-100'></NavBar>
                <RegisterEstate className='min-vh-100'></RegisterEstate>         
            </div>
        )
    }
}
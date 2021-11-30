import React from 'react'
import LoginForm from '../components/LoginForm'
import './styles.css'

export default class Login extends React.Component {
    render (){
        return (
            <div className='color text-white bg-gradient-dark' >
            <LoginForm>
            </LoginForm>
            </div>
        )
    }
}
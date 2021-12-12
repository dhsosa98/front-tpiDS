import React from 'react'
import LoginForm from '../components/LoginForm'
import getUser from '../../services/loginService'
import {withRouter} from 'react-router-dom'
import './styles.css'

class Login extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            email: [], 
            password: []
            }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        }
    
        handleChange(e){
            this.setState( {[e.target.name]: e.target.value} )
        }
    
        async handleSubmit(e) {
            e.preventDefault()
            const email = this.state.email
            const password = this.state.password
            const user = {
                email: email,
                password: password
            }
            const data = await getUser(user)
            if (data){
                this.props.setRole(data.role)
                sessionStorage.setItem('role', data.role)
                this.props.history.push("/")
            }
            else{
                alert("Usuario o contraseña incorrectos")
            }

        }
    render (){
        return (
            <div className='color text-white bg-gradient-dark' >
                <LoginForm userEmail={this.state.email} userPassword={this.state.password} 
                onChange={this.handleChange} onSubmit={this.handleSubmit}/>
            </div>
        )
    }
}

export default withRouter(Login)
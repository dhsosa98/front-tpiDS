import React from 'react'
import LoginForm from '../components/LoginForm'
import userService from '../../services/userService'
import {withRouter} from 'react-router-dom'
import AuthContext from '../../AuthContex'
import './styles.css'

class Login extends React.Component {
    static contextType = AuthContext;
    constructor(props){
        super(props)
        this.state = {
            isShow: false,
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
            const data = await userService.getUser(user)
            if (data){
                console.log(data)
                this.context.logIn(data)
                this.props.history.push("/")
            }
            else{
                this.setState({isShow: true})
            }
            
        }
    render (){
        return (
            <>
                <div className='color text-white bg-gradient-dark' >
                    <LoginForm userEmail={this.state.email} userPassword={this.state.password} 
                    onChange={this.handleChange} onSubmit={this.handleSubmit} isShow={this.state.isShow}/>
                </div>
            </>
        )
    }
}

export default withRouter(Login)
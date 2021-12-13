import React from 'react'
import userService from '../../services/userService'
import {withRouter} from 'react-router-dom'
import './styles.css'
import RegisterForm from '../components/RegisterForm'


class Register extends React.Component {
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
            const data = await userService.addUser(user)
            if (data){
                console.log(data)
                this.props.history.push("/login")
            }
            else{
                this.setState({isShow: true})
            }

        }
    render (){
        return (
            <>
                <div className='color text-white bg-gradient-dark' >
                    <RegisterForm userEmail={this.state.email} userPassword={this.state.password} 
                    onChange={this.handleChange} onSubmit={this.handleSubmit} isShow={this.state.isShow}/>
                </div>
            </>
        )
    }
}

export default withRouter(Register)
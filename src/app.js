import React from 'react'
import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import Login from './pages/login'
import Estates from './pages/estates'
import Home from './pages/home'
import AddEstate from './pages/addEstate'
import UpdateEstate from './pages/updateEstate'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles.css'
import '../public/uicons-regular-rounded/css/uicons-regular-rounded.css'




export default class App extends React.Component{
    constructor(props){
        super(props) 
        this.state = {
            token: sessionStorage.getItem('token')
        }   
        this.setToken = this.setToken.bind(this)
    }
    
    setToken(token){
        this.setState({token: token})
    }

    render() {
        return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={()=> {
                if (this.state.token) {
                    return <Home setToken={this.setRole}/>
                }
                return (<Redirect to='/login' />)
                }} />
                <Route path='/login' component={()=> {
                    if (!this.state.token) {
                        return <Login setToken={this.setToken}/>
                    }
                return (<Redirect to='/' />)
                }} /> 
                <Route exact path='/estates' component={()=> {
                if (this.state.token) {
                    return (<Estates setToken={this.setToken}/>)
                }
                return (<Redirect to='/login' />)
                }} />
                <Route path='/estates/:id' component={()=> {
                if (this.state.token) {
                    return (<UpdateEstate setToken={this.setToken}/>)
                }
                return (<Redirect to='/login' />)
                }} />
                <Route path='/register-estate' component={()=> {
                if (this.state.token) {
                    return (<AddEstate setToken={this.setToken}/>)
                }
                return (<Redirect to='/login' />)
                }} />
            </Switch>   
        </BrowserRouter>
        )
    }
}
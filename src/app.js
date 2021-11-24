import React from 'react'
import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import Login from './pages/login'
import Home from './pages/home'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles.css'

export default class App extends React.Component{
    constructor(props){
        super(props) 
    }
    token = sessionStorage.getItem('token')

    render() {
        return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={()=> {
                if (this.token) {
                    return <Home />
                }
                return (<Redirect to='/login' />)
                }} />
                <Route path='/login' component={()=> {
                    if (!this.token) {
                        return <Login />
                    }
                return (<Redirect to='/' />)
                }} />  
            </Switch>   
        </BrowserRouter>
        )
    }
}
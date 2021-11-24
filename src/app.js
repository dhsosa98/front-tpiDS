import React from 'react'
import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import Login from './pages/login'
import Home from './pages/home'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles.css'
import '../public/uicons-regular-rounded/css/uicons-regular-rounded.css'

export default class App extends React.Component{
    constructor(props){
        super(props) 
    }
    role = sessionStorage.getItem('role')

    render() {
        return (
        <BrowserRouter>
            <Switch>
                <Route path='/' component={()=> {
                if (this.role) {
                    return <Home />
                }
                return (<Redirect to='/login' />)
                }} />
                <Route path='/login' component={()=> {
                    if (!this.role) {
                        return <Login />
                    }
                return (<Redirect to='/' />)
                }} /> 
            </Switch>   
        </BrowserRouter>
        )
    }
}
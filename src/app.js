import React from 'react'
import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import Login from './pages/login'
import Estates from './pages/estates'
import Home from './pages/home'
import RegisterEstate from './pages/components/RegisterEstate'
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
                <Route exact path='/' component={()=> {
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
                <Route exact path='/estates' component={()=> {
                if (this.role) {
                    return (<Estates />)
                }
                return (<Redirect to='/login' />)
                }} />
                <Route path='/estates/register-estate' component={()=> {
                if (this.role) {
                    return (<RegisterEstate />)
                }
                return (<Redirect to='/login' />)
                }} />
            </Switch>   
        </BrowserRouter>
        )
    }
}
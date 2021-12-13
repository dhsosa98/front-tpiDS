import React from 'react'
import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import Login from './pages/login'
import Estates from './pages/estates'
import Home from './pages/home'
import AddEstate from './pages/addEstate'
import UpdateEstate from './pages/updateEstate'
import Register from './pages/Register'
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
                 {(!this.state.token) && (
                <>
                <Route exact path='/login' >
                    <Login setToken={this.setToken} />
                </Route>
                <Route exact path='/register' >
                    <Register />
                </Route>
                <Route exact path='/' >
                    <Redirect to='/login' />
                </Route>
                </>
                 )}
                {(this.state.token) ? (
                <>
                <Route exact path='/' >
                    <Home setToken={this.setToken} />
                </Route>

                <Route exact path='/estates' >
                    <Estates setToken={this.setToken} />
                </Route>

                <Route path='/estates/:id' >
                    <UpdateEstate setToken={this.setToken} />
                </Route>

                <Route path='/register-estate' >
                    <AddEstate setToken={this.setToken} />
                </Route>
                </>
                 )  : <Redirect to='/login' />}
            </Switch>   
        </BrowserRouter>
        )
    }
}
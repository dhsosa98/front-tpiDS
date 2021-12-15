import React from 'react'
import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import Login from './pages/login'
import Estates from './pages/estates'
import Home from './pages/home'
import AddEstate from './pages/addEstate'
import UpdateEstate from './pages/updateEstate'
import Register from './pages/register'
import AuthContext from './AuthContext'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles.css'
import '../public/uicons-regular-rounded/css/uicons-regular-rounded.css'





export default class App extends React.Component{
    static contextType = AuthContext;

    render() {
        const {isAuth} = this.context
        return (
        <BrowserRouter>
            <Switch>
                 {(!isAuth) && (
                <>
                <Route exact path='/login' >
                    <Login />
                </Route>
                <Route exact path='/register' >
                    <Register />
                </Route>
                <Route path='/' >
                    <Redirect to='/login' />
                </Route>
                </>
                 )}
                {(isAuth) ? (
                <>
                <Route exact path='/login' >
                    <Redirect to="/" />
                </Route>

                <Route exact path='/register' >
                    <Redirect to="/" />
                </Route>

                <Route exact path='/' >
                    <Home />
                </Route>

                <Route exact path='/estates' >
                    <Estates />
                </Route>

                <Route path='/estates/:id' >
                    <UpdateEstate />
                </Route>

                <Route path='/register-estate' >
                    <AddEstate />
                </Route>
                </>
                 )  : <Redirect to='/login' />}
            </Switch>   
        </BrowserRouter>
        )
    }
}


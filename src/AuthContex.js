import React from 'react';

const AuthContext = React.createContext();

export class AuthProvider extends React.Component {
    constructor(props){
    super(props)
    this.state = {
        token: sessionStorage.getItem('token'),
        isAuth: sessionStorage.getItem('token') ? true : false
        }
    this.logIn = this.logIn.bind(this)
    this.logOut = this.logOut.bind(this)
    }
    logIn(token){
        sessionStorage.setItem("token", token)
        this.setState({token: token, isAuth: true})
    }
    logOut(){
        sessionStorage.removeItem("token")
        this.setState({token: '', isAuth: false})
    }
    render(){
        const {token, isAuth} = this.state;
        const {logIn, logOut} = this;
        return(
            <AuthContext.Provider value={{token, isAuth, logIn, logOut}}>
                {this.props.children}
            </AuthContext.Provider>
        )
    }
}

export default AuthContext;
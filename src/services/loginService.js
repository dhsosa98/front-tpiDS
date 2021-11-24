
export default class GetUser {
    fetchUser(credentials) {
        const user = {
            email: 'inmb@domus.com',
            password: '1234imb',
            role: 'Agente Inmobiliario'
        }
        console.log(credentials)
         if ((credentials.email) == (user.email) && (credentials.password) == (user.password)) {
             sessionStorage.setItem('role', user.role)
             console.log('Aqui estoyy')
         }
         else alert('Usuario o contraseña incorrecta')
        }
}


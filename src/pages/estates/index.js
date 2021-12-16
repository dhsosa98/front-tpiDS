import axios from 'axios'
import React from 'react'
import { Container, Card} from 'react-bootstrap'
import NavBar from '../components/NavBar'
import ClientsTables from '../components/ClientsTables'
import ModalWindow from '../components/ModalWindow'
import './styles.css'
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min'
import UpdateEstate from './../updateEstate'

export default class Estates extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            idDelete: '',
            isShow: false,
            propiedades: [],
            propiedadesPorClientes: []
        }
        this.modalText = '¿Está seguro que desea Eliminar esta propiedad?'
        this.handleDelete = this.handleDelete.bind(this)
        this.handleShowModalDelete = this.handleShowModalDelete.bind(this)
        this.handleConfirmModal = this.handleConfirmModal.bind(this)
        this.handleCloseModal = this.handleCloseModal.bind(this)
    }

   async componentDidMount(){
        try{
        const urlApiPropiedades='https://back-tpids.herokuapp.com/api/v1/propiedades'
        const urlApiUbicacion='https://back-tpids.herokuapp.com/api/v1/ubicacion/'
        const urlApiPropietario='https://back-tpids.herokuapp.com/api/v1/propietarios/'
        const config = {headers: {authorization: sessionStorage.getItem('token')}}
        let aux = []
        let p = []
        var {data: propiedades}  = await axios.get(urlApiPropiedades, config)
        for (const propiedad of propiedades){
            var {data: ubicacion} = await axios.get(urlApiUbicacion+propiedad.ubicacion, config)
            var {data: propietario} = await axios.get(urlApiPropietario+propiedad.propietario, config)
            propiedad["ubicacion"] = ubicacion
            propiedad["propietario"] = propietario
        };
        propiedades = propiedades.sort(
            (a,b) => (a.propietario.nombres > b.propietario.nombres) ? 1 : ((b.propietario.nombres > a.propietario.nombres) ? -1 : 0)
            )
        var {idPropietario} = propiedades[0].propietario
        for (const propiedad of propiedades){
            let {idPropietario: id} = propiedad.propietario
            if (idPropietario != id){
                idPropietario = id
                p = [...p, aux]
                aux = []
            }
           aux = [...aux, propiedad]
        }
        p = [...p, aux]
        this.setState({propiedadesPorClientes: p})
        }
        catch{
            console.log('No hay propiedades en la BD')
        }              
   }

    handleDelete(id){
        const urlApiPropiedadesDelete = 'https://back-tpids.herokuapp.com/api/v1/'
        const config = {headers: {authorization: sessionStorage.getItem('token')}}
        axios.delete(urlApiPropiedadesDelete + id, config).then(res=>{
            this.setState({propiedadesPorClientes: 
                this.state.propiedadesPorClientes.map(k => k.filter(e => e.idPropiedad !== id)).filter(p=>p!='')})
            }
        ).catch(res => {
            if (res){
                console.log('No hay propiedad con ese id')
            }}
        )
    }

        handleCloseModal(){
            this.setState({isShow: false})
        }
        
        handleConfirmModal(e){
            e.preventDefault()
            this.setState({isShow: false})
            this.handleDelete(this.state.idDelete)
        }

        handleShowModalDelete(id){
            this.setState({isShow: true})
            this.setState({idDelete: id})
        }

    render (){
        return (
            <Switch>
                <Route exact path='/estates' >
                    <div className='color-bc d-flex flex-row flex-wrap ' >
                        <ModalWindow isShow={this.state.isShow} onHide={this.handleCloseModal} onConfirm={this.handleConfirmModal} type="danger">
                            {this.modalText}
                        </ModalWindow>
                        <NavBar className='' />
                        <Container className='d-flex align-items-center justify-content-center flex-column'>
                            <h1 className='mt-5'>Listado Propiedades</h1>
                            <Card className='mt-5 p-2 w-100'>
                                <ClientsTables propiedadesPorClientes={this.state.propiedadesPorClientes} onDelete={this.handleShowModalDelete} />
                            </Card>
                        </Container>
                    </div>
                </Route>
                <Route path='/estates/:id' >  
                    <UpdateEstate />      
                </Route>
            </Switch>
        )
    }
}
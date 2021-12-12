import React from 'react'

export default class HeaderEstatesTable extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
        <thead>
            <tr>
                <th>Tipo</th>
                <th>Medidas</th>
                <th>Estado</th>
                <th>Monto</th>
                <th>Direccion</th>
                <th></th>
                <th></th>
            </tr>
        </thead>
        )
    }
}
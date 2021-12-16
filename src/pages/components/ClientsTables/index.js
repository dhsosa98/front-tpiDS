import React from 'react';
import { Table, Accordion} from 'react-bootstrap';
import EstatesTable from '../EstatesTable';
import HeaderClientTable from '../HeaderClientTable';
import HeaderEstatesTable from '../HeaderEstatesTable';
export default class ClientsTables extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <>
            {this.props.propiedadesPorClientes?.map((propiedades) =>(
                <Accordion key={propiedades[0].propietario.idPropietario} className='w-100'>
                    <Accordion.Item eventKey={0} flush='true' className='w-100'>
                        <HeaderClientTable propiedades={propiedades} >
                            <Accordion.Header className='m-0 p-0 w-75 h-25' />
                        </HeaderClientTable>
                        <Accordion.Body className='p-0'>
                            <Table id={propiedades[0].propietario.idPropietario+'-t'} variant='dark' className='text-center' striped bordered hover
                            responsive="sm">
                                <HeaderEstatesTable />
                                <EstatesTable propiedades={propiedades} onDelete={this.props.onDelete} />
                            </Table>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            ))}
            </>
        )
    }
}
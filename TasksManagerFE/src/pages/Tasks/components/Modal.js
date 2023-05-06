import React, {useEffect, useState} from 'react'
import { Row, Button, Modal as Modal_, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const CLEAR_DATA = {title:'', content:''};
const Modal = ({modal, toggle, handleSubmit, modalConfig}) => {
    const {modalData, editMode, id} = modalConfig;
    
    const [ dataInput, setDataInput ] = useState(modalData);

    useEffect(()=>{setDataInput(modalData)},[modalData])

    const handleChange = (e) => {
        let value = e.target.value;
        
        setDataInput((prevState) => ({
            ...prevState,
            [e.target.name]: value
        }));
    };

    const validateForm = () => {
        return dataInput.title === "" || dataInput.content === "";
    }

    return <>
        <Modal_ isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Aggiungi Task</ModalHeader>
            <form onSubmit={ ( e ) => { e.preventDefault(); handleSubmit(dataInput); setDataInput(CLEAR_DATA);toggle() } }>
            <ModalBody>
            

                <div className="row mb-3">
                <div className="col-md-12">
                    <input 
                    className="form-control" 
                    name="title" 
                    type="text"
                    value={ dataInput.title } 
                    onChange={ handleChange } 
                    placeholder="Title"
                    />
                </div>
                </div>

                <div className="row mb-3">
                <div className="col-md-12">
                    <textarea 
                    className="form-control" 
                    name="content" 
                    value={ dataInput.content } 
                    onChange={ handleChange } 
                    placeholder="Testo"
                    ></textarea>
                </div>
                </div>

            </ModalBody>
            <ModalFooter>
            <Button color="primary" disabled={ validateForm() } type="submit">
                {editMode?"Modifica":"Aggiungi"}
            </Button>{' '}
            <Button color="secondary" onClick={()=>{setDataInput(CLEAR_DATA);toggle()}}>
                Annulla
            </Button>
            </ModalFooter>
            </form>
        </Modal_>
    </>
}

export default Modal
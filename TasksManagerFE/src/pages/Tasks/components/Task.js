import React from 'react'
import { Col, Card, CardTitle, CardText, Button } from 'reactstrap';


const Task = ({ item, actDelete, actUpdate, actComplete, openModal }) => {
  return (
    <Col sm="6" className="mb-4">
        <Card body>
            <CardTitle tag="h5">
                {item.title}
            </CardTitle>
            <CardText>
                {item.content}
            </CardText>
            
            <div className="d-flex justify-content-end">
                
                {!item.done&&<>
                <Button color="success" size="sm" className="ms-2" onClick={()=> {actComplete(item.id)}}>
                    Completa
                </Button>
                <Button color="primary" size="sm" className="ms-2" onClick={()=> {openModal(item)}}>
                    Modifica
                </Button>
                </>}
                <Button color="danger" size="sm" className="ms-2" onClick={()=> {actDelete(item.id)}}>
                    Elimina
                </Button>
                
            </div>
        </Card>
    </Col>
  )
}

export default Task
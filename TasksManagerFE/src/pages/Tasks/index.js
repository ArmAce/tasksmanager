import React, { useState } from 'react'
import useTasks from '../../hooks/useTasks';
import { Row, Button } from 'reactstrap';
import Task from './components/Task';
import Modal from './components/Modal';

const MODAL_OPTS = {
  editMode: false,
  id: '',
  modalData: {title:'', content:''}
}

const Tasks = () => {

  const { tasks, addTask, deleteTask, editTask, completeTask } = useTasks();

  const [modal, setModal] = useState(false);
  const [modalOpts, setModalOpts] = useState(MODAL_OPTS);

  const toggle = () => setModal(!modal);


  const addNewTask = (data) => {
    addTask(data)
  }

  const deleteSelectedTask = (id) => {
    deleteTask(id)
  }

  const editSelectedTask = (data, id) => {
    editTask(id, data)
  }

  const completeSelectedTask = (id) => {
    completeTask(id)
  }

  const modalEditTask = (task) => {
    console.log(task)
    setModalOpts((prevState)=>{
      return {
        ...prevState,
        editMode: true,
        id: task.id,
        modalData: {title:task.title, content:task.content}
      }
    })
    toggle();
  }
  const submitEvent = (data) => {
    console.log(modalOpts)
    console.log(data)
    if(modalOpts.editMode) {
      editSelectedTask(data, modalOpts.id)
    } else {
      addNewTask(data)
    }

  }

  return (
  <>
  <div>
      <Button color="danger" onClick={()=>{setModalOpts(MODAL_OPTS);toggle();}} className="mb-4">
        Aggiungi Task
      </Button>
      <Modal modal={modal} modalConfig={modalOpts} toggle={toggle} handleSubmit={submitEvent}/>
    </div>
  <Row>
    {tasks&&tasks.map((task, i)=><Task key={i} item={task} openModal={modalEditTask} actDelete={deleteSelectedTask} actComplete={completeSelectedTask}/>)}
  </Row>
  </>
  
  )
}

export default Tasks
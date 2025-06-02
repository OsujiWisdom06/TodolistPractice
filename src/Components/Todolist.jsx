import React, { useState } from 'react'
import "../styles/todolist.css"

const Todolist = () => {

  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState("")

  const handleInputChange = (e) => {
    setNewTask(e.target.value)
  }

  const addTask = () => {
   if (!newTask.trim()) {
    alert("Please add a task")

   } else if (tasks.includes(newTask.trim())) {
    alert("Task already exist")
   } else{
     setTasks([...tasks, newTask])
     setNewTask("")
   }
  }

  return (
    <div className='Todolist-main-body'>
        <div className='Todolist-main-content'>
            <div className='Todolist-main-header'><h1>Todolist App</h1></div>
            <div className='Todolist-input-div'>
                <input type="text" className='Todolist-input-div-main' placeholder='Enter your task...' value={newTask} onChange={handleInputChange} />
            </div>
            <div className='add-task-btn-div'>
                <button onClick={addTask} className='add-task-btn-main'>Add Task</button>
            </div>
            <div className='all-my-task-div'>
                <div className='all-my-task-div-wrap'>
                {
                tasks.map((task, index)=>(
                    <div className='all-my-task-task-main'>
                    <div key={index} className='all-my-task-main-task-inner'>{task}</div>
                    <div className='all-my-task-main-task-inner-edit-delete'>
                        <button className='edit-btn'>Edit</button>
                        <button className='delete-btn'>Delete</button>
                    </div>
                </div>
                ))
               }
                </div>
              
            </div>
        </div>
    </div>
  )
}

export default Todolist
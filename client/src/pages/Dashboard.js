import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './Dashboard.css'

function Dashboard() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('medium')
  const navigate = useNavigate()

  const user = JSON.parse(localStorage.getItem('user'))
  const token = localStorage.getItem('token')

  const headers = { Authorization: `Bearer ${token}` }

  // Tasks fetch karo
  const fetchTasks = useCallback(async () => {
    try {
      const responseHeaders = { Authorization: `Bearer ${token}` }
      const res = await axios.get('http://localhost:5000/api/tasks', { headers: responseHeaders })
      setTasks(res.data)
    } catch (err) {
      console.log(err)
    }
  }, [token])

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  // Task banao
  const createTask = async () => {
    if (!title) return
    try {
      await axios.post('http://localhost:5000/api/tasks',
        { title, description, priority },
        { headers }
      )
      setTitle('')
      setDescription('')
      fetchTasks()
    } catch (err) {
      console.log(err)
    }
  }

  // Status update karo
  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/tasks/${id}`,
        { status },
        { headers }
      )
      fetchTasks()
    } catch (err) {
      console.log(err)
    }
  }

  // Task delete karo
  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, { headers })
      fetchTasks()
    } catch (err) {
      console.log(err)
    }
  }

  // Logout
  const logout = () => {
    localStorage.clear()
    navigate('/login')
  }

  const statusLabels = {
    todo: '📋 Todo',
    inprogress: '⚡ In Progress',
    done: '✅ Done'
  }

  const statusCounts = { todo: 0, inprogress: 0, done: 0 }
  tasks.forEach((task) => {
    if (statusCounts[task.status] !== undefined) {
      statusCounts[task.status] += 1
    }
  })

  const priorityText = {
    low: 'Low Priority',
    medium: 'Medium Priority',
    high: 'High Priority'
  }

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <div>
          <p className="eyebrow">Daily productivity powered by TaskFlow</p>
          <h1>TaskFlow Dashboard</h1>
          <p className="subtitle">
            Organize your workflow with elegant kanban lanes, priority cues, and smooth animated task cards.
          </p>
        </div>

        <div className="user-panel">
          <span>Welcome, <strong>{user?.name}</strong></span>
          <button className="button button-secondary" onClick={logout}>Logout</button>
        </div>
      </header>

      <section className="dashboard-panel">
        <div className="panel-heading">
          <div>
            <span className="panel-chip">New task</span>
            <h2>Create a fresh card</h2>
          </div>
          <p className="panel-copy">
            Add task details, choose the right priority, and move tasks across statuses with ease.
          </p>
        </div>

        <div className="task-form">
          <input
            className="input"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className="input"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <select
            className="status-select"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
          <button className="button button-primary" onClick={createTask}>
            Add Task ➕
          </button>
        </div>
      </section>

      <div className="columns-grid">
        {['todo', 'inprogress', 'done'].map((status) => (
          <section key={status} className="column-panel">
            <div className="column-header">
              <h3 className="column-title">{statusLabels[status]}</h3>
              <span className="column-badge">{statusCounts[status]}</span>
            </div>

            {tasks
              .filter((task) => task.status === status)
              .map((task) => (
                <article key={task._id} className="task-card">
                  <div className="priority-block">
                    <span className={`priority-pill ${task.priority}`}>
                      <span className="priority-dot" />
                      {priorityText[task.priority]}
                    </span>
                  </div>

                  <h4>{task.title}</h4>
                  <p>{task.description}</p>

                  <div className="task-card-footer">
                    <div className="card-actions">
                      <select
                        className="status-select"
                        value={task.status}
                        onChange={(e) => updateStatus(task._id, e.target.value)}
                      >
                        <option value="todo">Todo</option>
                        <option value="inprogress">In Progress</option>
                        <option value="done">Done</option>
                      </select>
                      <button className="delete-btn" onClick={() => deleteTask(task._id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                </article>
              ))}
          </section>
        ))}
      </div>
    </div>
  )
}

export default Dashboard
import { useTheme } from '../context/ThemeContext'
import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './Dashboard.css'

function Dashboard() {
  const {darkMode , toggleTheme , colors } = useTheme()
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('medium')
  const [dueDate, setDueDate] = useState('')
  const [assignedTo, setAssignedTo] = useState('')
  const navigate = useNavigate()

  const styles = {
    container: { 
      minHeight: '100vh', 
      background: colors.bg, 
      padding: '20px',
      transition: 'all 0.3s ease'
    },
    header: { 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      background: colors.header, 
      padding: '15px 25px', 
      borderRadius: '10px', 
      marginBottom: '20px', 
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
      color: colors.text
    },
    card: { 
      background: colors.card, 
      padding: '12px', 
      borderRadius: '8px', 
      marginBottom: '10px',
      color: colors.text
    },
    column: { 
      background: colors.card, 
      padding: '15px', 
      borderRadius: '10px', 
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
      color: colors.text
    },
    form: { 
      background: colors.card, 
      padding: '20px', 
      borderRadius: '10px', 
      marginBottom: '20px', 
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)', 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '10px',
      color: colors.text
    },
    input: { 
      padding: '10px', 
      borderRadius: '5px', 
      border: `1px solid ${colors.border}`, 
      fontSize: '16px',
      background: colors.bg,
      color: colors.text
    },
    button: {
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px',
      margin: '5px'
    }
  }

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
      const taskData = { title, description, priority }
      if (dueDate) taskData.dueDate = dueDate
      if (assignedTo) taskData.assignedTo = assignedTo
      await axios.post('http://localhost:5000/api/tasks', taskData, { headers })
      setTitle('')
      setDescription('')
      setDueDate('')
      setAssignedTo('')
      fetchTasks()
    } catch (err) {
      console.log(err)
    }
  }

  const aiSuggest = async () => {
    if (!title) return alert('Pehle title likho!')
    try {
      const res = await axios.post(
        'http://localhost:5000/api/ai/suggest',
        { title },
        { headers }
      )
      setDescription(res.data.description)
      setPriority(res.data.priority)
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

  const getDueDateStatus = (dueDate) => {
    if (!dueDate) return null
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const due = new Date(dueDate)
    due.setHours(0, 0, 0, 0)
    const diffTime = due - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    if (diffDays < 0) return 'overdue'
    if (diffDays === 0) return 'today'
    return 'future'
  }

  const overdueCount = tasks.filter(task => {
    const status = getDueDateStatus(task.dueDate)
    return status === 'overdue' && task.status !== 'done'
  }).length

  return (
    <div className="dashboard-page" style={styles.container}>
      <header className="dashboard-header" style={styles.header}>
        <div>
          <p className="eyebrow">Daily productivity powered by TaskFlow</p>
          <h1>TaskFlow Dashboard</h1>
          <p className="subtitle">
            Organize your workflow with elegant kanban lanes, priority cues, and smooth animated task cards.
          </p>
        </div>

        <div className="user-panel">
          <span>Welcome, <strong>{user?.name}</strong></span>
          {overdueCount > 0 && (
            <span style={{
              background: '#ef4444',
              color: 'white',
              padding: '4px 8px',
              borderRadius: '12px',
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              🔔 {overdueCount} Overdue
            </span>
          )}
          <button
            style={{
              padding: '8px 15px',
              background: darkMode ? '#f59e0b' : '#1a1a2e',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              marginRight: '10px'
            }}
            onClick={toggleTheme}
          >
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
          <button className="button button-secondary" style={{ background: darkMode ? 'rgba(255, 255, 255, 0.18)' : '#ddd', color: darkMode ? 'white' : '#000' }} onClick={logout}>Logout</button>
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

        <div className="task-form" style={styles.form}>
          <input
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={styles.input}
          />
          <input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={styles.input}
          />
          <input
            type="date"
            placeholder="Due date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            style={styles.input}
          />
          <input
            placeholder="Assign to (email)"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            style={styles.input}
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            style={styles.input}
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
          <button
            style={{...styles.button, background: '#7c3aed'}}
            onClick={aiSuggest}
          >
            🤖 AI Suggest
          </button>
          <button className="button button-primary" onClick={createTask}>
            Add Task ➕
          </button>
        </div>
      </section>

      <div className="columns-grid">
        {['todo', 'inprogress', 'done'].map((status) => (
          <section key={status} className="column-panel" style={styles.column}>
            <div className="column-header">
              <h3 className="column-title">{statusLabels[status]}</h3>
              <span className="column-badge">{statusCounts[status]}</span>
            </div>

            {tasks
              .filter((task) => task.status === status)
              .map((task) => (
                <article key={task._id} className="task-card" style={styles.card}>
                  <div className="priority-block">
                    <span className={`priority-pill ${task.priority}`}>
                      <span className="priority-dot" />
                      {priorityText[task.priority]}
                    </span>
                  </div>

                  <h4>{task.title}</h4>
                  <p>{task.description}</p>
                  {task.dueDate && (
                    <div style={{
                      display: 'inline-block',
                      padding: '2px 6px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      margin: '4px 0',
                      backgroundColor: getDueDateStatus(task.dueDate) === 'overdue' ? '#ef4444' :
                                       getDueDateStatus(task.dueDate) === 'today' ? '#f97316' : 'transparent',
                      color: getDueDateStatus(task.dueDate) === 'future' ? '#22c55e' : 'white'
                    }}>
                      {getDueDateStatus(task.dueDate) === 'overdue' ? '🔴 Overdue!' :
                       getDueDateStatus(task.dueDate) === 'today' ? '🟡 Due Today!' :
                       `🟢 Due: ${new Date(task.dueDate).toLocaleDateString()}`}
                    </div>
                  )}
                  {task.assignedTo && (
                    <p>Assigned to: {task.assignedTo}</p>
                  )}

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
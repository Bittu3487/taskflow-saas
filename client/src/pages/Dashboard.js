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
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)
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
  const userEmail = localStorage.getItem('userEmail') || user?.email || ''
  const token = localStorage.getItem('token')

  const headers = { Authorization: `Bearer ${token}` }

  // Tasks fetch karo
  const fetchTasks = useCallback(async () => {
    try {
      const responseHeaders = { Authorization: `Bearer ${token}` }
      const res = await axios.get('https://taskflow-saas-rczc.onrender.com/api/tasks', { headers: responseHeaders })
      setTasks(res.data)
      setLoading(false)
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }, [token])

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  // Task banao
  const createTask = async () => {
    if (!title) return
    try {
      const taskData = {
        title,
        description,
        priority,
        createdBy: userEmail
      }
      if (dueDate) taskData.dueDate = dueDate
      if (assignedTo) taskData.assignedTo = assignedTo
      await axios.post('https://taskflow-saas-rczc.onrender.com/api/tasks', taskData, { headers })
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
        'https://taskflow-saas-rczc.onrender.com/api/ai/suggest',
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
      await axios.put(`https://taskflow-saas-rczc.onrender.com/api/tasks/${id}`,
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
      await axios.delete(`https://taskflow-saas-rczc.onrender.com/api/tasks/${id}`, { headers })
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

  const filteredTasks = tasks.filter((task) => {
    // Filtering logic: show all, tasks created by me, or tasks assigned to me
    if (filter === 'my') return task.createdBy?.toLowerCase() === userEmail?.toLowerCase()
    if (filter === 'assigned') return task.assignedTo?.toLowerCase() === userEmail?.toLowerCase()
    return true
  })

  const statusCounts = { todo: 0, inprogress: 0, done: 0 }
  filteredTasks.forEach((task) => {
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

  const overdueCount = filteredTasks.filter(task => {
    const status = getDueDateStatus(task.dueDate)
    return status === 'overdue' && task.status !== 'done'
  }).length

  return (
    <div className="dashboard-page" style={styles.container}>
      {loading && (
        <div className="dashboard-loading-overlay">
          <div className="loading-spinner-container">
            <div className="large-spinner"></div>
            <p>Loading your dashboard...</p>
          </div>
        </div>
      )}
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
            className="button-dark button-dark-accent button-dark-sm"
            onClick={() => navigate('/analytics')}
          >
            📊 Analytics
          </button>
          <button
            className="button-dark button-dark-subtle button-dark-sm"
            onClick={toggleTheme}
          >
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
          <button className="button-dark button-dark-danger button-dark-sm" onClick={logout}>
            🚪 Logout
          </button>
        </div>
      </header>

      <div className="filter-toolbar" style={{
        display: 'flex',
        gap: '10px',
        flexWrap: 'wrap',
        margin: '20px 0',
        alignItems: 'center'
      }}>
        {[
          { key: 'all', label: 'All Tasks' },
          { key: 'my', label: 'My Tasks' },
          { key: 'assigned', label: 'Assigned to Me' }
        ].map(({ key, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => setFilter(key)}
            style={{
              ...styles.button,
              background: filter === key ? colors.primary : 'transparent',
              color: filter === key ? '#ffffff' : colors.text,
              border: `1px solid ${filter === key ? colors.primary : colors.border}`,
              boxShadow: 'none',
              transition: 'all 0.2s ease'
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Analytics Section */}
      <section className="analytics-section">
        <div className="analytics-header">
          <h2>Dashboard Analytics</h2>
          <p>Track your productivity at a glance</p>
        </div>

        {/* Stat Cards Grid */}
        <div className="stat-cards-grid">
          {/* Total Tasks Card */}
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <h3 className="stat-title">Total Tasks</h3>
              <p className="stat-value">{filteredTasks.length}</p>
            </div>
          </div>

          {/* Completed Card */}
          <div className="stat-card stat-card-success">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <h3 className="stat-title">Completed</h3>
              <p className="stat-value">{statusCounts.done}</p>
            </div>
          </div>

          {/* In Progress Card */}
          <div className="stat-card stat-card-warning">
            <div className="stat-icon">⚡</div>
            <div className="stat-content">
              <h3 className="stat-title">In Progress</h3>
              <p className="stat-value">{statusCounts.inprogress}</p>
            </div>
          </div>

          {/* Pending Card */}
          <div className="stat-card stat-card-info">
            <div className="stat-icon">📋</div>
            <div className="stat-content">
              <h3 className="stat-title">Pending</h3>
              <p className="stat-value">{statusCounts.todo}</p>
            </div>
          </div>
        </div>

        {/* Progress Bar Section */}
        <div className="progress-section">
          <div className="progress-header">
            <span className="progress-label">
              Completion Rate: {filteredTasks.length > 0 ? Math.round((statusCounts.done / filteredTasks.length) * 100) : 0}%
            </span>
          </div>
          <div className="progress-bar-container">
            <div 
              className="progress-bar-fill"
              style={{
                width: `${filteredTasks.length > 0 ? (statusCounts.done / filteredTasks.length) * 100 : 0}%`
              }}
            />
          </div>
        </div>

        {/* Overdue Tasks Alert */}
        {overdueCount > 0 && (
          <div className="overdue-alert">
            <span className="overdue-icon">🔴</span>
            <span className="overdue-text">Overdue Tasks: <strong>{overdueCount}</strong></span>
          </div>
        )}
      </section>

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
            className="button-dark button-dark-subtle"
            onClick={aiSuggest}
          >
            🤖 AI Suggest
          </button>
          <button className="button-dark button-dark-accent" onClick={createTask}>
            ➕ Add Task
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

            {filteredTasks
              .filter((task) => task.status === status)
              .map((task) => {
                const isAssignedToMe = task.assignedTo?.toLowerCase() === userEmail?.toLowerCase()
                return (
                  <article
                    key={task._id}
                    className="task-card"
                    style={{
                      ...styles.card,
                      border: isAssignedToMe ? '2px solid #22c55e' : `1px solid ${darkMode ? '#4b5563' : '#d1d5db'}`,
                      boxShadow: isAssignedToMe ? '0 0 0 2px rgba(34,197,94,0.15)' : styles.card.boxShadow,
                      transition: 'all 0.25s ease'
                    }}
                  >
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
                    <p>👤 Assigned to: {task.assignedTo || 'Unassigned'}</p>

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
                )
              })}
          </section>
        ))}
      </div>
    </div>
  )
}

export default Dashboard
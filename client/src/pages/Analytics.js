import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid, Cell } from 'recharts'
import { useTheme } from '../context/ThemeContext'
import './Analytics.css'

// Helper: derive summary statistics and overdue tasks
export function getTaskStats(tasks) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const overdueTasks = tasks.filter((task) => {
    if (!task.dueDate) return false
    const due = new Date(task.dueDate)
    due.setHours(0, 0, 0, 0)
    return due < today && task.status !== 'done'
  })

  return {
    total: tasks.length,
    completed: tasks.filter((task) => task.status === 'done').length,
    inprogress: tasks.filter((task) => task.status === 'inprogress').length,
    pending: tasks.filter((task) => task.status === 'todo').length,
    overdueCount: overdueTasks.length,
    overdueTasks
  }
}

// Helper: build priority bar chart data
export function getPriorityData(tasks) {
  const counts = { high: 0, medium: 0, low: 0 }
  tasks.forEach((task) => {
    if (task.priority && counts[task.priority] !== undefined) {
      counts[task.priority] += 1
    }
  })

  return [
    { priority: 'High', count: counts.high, fill: '#ef4444' },
    { priority: 'Medium', count: counts.medium, fill: '#f59e0b' },
    { priority: 'Low', count: counts.low, fill: '#10b981' }
  ]
}

// Helper: group tasks by created date for a line chart
export function getDailyTaskData(tasks) {
  const group = {}

  tasks.forEach((task) => {
    if (!task.createdAt) return
    const date = new Date(task.createdAt)
    date.setHours(0, 0, 0, 0)
    const key = date.toISOString().split('T')[0]
    group[key] = (group[key] || 0) + 1
  })

  return Object.keys(group)
    .sort()
    .map((dateKey) => ({
      date: formatDateLabel(dateKey),
      count: group[dateKey]
    }))
}

function formatDateLabel(dateKey) {
  const date = new Date(dateKey)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function Analytics() {
  const { darkMode, colors } = useTheme()
  const navigate = useNavigate()
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const token = localStorage.getItem('token')
  const headers = useMemo(() => ({ Authorization: `Bearer ${token}` }), [token])

  const fetchTasks = useCallback(async () => {
    if (!token) return
    setLoading(true)
    setError('')
    try {
      const response = await axios.get('http://localhost:5000/api/tasks', { headers })
      setTasks(response.data)
    } catch (err) {
      setError('Failed to load task analytics')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [headers, token])

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  useEffect(() => {
    const handleFocus = () => {
      fetchTasks()
    }
    window.addEventListener('focus', handleFocus)
    return () => window.removeEventListener('focus', handleFocus)
  }, [fetchTasks])

  const stats = useMemo(() => getTaskStats(tasks), [tasks])
  const completionRate = useMemo(
    () => (stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0),
    [stats]
  )
  const priorityData = useMemo(() => getPriorityData(tasks), [tasks])
  const dailyTaskData = useMemo(() => getDailyTaskData(tasks), [tasks])

  return (
    <div
      className="analytics-page"
      style={{
        minHeight: '100vh',
        background: colors.bg,
        color: colors.text,
        transition: 'all 0.3s ease'
      }}
    >
      <div className="analytics-shell">
        <header className="analytics-topbar" style={{ background: colors.header, color: colors.text }}>
          <div>
            <p className="analytics-eyebrow">TaskFlow Insights</p>
            <h1>Analytics Dashboard</h1>
            <p className="analytics-description">
              Visualize task progress, priority distribution, and overdue risk in one responsive dashboard.
            </p>
          </div>
          <button
            className="button-dark button-dark-subtle button-dark-sm"
            onClick={() => navigate('/dashboard')}
          >
            ← Back to Dashboard
          </button>
        </header>

        <section className="analytics-summary" style={{ borderColor: colors.border }}>
          <div className="summary-grid">
            <div className="summary-card" style={{ background: colors.card, borderColor: colors.border }}>
              <div className="summary-icon">📊</div>
              <div>
                <p className="summary-label">Total Tasks</p>
                <h2>{stats.total}</h2>
              </div>
            </div>
            <div className="summary-card" style={{ background: colors.card, borderColor: colors.border }}>
              <div className="summary-icon summary-icon-green">✅</div>
              <div>
                <p className="summary-label">Completed</p>
                <h2>{stats.completed}</h2>
              </div>
            </div>
            <div className="summary-card" style={{ background: colors.card, borderColor: colors.border }}>
              <div className="summary-icon summary-icon-yellow">⚡</div>
              <div>
                <p className="summary-label">In Progress</p>
                <h2>{stats.inprogress}</h2>
              </div>
            </div>
            <div className="summary-card" style={{ background: colors.card, borderColor: colors.border }}>
              <div className="summary-icon summary-icon-blue">📋</div>
              <div>
                <p className="summary-label">Pending</p>
                <h2>{stats.pending}</h2>
              </div>
            </div>
          </div>

          <div className="completion-section" style={{ background: colors.card, borderColor: colors.border }}>
            <div className="completion-header">
              <p className="completion-title">Completion Rate</p>
              <span className="completion-value">{completionRate}%</span>
            </div>
            <div className="progress-track">
              <div
                className="progress-fill"
                style={{ width: `${completionRate}%`, background: 'linear-gradient(90deg, #10b981, #059669)' }}
              />
            </div>
          </div>
        </section>

        <section className="analytics-charts">
          <div className="chart-card" style={{ background: colors.card, borderColor: colors.border }}>
            <div className="chart-header">
              <h2>Tasks by Priority</h2>
              <p>High, medium, and low priority task distribution.</p>
            </div>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={priorityData} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
                <XAxis dataKey="priority" stroke={colors.text} tick={{ fill: colors.text }} />
                <YAxis stroke={colors.text} tick={{ fill: colors.text }} allowDecimals={false} />
                <Tooltip
                  cursor={{ fill: 'rgba(148, 163, 184, 0.1)' }}
                  contentStyle={{ background: colors.card, borderRadius: 12, border: `1px solid ${colors.border}`, color: colors.text }}
                />
                <Bar dataKey="count" radius={[12, 12, 0, 0]}>
                  {priorityData.map((entry) => (
                    <Cell key={entry.priority} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card" style={{ background: colors.card, borderColor: colors.border }}>
            <div className="chart-header">
              <h2>Tasks Created Per Day</h2>
              <p>Task creation trend over time with a smooth line curve.</p>
            </div>
            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={dailyTaskData} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
                <XAxis dataKey="date" stroke={colors.text} tick={{ fill: colors.text }} />
                <YAxis stroke={colors.text} tick={{ fill: colors.text }} allowDecimals={false} />
                <Tooltip
                  cursor={{ stroke: '#4f46e5', strokeDasharray: '3 3' }}
                  contentStyle={{ background: colors.card, borderRadius: 12, border: `1px solid ${colors.border}`, color: colors.text }}
                />
                <Line type="monotone" dataKey="count" stroke="#4f46e5" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="overdue-section" style={{ background: colors.card, borderColor: colors.border }}>
          <div className="overdue-header">
            <div>
              <h2>Overdue Tasks</h2>
              <p>
                {stats.overdueCount > 0
                  ? `There are ${stats.overdueCount} overdue tasks waiting for attention.`
                  : 'No overdue tasks right now. Keep your workflow on track.'}
              </p>
            </div>
            <span className="overdue-badge">{stats.overdueCount}</span>
          </div>

          <div className="overdue-list">
            {stats.overdueTasks.length > 0 ? (
              stats.overdueTasks.map((task) => (
                <div key={task._id} className="overdue-item">
                  <span className="overdue-item-title">{task.title}</span>
                  <span className="overdue-item-date">{new Date(task.dueDate).toLocaleDateString()}</span>
                </div>
              ))
            ) : (
              <p className="overdue-empty">No overdue tasks at this moment.</p>
            )}
          </div>
        </section>

        {(loading || error) && (
          <div className="analytics-status" style={{ color: colors.text }}>
            {loading ? 'Loading analytics…' : error}
          </div>
        )}
      </div>
    </div>
  )
}

export default Analytics

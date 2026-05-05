# TaskFlow 🚀

> A modern, AI-powered task management SaaS application built with the MERN stack.

![TaskFlow Banner](https://img.shields.io/badge/TaskFlow-SaaS%20App-4f46e5?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb)
![Gemini AI](https://img.shields.io/badge/Gemini-AI-4285F4?style=for-the-badge&logo=google)

## 🌐 Live Demo

🔗 **Frontend:** [taskflow-saas.vercel.app](https://taskflow-saas-opal.vercel.app/)  
🔗 **Backend API:** [taskflow-server.onrender.com](https://taskflow-saas-rczc.onrender.com/)  
🔗 **GitHub:** [github.com/Bittu3487/taskflow-saas](https://github.com/Bittu3487/taskflow-saas)

---

## 📌 About The Project

TaskFlow is a full-stack SaaS task management application that helps teams organize, track, and complete tasks efficiently. It features AI-powered task suggestions, real-time Kanban board, team collaboration, and detailed analytics — all with a modern dark/light mode UI.

---

## ✨ Features

### 🔐 Authentication
- Secure user registration and login
- JWT-based authentication
- Protected routes

### 📋 Kanban Board
- Drag tasks across **Todo → In Progress → Done**
- Priority color indicators (High / Medium / Low)
- Real-time task updates

### 🤖 AI Task Suggestions
- Powered by **Google Gemini AI**
- Auto-generates task description from title
- Smart priority detection

### 🌙 Dark / Light Mode
- Smooth theme toggle
- Persistent across sessions

### 🔔 Due Date & Reminders
- Set deadlines on tasks
- Visual indicators: 🔴 Overdue / 🟡 Due Today / 🟢 Upcoming
- Reminder badge in header

### 👥 Team Collaboration
- Assign tasks to registered team members by email
- My Tasks / Assigned to Me / All Tasks filters
- Email validation against registered users

### 📊 Analytics Dashboard
- Total, Completed, Pending, In Progress task counts
- Completion rate progress bar
- Charts powered by **Recharts**
- Filter-aware statistics

### ⚙️ CI/CD Pipeline
- Automated testing on every push via **GitHub Actions**
- Auto-deployment to Vercel on merge to main

---

## 🛠️ Tech Stack

### Frontend
| Technology | Usage |
|---|---|
| React 18 | UI Framework |
| React Router DOM | Client-side routing |
| Axios | API calls |
| Recharts | Analytics charts |
| GitHub Copilot | AI-assisted development |

### Backend
| Technology | Usage |
|---|---|
| Node.js | Runtime |
| Express.js | Web framework |
| MongoDB Atlas | Database |
| Mongoose | ODM |
| JWT | Authentication |
| Bcryptjs | Password hashing |
| Google Gemini AI | AI suggestions |

### DevOps
| Technology | Usage |
|---|---|
| GitHub Actions | CI/CD Pipeline |
| Vercel | Frontend hosting |
| Render | Backend hosting |
| MongoDB Atlas | Cloud database |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Google Gemini API key

### Installation

```bash
# Clone the repository
git clone https://github.com/Bittu3487/taskflow-saas.git
cd taskflow-saas
```

### Backend Setup

```bash
cd server
npm install
```

Create `.env` file in `/server`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
```

```bash
node index.js
```

### Frontend Setup

```bash
cd client
npm install
```

Create `.env` file in `/client`:

```env
REACT_APP_API_URL=http://localhost:5000
```

```bash
npm start
```

---

## 📁 Project Structure

```
taskflow-saas/
├── .github/
│   └── workflows/
│       └── deploy.yml        # CI/CD Pipeline
├── client/                   # React Frontend
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Dashboard.js
│   │   │   └── Analytics.js
│   │   ├── context/
│   │   │   └── ThemeContext.js
│   │   └── App.js
│   └── package.json
├── server/                   # Node.js Backend
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── tasks.js
│   │   └── ai.js
│   ├── middleware/
│   │   └── auth.js
│   ├── index.js
│   └── package.json
└── README.md
```

---

## 🔌 API Endpoints

### Auth Routes
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |

### Task Routes
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/tasks` | Get all tasks |
| POST | `/api/tasks` | Create new task |
| PUT | `/api/tasks/:id` | Update task |
| DELETE | `/api/tasks/:id` | Delete task |

### AI Routes
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/ai/suggest` | Get AI task suggestion |

---

## ⚙️ CI/CD Pipeline

Every push to `main` branch:

```
Push Code → GitHub Actions Triggered
         → Install Dependencies
         → Build React App
         → Deploy to Vercel (Frontend)
         → Deploy to Render (Backend)
```

---

## 🎓 Built With GitHub Student Developer Pack

This project was built using tools from the **GitHub Student Developer Pack**:

- ✅ **GitHub Copilot** — AI-assisted code generation
- ✅ **GitHub Actions** — CI/CD automation
- ✅ **GitHub Codespaces** — Cloud development environment
- ✅ **Microsoft Azure** — Cloud services

---

## 👨‍💻 Developer

**Debashis Goswami**  
🎓 Final Year CSE Student — BCET, MAKAUT University  
🔗 [GitHub](https://github.com/Bittu3487) | [LinkedIn](https://linkedin.com/in/debashisgoswami/)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

⭐ **Star this repo if you found it helpful!**

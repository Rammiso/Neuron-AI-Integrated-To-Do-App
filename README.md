# 🚀 NEURON Tasks - Full Stack Task Management System

A production-ready, cyberpunk-inspired task management application with modern full-stack architecture, real-time data synchronization, and advanced security features.

![NEURON Tasks](https://img.shields.io/badge/version-1.0.0-00ff88?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb)
![License](https://img.shields.io/badge/license-MIT-00ff88?style=for-the-badge)

[![Security](https://img.shields.io/badge/Security-Hardened-green?style=flat-square)](#security)
[![Deployment](https://img.shields.io/badge/Deployment-Ready-blue?style=flat-square)](#deployment)
[![API](https://img.shields.io/badge/API-RESTful-orange?style=flat-square)](#api-endpoints)

## 📁 Project Structure

```
neuron-tasks/
├── frontend/          # React + Vite frontend application
│   ├── src/          # Source code
│   ├── public/       # Static assets
│   └── ...           # Configuration files
├── backend/           # Node.js + Express backend API
│   ├── config/       # Database configuration
│   ├── controllers/  # Business logic
│   ├── models/       # MongoDB schemas
│   ├── routes/       # API endpoints
│   ├── middlewares/  # Auth, validation, error handling
│   ├── utils/        # Helper functions
│   └── server.js     # Entry point
└── README.md         # This file
```

## 🎯 Features

### Frontend
- **Cyberpunk Design** - Futuristic UI with neon green aesthetics
- **Dual Theme** - Professional light mode and cyberpunk dark mode
- **Task Management** - Create, edit, organize, and track tasks
- **AI Assistant** - Natural language task creation interface
- **Calendar View** - Visual task scheduling
- **Profile System** - User profiles with stats and achievements
- **Animated Particles** - Moving background with neural connections
- **Fully Responsive** - Works on all devices

### Backend
- **RESTful API** - 15 production-ready endpoints
- **JWT Authentication** - Secure token-based auth
- **MongoDB Integration** - Optimized database with indexes
- **Advanced Filtering** - Filter tasks by date, priority, status
- **Security** - Rate limiting, CORS, Helmet, input validation
- **Error Handling** - Comprehensive error management
- **Documentation** - Complete API docs and Postman collection
- **Scalable Architecture** - Clean, modular, maintainable code

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MongoDB (local or Atlas)
- Git

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/neuron-tasks.git
cd neuron-tasks
```

### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
npm run seed  # Creates demo account
npm run dev   # Starts on port 5000
```

### 3. Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env
# Edit .env with your API URL
npm run dev   # Starts on port 5173
```

### 4. Access Application
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000

**New to the project?** Follow the setup instructions above!

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 18.2.0
- **Build Tool:** Vite 5.0.8
- **Styling:** Tailwind CSS 3.3.6
- **Animations:** Framer Motion 10.16.4
- **State Management:** Zustand 4.4.1
- **Routing:** React Router DOM 6.20.0
- **Icons:** Lucide React 0.294.0

### Backend
- **Runtime:** Node.js (latest stable)
- **Framework:** Express.js 4.18.2
- **Database:** MongoDB with Mongoose 8.0.3
- **Authentication:** JWT (jsonwebtoken 9.0.2)
- **Security:** bcryptjs, helmet, cors, rate-limit, mongo-sanitize
- **Validation:** Joi 17.11.0
- **Logging:** Morgan 1.10.0

## 🔒 Security

### Environment Variables
Create `.env` files from the provided examples:
- `backend/.env.example` - Backend configuration
- `frontend/.env.example` - Frontend configuration

### Security Features
- JWT authentication with bcrypt password hashing
- Input validation and sanitization
- CORS protection and rate limiting
- Secure headers with Helmet
- MongoDB injection prevention

## 🚀 Deployment

### Quick Deploy Options
- **Frontend:** Vercel, Netlify, GitHub Pages
- **Backend:** Railway, Heroku, Render
- **Database:** MongoDB Atlas (recommended)

### Environment Setup
1. Create production `.env` files
2. Generate strong JWT secrets (64+ characters)
3. Set up MongoDB Atlas or local MongoDB
4. Configure CORS for your domain

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile

### Tasks
- `GET /api/tasks` - Get all user tasks
- `POST /api/tasks` - Create new task
- `GET /api/tasks/:id` - Get specific task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Settings
- `GET /api/settings` - Get user settings
- `PUT /api/settings` - Update settings

## 🎨 Screenshots

### Dashboard
![Dashboard](https://via.placeholder.com/800x400/050a0a/00ff88?text=Dashboard+View)

### Calendar
![Calendar](https://via.placeholder.com/800x400/050a0a/00ff88?text=Calendar+View)

### AI Assistant
![AI Assistant](https://via.placeholder.com/800x400/050a0a/00ff88?text=AI+Assistant)

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Clone** your fork: `git clone https://github.com/yourusername/neuron-tasks.git`
3. **Create** a feature branch: `git checkout -b feature/amazing-feature`
4. **Make** your changes and test thoroughly
5. **Commit** with clear messages: `git commit -m 'Add amazing feature'`
6. **Push** to your fork: `git push origin feature/amazing-feature`
7. **Open** a Pull Request with detailed description

### Development Guidelines
- Follow existing code style
- Add tests for new features
- Update documentation
- Ensure security best practices
- Test on multiple browsers/devices

Please ensure your contributions follow the existing code style and include appropriate tests.

## 🛣️ Roadmap

### ✅ Completed (v1.0)
- Full-stack application (React + Node.js + MongoDB)
- User authentication & authorization
- Task CRUD operations with real-time sync
- Calendar integration
- Profile management with avatar selection
- Settings persistence
- Security hardening
- Production deployment ready
- Comprehensive documentation

### 🚧 In Progress (v1.1)
- [ ] Real-time notifications
- [ ] Task sharing & collaboration
- [ ] Advanced filtering & search
- [ ] Data export/import
- [ ] Mobile responsiveness improvements

### 🔮 Future (v2.0+)
- [ ] AI-powered task suggestions
- [ ] Mobile app (React Native)
- [ ] Team workspaces
- [ ] Advanced analytics
- [ ] Third-party integrations
- [ ] Offline support

## 🔒 License

This project is licensed under the MIT License - see the [LICENSE](./frontend/LICENSE) file for details.

## 👤 Developer

| | |
|---|---|
| **Name** | Musab Hassen |
| **Portfolio** | [themusab.tech](https://themusab.tech) |
| **GitHub** | [@Rammiso](https://github.com/Rammiso) |
| **Role** | Full Stack Developer |

## 🙏 Acknowledgments

- Design inspiration from cyberpunk aesthetics
- Icons by [Lucide](https://lucide.dev/)
- Fonts from [Google Fonts](https://fonts.google.com/)
- Built with [Vite](https://vitejs.dev/) and [React](https://react.dev/)

## 📧 Contact

**Developer:** Musab Hassen  
**Portfolio:** [themusab.tech](https://themusab.tech)  
**GitHub:** [github.com/Rammiso](https://github.com/Rammiso)  
**Project Link:** [Neuron-Futuristic-To-Do-App](https://github.com/Rammiso/Neuron-Futuristic-To-Do-App)

---

<div align="center">
  <p>Made with ❤️ and ⚡ by <a href="https://themusab.tech"><strong>Musab Hassen</strong></a></p>
  <p>NEURON Tasks © 2026</p>
</div>

# 🌍 Darukaa.Earth — Geospatial Data Analytics Platform

Darukaa.Earth is a full-stack geospatial dashboard built for managing and visualizing **carbon** and **biodiversity** projects.  
It allows administrators to create projects, add multiple geographical sites, and track site performance through interactive maps and analytics.

---

## 🚀 Core User Stories

- As an administrator, I want to create a new project and add multiple geographical sites to it.
- As an administrator, I want to view all projects and sites on an interactive map.
- As an administrator, I want to click on a specific site to view detailed analytics and performance over time.

---

## ✨ Key Features

### 🔐 User Authentication
- User registration and login system  
- Secure password handling

### 📌 Project Management Dashboard
- Create and manage projects
- View all projects in a structured dashboard

### 🗺️ Geospatial Site Creation
- Add new sites by **drawing polygons on the map**
- Store and manage geo-features linked to projects

### 📊 Data Visualization & Analytics
- Interactive charts and visual insights
- Performance tracking over time for each site

### ✅ Automated Code Quality Checks
- Built-in tooling support for automated code quality checks
- Helps maintain stability and clean development workflow

---

## 🧱 Database Tables

The platform uses the following core tables:

### 👤 Users
Stores authentication and user profile data.
- `id`
- `username`
- `email`
- `hashed_password`

### 📁 Projects
Stores carbon/biodiversity projects created by users.
- `id`
- `name`
- `description`
- `owner_id` *(linked to Users)*

### 📍 Sites
Stores geographical sites belonging to projects.
- `id`
- `site_id` *(unique)*
- `project_id` *(linked to Projects)*
- `name`
- `feature` *(GeoJSON polygon data)*
- `created_at`

---

## 🛠 Tech Stack

### Frontend
- React + Vite
- Interactive Map (Polygon drawing)
- Charts / Data Visualization UI

### Backend
- FastAPI (Python)
- SQLAlchemy ORM
- PostgreSQL

---

## 📦 Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/nimisha-negi/Darukaa.git
cd Darukaa
````
## ⚙️ Backend Setup (FastAPI)
### 2️⃣ Go to backend folder
```bash
cd backend
```
### 3️⃣ Create & activate virtual environment
```bash
python -m venv venv
```
Windows:
```bash
venv\Scripts\activate
```
### 4️⃣ Install dependencies
```bash
pip install -r requirements.txt
```
### 5️⃣ Run backend server
```bash
uvicorn app.main:app --reload
```

### Backend will run at:
👉 http://localhost:8000


## 🎨 Frontend Setup (React + Vite)
### 6️⃣ Go to frontend folder
```bash
cd ../frontend
```
### 7️⃣ Install dependencies
```bash
npm install
```

### 8️⃣ Start frontend server
```bash
npm run dev
```
### Frontend will run at:
👉 http://localhost:5173

## 📄 License
This project is created for learning/academic purposes and is not licensed for commercial use.

## 📩 Contact
For questions, suggestions, or issues:
- Open an issue on this repository
- GitHub: **Nimisha Negi**



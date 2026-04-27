import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  return (
    <div className="app-shell container py-4 py-lg-5">
      <div className="d-flex flex-column flex-lg-row align-items-lg-center justify-content-between mb-4 gap-2">
        <div className="d-flex align-items-center gap-3">
          <img src="/octofitapp-small.png" alt="OctoFit logo" className="app-logo" />
          <h1 className="app-title display-6 mb-0">OctoFit Tracker</h1>
        </div>
        <a
          className="link-primary fw-semibold text-decoration-none"
          href="https://react.dev"
          target="_blank"
          rel="noreferrer"
        >
          React + Django REST Demo
        </a>
      </div>

      <nav className="octo-navbar navbar navbar-expand-lg bg-white rounded px-3 mb-4">
        <ul className="navbar-nav nav-pills gap-2">
          <li className="nav-item">
            <NavLink className="nav-link" to="/users">Users</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/teams">Teams</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/activities">Activities</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/leaderboard">Leaderboard</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/workouts">Workouts</NavLink>
          </li>
        </ul>
      </nav>

      <section className="octo-card card border-0 rounded-4">
        <div className="card-body p-3 p-lg-4">
          <Routes>
            <Route path="/" element={<Navigate to="/users" replace />} />
            <Route path="/users" element={<Users />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </div>
      </section>
    </div>
  );
}

export default App;

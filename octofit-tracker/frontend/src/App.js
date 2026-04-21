import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import logo from './octofitapp-small.png';
import './App.css';

const navItems = [
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/teams', label: 'Teams' },
  { to: '/users', label: 'Users' },
  { to: '/workouts', label: 'Workouts' },
];

const featureCards = [
  { icon: '🏃', title: 'Activities', text: 'Log and track your workouts and daily fitness activities.', link: '/activities' },
  { icon: '🏆', title: 'Leaderboard', text: 'See where you rank against teammates and friends.', link: '/leaderboard' },
  { icon: '👥', title: 'Teams', text: 'Create or join teams and train together.', link: '/teams' },
  { icon: '👤', title: 'Users', text: 'Manage your profile and discover other athletes.', link: '/users' },
  { icon: '💪', title: 'Workouts', text: 'Browse personalized workout suggestions.', link: '/workouts' },
];

function Welcome() {
  return (
    <div className="text-center py-5">
      <img src={logo} alt="Octofit Logo" style={{ height: 96, marginBottom: 16 }} />
      <h1 className="display-4 fw-bold mb-2">Welcome to Octofit Tracker</h1>
      <p className="lead text-muted mb-5">Your all-in-one fitness companion — track activities, compete with teams, and crush your goals.</p>
      <div className="row row-cols-1 row-cols-md-3 g-4 justify-content-center">
        {featureCards.map(card => (
          <div className="col" key={card.title}>
            <div className="card h-100 shadow-sm feature-card">
              <div className="card-body d-flex flex-column align-items-center text-center p-4">
                <div className="feature-icon mb-3">{card.icon}</div>
                <h5 className="card-title fw-bold">{card.title}</h5>
                <p className="card-text text-muted flex-grow-1">{card.text}</p>
                <NavLink to={card.link} className="btn btn-primary mt-3">
                  View {card.title}
                </NavLink>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark mb-4">
        <div className="container">
          <NavLink className="navbar-brand d-flex align-items-center gap-2" to="/">
            <img src={logo} alt="Octofit Logo" className="octofit-logo" />
            <span className="fw-bold fs-4">Octofit Tracker</span>
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {navItems.map(item => (
                <li className="nav-item" key={item.to}>
                  <NavLink
                    className={({ isActive }) => 'nav-link px-3' + (isActive ? ' active fw-bold' : '')}
                    to={item.to}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      <div className="container pb-5">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

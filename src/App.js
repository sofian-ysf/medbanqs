// src/App.js
import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Pages/Navbar';
import LandingPage from './components/Pages/LandingPage';
import HomePage from './components/Pages/HomePage';
import ProfilePage from './components/Pages/ProfilePage';
import Login from './components/Pages/Login';
import Signup from './components/Pages/Signup';
import Questions from './components/Pages/QuestionsPage';
import DebugCollections from './components/Pages/DebugCollections';
import ManageAccount from './components/Pages/ManageAccount';
import PerformanceAnalytics from './components/Pages/PerformanceAnalytics';


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/questions" element={<Questions />} />
          <Route path="/debug" element={<DebugCollections />} />
          <Route path="/manage-account" element={<ManageAccount />} />
          <Route path="/analytics" element={<PerformanceAnalytics />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

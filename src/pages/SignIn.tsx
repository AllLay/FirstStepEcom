'use client'

import { useState } from "react";
import './SignIn.css';

function SignIn() {
  const [authMode, setAuthMode] = useState('login');

  return (
    <main
      className="signin-main"
      style={{
        backgroundImage: 'url("/img/background/SignIn-BG.png")',
      }}
    >
      <div className="signin-card">
        <div>
          <h2 className="signin-title">
            {authMode === 'login' ? 'Login' : 'Register'}
          </h2>
        </div>
        <form className="signin-form">
          {authMode === 'register' && (
            <div>
              <label htmlFor="name" className="signin-label">Name</label>
              <input
                type="text"
                id="name"
                className="signin-input"
                placeholder="Ko Ko Chaw"
                required
              />
            </div>
          )}
          <div>
            <label htmlFor="email" className="signin-label">Email</label>
            <input
              type="email"
              id="email"
              className="signin-input"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="signin-label">Password</label>
            <input
              type="password"
              id="password"
              className="signin-input"
              placeholder="••••••••"
              required
            />
          </div>
          {authMode === 'register' && (
            <div>
              <label htmlFor="confirm-password" className="signin-label">Confirm Password</label>
              <input
                type="password"
                id="confirm-password"
                className="signin-input"
                placeholder="••••••••"
                required
              />
            </div>
          )}
          <button type="submit" className="signin-button">
            {authMode === 'login' ? 'Login' : 'Register'}
          </button>
        </form>
        <div className="signin-toggle">
          {authMode === 'login' ? (
            <div className="signin-toggle-row">
              <p>Don't have an account?</p>
              <button onClick={() => setAuthMode('register')} className="signin-toggle-btn">Register</button>
            </div>
          ) : (
            <div className="signin-toggle-row">
              <p>Already have an account?</p>
              <button onClick={() => setAuthMode('login')} className="signin-toggle-btn">Login</button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default SignIn;

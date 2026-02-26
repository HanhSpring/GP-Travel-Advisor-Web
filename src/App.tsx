import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app">
      <header className="app-header">
        <h1>🌍 Travel Advisor</h1>
        <p>Admin & Local Service Provider Portal</p>
      </header>
      
      <main className="app-main">
        <div className="card">
          <h2>Welcome to Travel Advisor Web</h2>
          <p>This is the admin and provider management portal.</p>
          
          <button onClick={() => setCount((count) => count + 1)}>
            Count is {count}
          </button>
          
          <div className="modules">
            <div className="module-card">
              <h3>👤 Admin Module</h3>
              <p>Manage users, destinations, and system settings</p>
            </div>
            <div className="module-card">
              <h3>🏨 Provider Module</h3>
              <p>Manage local services and bookings</p>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="app-footer">
        <p>Built with React + TypeScript + Vite</p>
      </footer>
    </div>
  )
}

export default App

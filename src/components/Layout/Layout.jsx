import { Link } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import './Layout.css'

function Layout({ children }) {
  const { isAuthenticated, logout, user } = useAuthStore()

  return (
    <div className="layout">
      <header className="layout-header">
        <div className="container">
          <div className="layout-header-content">
            <Link to="/" className="layout-logo">
              MAAF Starter
            </Link>
            <nav className="layout-nav">
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard">Dashboard</Link>
                  <span className="layout-user">{user?.email || 'User'}</span>
                  <button onClick={logout} className="btn btn-sm">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login">Login</Link>
                  <Link to="/register">Register</Link>
                </>
              )}
            </nav>
          </div>
        </div>
      </header>
      <main className="layout-main">
        <div className="container">
          {children}
        </div>
      </main>
      <footer className="layout-footer">
        <div className="container">
          <p>&copy; 2024 MAAF Starter Web</p>
        </div>
      </footer>
    </div>
  )
}

export default Layout

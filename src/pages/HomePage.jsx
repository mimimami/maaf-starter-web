import { Link } from 'react-router-dom'
import Button from '../components/Button/Button'
import Card from '../components/Card/Card'
import { useAuthStore } from '../store/authStore'
import './HomePage.css'

function HomePage() {
  const { isAuthenticated } = useAuthStore()

  return (
    <div className="home-page">
      <section className="hero">
        <h1>Welcome to MAAF Starter Web</h1>
        <p className="hero-subtitle">
          React/Vite alapú frontend skeleton moduláris UI komponensekkel
        </p>
        {!isAuthenticated && (
          <div className="hero-actions">
            <Link to="/register">
              <Button size="lg">Get Started</Button>
            </Link>
            <Link to="/login">
              <Button variant="secondary" size="lg">
                Login
              </Button>
            </Link>
          </div>
        )}
      </section>

      <section className="features">
        <h2>Features</h2>
        <div className="features-grid">
          <Card title="Moduláris UI">
            <p>Moduláris UI komponensek könnyű újrafelhasználhatósághoz</p>
          </Card>
          <Card title="React + Vite">
            <p>Gyors fejlesztési élmény React és Vite kombinációjával</p>
          </Card>
          <Card title="API Integráció">
            <p>Kész API integráció a MAAF backend-del</p>
          </Card>
        </div>
      </section>
    </div>
  )
}

export default HomePage

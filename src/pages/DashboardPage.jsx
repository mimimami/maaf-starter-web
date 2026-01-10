import { useEffect } from 'react'
import { useAuthStore } from '../store/authStore'
import Card from '../components/Card/Card'
import Button from '../components/Button/Button'
import './DashboardPage.css'

function DashboardPage() {
  const { user, fetchUser, loading } = useAuthStore()

  useEffect(() => {
    if (!user) {
      fetchUser()
    }
  }, [user, fetchUser])

  if (loading) {
    return <div className="dashboard-loading">Loading...</div>
  }

  return (
    <div className="dashboard-page">
      <h1>Dashboard</h1>
      <Card title="Welcome">
        <p>Hello, {user?.email || 'User'}!</p>
        <p>This is your dashboard.</p>
      </Card>
    </div>
  )
}

export default DashboardPage

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import Card from '../../components/Card/Card'
import './Auth.css'

function RegisterPage() {
  const navigate = useNavigate()
  const { register, loading, error } = useAuthStore()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  })
  const [formErrors, setFormErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setFormErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const errors = {}
    if (!formData.name) errors.name = 'Name is required'
    if (!formData.email) errors.email = 'Email is required'
    if (!formData.password) errors.password = 'Password is required'
    if (formData.password !== formData.passwordConfirm) {
      errors.passwordConfirm = 'Passwords do not match'
    }
    return errors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errors = validate()
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    const result = await register({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    })

    if (result.success) {
      navigate('/login')
    }
  }

  return (
    <div className="auth-page">
      <Card title="Register" className="auth-card">
        <form onSubmit={handleSubmit}>
          {error && <div className="auth-error">{error}</div>}
          
          <Input
            label="Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            error={formErrors.name}
            required
          />

          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            error={formErrors.email}
            required
          />

          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            error={formErrors.password}
            required
          />

          <Input
            label="Confirm Password"
            type="password"
            name="passwordConfirm"
            value={formData.passwordConfirm}
            onChange={handleChange}
            placeholder="Confirm your password"
            error={formErrors.passwordConfirm}
            required
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={loading}
            className="auth-submit"
          >
            {loading ? 'Registering...' : 'Register'}
          </Button>
        </form>
      </Card>
    </div>
  )
}

export default RegisterPage

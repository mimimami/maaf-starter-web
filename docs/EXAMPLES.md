# MAAF Starter Web Példák

## Komponens Használat

### Button Komponens

```jsx
import Button from '@components/Button/Button'

// Primary button
<Button variant="primary" onClick={handleClick}>
  Primary Button
</Button>

// Secondary button
<Button variant="secondary" size="lg">
  Large Secondary Button
</Button>

// Disabled button
<Button variant="primary" disabled>
  Disabled Button
</Button>
```

### Input Komponens

```jsx
import Input from '@components/Input/Input'
import { useState } from 'react'

function MyForm() {
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState({})

  return (
    <Input
      label="Email"
      type="email"
      name="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="Enter your email"
      error={errors.email}
      required
    />
  )
}
```

### Card Komponens

```jsx
import Card from '@components/Card/Card'

<Card title="User Profile">
  <p>Name: John Doe</p>
  <p>Email: john@example.com</p>
</Card>
```

## API Használat

### Custom API Endpoint

```jsx
// src/api/users.js
import apiClient from './client'

export const usersApi = {
  list: async () => {
    const response = await apiClient.get('/users')
    return response.data
  },

  show: async (id) => {
    const response = await apiClient.get(`/users/${id}`)
    return response.data
  },

  create: async (data) => {
    const response = await apiClient.post('/users', data)
    return response.data
  },

  update: async (id, data) => {
    const response = await apiClient.put(`/users/${id}`, data)
    return response.data
  },

  delete: async (id) => {
    const response = await apiClient.delete(`/users/${id}`)
    return response.data
  },
}
```

### API Használat Komponensben

```jsx
import { useState, useEffect } from 'react'
import { usersApi } from '@api/users'

function UsersPage() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await usersApi.list()
        setUsers(data.users)
      } catch (error) {
        console.error('Error fetching users:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  if (loading) return <div>Loading...</div>

  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  )
}
```

## State Management

### Új Store Létrehozása

```jsx
// src/store/usersStore.js
import { create } from 'zustand'
import { usersApi } from '../api/users'

export const useUsersStore = create((set) => ({
  users: [],
  loading: false,
  error: null,

  fetchUsers: async () => {
    set({ loading: true, error: null })
    try {
      const data = await usersApi.list()
      set({ users: data.users, loading: false })
    } catch (error) {
      set({ loading: false, error: error.message })
    }
  },

  addUser: async (userData) => {
    set({ loading: true })
    try {
      const data = await usersApi.create(userData)
      set((state) => ({
        users: [...state.users, data.user],
        loading: false,
      }))
    } catch (error) {
      set({ loading: false, error: error.message })
    }
  },
}))
```

### Store Használata

```jsx
import { useUsersStore } from '@store/usersStore'

function UsersPage() {
  const { users, loading, fetchUsers } = useUsersStore()

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  if (loading) return <div>Loading...</div>

  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  )
}
```

## Form Kezelés

### Form Validációval

```jsx
import { useState } from 'react'
import Input from '@components/Input/Input'
import Button from '@components/Button/Button'

function UserForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  })
  const [errors, setErrors] = useState({})

  const validate = () => {
    const newErrors = {}
    if (!formData.name) newErrors.name = 'Name is required'
    if (!formData.email) newErrors.email = 'Email is required'
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    // Submit form
    console.log('Submitting:', formData)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
        required
      />
      <Input
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        required
      />
      <Button type="submit">Submit</Button>
    </form>
  )
}
```

## Protected Routes

### Protected Route Használata

```jsx
import ProtectedRoute from '@components/ProtectedRoute/ProtectedRoute'

<Route
  path="/admin"
  element={
    <ProtectedRoute>
      <AdminPage />
    </ProtectedRoute>
  }
/>
```

### Role-based Protection

```jsx
// src/components/RoleProtectedRoute/RoleProtectedRoute.jsx
import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

function RoleProtectedRoute({ children, allowedRoles }) {
  const { user, isAuthenticated } = useAuthStore()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (!allowedRoles.includes(user?.role)) {
    return <Navigate to="/dashboard" replace />
  }

  return children
}

export default RoleProtectedRoute
```

## Custom Hook

### useApi Hook

```jsx
// src/hooks/useApi.js
import { useState, useEffect } from 'react'

function useApi(apiFunction, dependencies = []) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const result = await apiFunction()
        setData(result)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, dependencies)

  return { data, loading, error }
}

export default useApi
```

### Hook Használata

```jsx
import useApi from '@hooks/useApi'
import { usersApi } from '@api/users'

function UsersPage() {
  const { data, loading, error } = useApi(usersApi.list)

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      {data?.users?.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  )
}
```

## Teljes Példa: Users CRUD

```jsx
import { useState, useEffect } from 'react'
import { usersApi } from '@api/users'
import Card from '@components/Card/Card'
import Button from '@components/Button/Button'
import Input from '@components/Input/Input'

function UsersPage() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingUser, setEditingUser] = useState(null)
  const [formData, setFormData] = useState({ name: '', email: '' })

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const data = await usersApi.list()
      setUsers(data.users)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async (e) => {
    e.preventDefault()
    try {
      await usersApi.create(formData)
      setFormData({ name: '', email: '' })
      fetchUsers()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure?')) return
    try {
      await usersApi.delete(id)
      fetchUsers()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <Card title="Create User">
        <form onSubmit={handleCreate}>
          <Input
            label="Name"
            name="name"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            required
          />
          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
          <Button type="submit">Create</Button>
        </form>
      </Card>

      <Card title="Users">
        {users.map((user) => (
          <div key={user.id}>
            <p>{user.name} - {user.email}</p>
            <Button
              variant="danger"
              size="sm"
              onClick={() => handleDelete(user.id)}
            >
              Delete
            </Button>
          </div>
        ))}
      </Card>
    </div>
  )
}

export default UsersPage
```

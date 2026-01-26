import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    animalName: '',
    species: '',
    age: '',
    description: '',
    ownerName: '',
    email: '',
    phone: '',
    address: ''
  })
  const [animals, setAnimals] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState({})

  const API_URL = 'http://localhost:5000/api'

  const validateForm = () => {
    const newErrors = {}

    // Walidacja imienia zwierzęcia
    if (!formData.animalName.trim()) {
      newErrors.animalName = 'Imię zwierzęcia jest wymagane'
    } else if (formData.animalName.length < 2) {
      newErrors.animalName = 'Imię musi mieć co najmniej 2 znaki'
    } else if (formData.animalName.length > 50) {
      newErrors.animalName = 'Imię może mieć maksymalnie 50 znaków'
    }

    // Walidacja gatunku
    if (!formData.species.trim()) {
      newErrors.species = 'Gatunek jest wymagany'
    } else if (formData.species.length < 2) {
      newErrors.species = 'Gatunek musi mieć co najmniej 2 znaki'
    }

    // Walidacja wieku
    const age = parseInt(formData.age)
    if (!formData.age) {
      newErrors.age = 'Wiek jest wymagany'
    } else if (isNaN(age) || age < 0) {
      newErrors.age = 'Wiek musi być liczbą dodatnią'
    } else if (age > 100) {
      newErrors.age = 'Wiek nie może przekraczać 100 lat'
    }

    // Walidacja opisu
    if (formData.description && formData.description.length > 500) {
      newErrors.description = 'Opis może mieć maksymalnie 500 znaków'
    }

    // Walidacja imienia właściciela
    if (!formData.ownerName.trim()) {
      newErrors.ownerName = 'Imię właściciela jest wymagane'
    } else if (formData.ownerName.length < 2) {
      newErrors.ownerName = 'Imię musi mieć co najmniej 2 znaki'
    } else if (formData.ownerName.length > 100) {
      newErrors.ownerName = 'Imię może mieć maksymalnie 100 znaków'
    }

    // Walidacja email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = 'Email jest wymagany'
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Nieprawidłowy format email'
    }

    // Walidacja telefonu (opcjonalne, ale jeśli podane to format)
    if (formData.phone) {
      const phoneRegex = /^[0-9\s\-\+\(\)]{9,20}$/
      if (!phoneRegex.test(formData.phone)) {
        newErrors.phone = 'Nieprawidłowy format telefonu (9-20 cyfr)'
      }
    }

    // Walidacja adresu
    if (formData.address && formData.address.length > 200) {
      newErrors.address = 'Adres może mieć maksymalnie 200 znaków'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [animalsRes, usersRes] = await Promise.all([
        fetch(`${API_URL}/animals`),
        fetch(`${API_URL}/users`)
      ])

      if (animalsRes.ok) {
        const data = await animalsRes.json()
        setAnimals(data.data || [])
      }

      if (usersRes.ok) {
        const data = await usersRes.json()
        setUsers(data.data || [])
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const initSchema = async () => {
    if (!confirm('Zainicjować schemat bazy danych? (usunie istniejące dane)')) return

    setLoading(true)
    try {
      const response = await fetch(`${API_URL}/init-schema`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      })
      const data = await response.json()
      
      if (data.success) {
        setMessage('✓ Schemat utworzony!')
        fetchData()
      } else {
        setMessage('✗ Błąd: ' + data.error)
      }
    } catch (error) {
      setMessage('✗ Błąd połączenia')
    } finally {
      setLoading(false)
      setTimeout(() => setMessage(''), 3000)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Usuwanie błędu dla pola podczas edycji
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    
    // Walidacja formularza
    if (!validateForm()) {
      setMessage('✗ Popraw błędy w formularzu')
      setTimeout(() => setMessage(''), 3000)
      return
    }
    
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const response = await fetch(`${API_URL}/add-animal-with-owner`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      const data = await response.json()
      
      if (data.success) {
        setMessage('✓ Zwierzak i właściciel dodani!')
        setFormData({
          animalName: '', species: '', age: '', description: '',
          ownerName: '', email: '', phone: '', address: ''
        })
        fetchData()
      } else {
        setMessage('✗ Błąd: ' + data.error)
      }
    } catch (error) {
      setMessage('✗ Błąd połączenia')
    } finally {
      setLoading(false)
      setTimeout(() => setMessage(''), 3000)
    }
  }

  return (
    <div className="app">
      <header>
        <h1>🐾 Zwierzęta i Właściciele</h1>
        <button onClick={initSchema} disabled={loading} className="init-btn">
          Inicjalizuj bazę
        </button>
      </header>

      {message && <div className={`message ${message.includes('✓') ? 'success' : 'error'}`}>{message}</div>}

      <div className="content">
        <section className="form-section">
          <h2>Dodaj zwierzaka z właścicielem</h2>
          <form onSubmit={handleSubmit}>
            <fieldset>
              <legend>Dane zwierzęcia</legend>
              <div>
                <input
                  type="text"
                  name="animalName"
                  placeholder="Imię zwierzęcia *"
                  value={formData.animalName}
                  onChange={handleChange}
                  className={errors.animalName ? 'error' : ''}
                  required
                />
                {errors.animalName && <span className="error-msg">{errors.animalName}</span>}
              </div>
              <div>
                <input
                  type="text"
                  name="species"
                  placeholder="Gatunek (np. Pies, Kot) *"
                  value={formData.species}
                  onChange={handleChange}
                  className={errors.species ? 'error' : ''}
                  required
                />
                {errors.species && <span className="error-msg">{errors.species}</span>}
              </div>
              <div>
                <input
                  type="number"
                  name="age"
                  placeholder="Wiek *"
                  value={formData.age}
                  onChange={handleChange}
                  className={errors.age ? 'error' : ''}
                  required
                  min="0"
                  max="100"
                />
                {errors.age && <span className="error-msg">{errors.age}</span>}
              </div>
              <div>
                <textarea
                  name="description"
                  placeholder="Opis zwierzęcia (opcjonalny, max 500 znaków)"
                  value={formData.description}
                  onChange={handleChange}
                  className={errors.description ? 'error' : ''}
                  rows="3"
                  maxLength="500"
                />
                {errors.description && <span className="error-msg">{errors.description}</span>}
              </div>
            </fieldset>

            <fieldset>
              <legend>Dane właściciela</legend>
              <div>
                <input
                  type="text"
                  name="ownerName"
                  placeholder="Imię właściciela *"
                  value={formData.ownerName}
                  onChange={handleChange}
                  className={errors.ownerName ? 'error' : ''}
                  required
                />
                {errors.ownerName && <span className="error-msg">{errors.ownerName}</span>}
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email *"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'error' : ''}
                  required
                />
                {errors.email && <span className="error-msg">{errors.email}</span>}
              </div>
              <div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Telefon (opcjonalny, np. 123-456-789)"
                  value={formData.phone}
                  onChange={handleChange}
                  className={errors.phone ? 'error' : ''}
                />
                {errors.phone && <span className="error-msg">{errors.phone}</span>}
              </div>
              <div>
                <input
                  type="text"
                  name="address"
                  placeholder="Adres (opcjonalny)"
                  value={formData.address}
                  onChange={handleChange}
                  className={errors.address ? 'error' : ''}
                  maxLength="200"
                />
                {errors.address && <span className="error-msg">{errors.address}</span>}
              </div>
            </fieldset>

            <button type="submit" disabled={loading}>
              {loading ? 'Dodawanie...' : 'Dodaj'}
            </button>
          </form>
        </section>

        <section className="tables">
          <div className="table-container">
            <h2>Zwierzęta ({animals.length})</h2>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Imię</th>
                    <th>Gatunek</th>
                    <th>Wiek</th>
                    <th>Opis</th>
                    <th>Właściciel</th>
                  </tr>
                </thead>
                <tbody>
                  {animals.map(a => (
                    <tr key={a.id}>
                      <td>{a.id}</td>
                      <td><strong>{a.name}</strong></td>
                      <td>{a.species}</td>
                      <td>{a.age}</td>
                      <td>{a.description}</td>
                      <td>{a.owner_name}</td>
                    </tr>
                  ))}
                  {animals.length === 0 && (
                    <tr><td colSpan="6" style={{textAlign: 'center', color: '#999'}}>Brak danych</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="table-container">
            <h2>Właściciele ({users.length})</h2>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Imię</th>
                    <th>Email</th>
                    <th>Telefon</th>
                    <th>Adres</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u.id}>
                      <td>{u.id}</td>
                      <td><strong>{u.name}</strong></td>
                      <td>{u.email}</td>
                      <td>{u.phone}</td>
                      <td>{u.address}</td>
                    </tr>
                  ))}
                  {users.length === 0 && (
                    <tr><td colSpan="5" style={{textAlign: 'center', color: '#999'}}>Brak danych</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default App

import { useState } from 'react'
import styles from './BookingForm.module.css'

const initialState = {
  name: '',
  phone: '',
  email: '',
}

export default function BookingForm({ onSubmit, disabled }) {
  const [form, setForm] = useState(initialState)
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = 'Вкажіть ім’я'
    if (!form.phone.trim()) next.phone = 'Вкажіть телефон'
    if (!form.email.trim()) next.email = 'Вкажіть email'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Неправильний email'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!validate()) {
      return
    }
    const success = onSubmit(form)
    if (success) {
      setMessage('Дані надіслано, бронювання збережено.')
      setForm(initialState)
      setErrors({})
    } else {
      setMessage('Оберіть місце перед бронюванням.')
    }
  }

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }))
  }

  return (
    <div className={styles.formCard}>
      <h3>Форма бронювання</h3>
      <form onSubmit={handleSubmit} noValidate>
        <label>
          Ім’я
          <input value={form.name} onChange={handleChange('name')} />
          {errors.name && <span className={styles.error}>{errors.name}</span>}
        </label>

        <label>
          Телефон
          <input value={form.phone} onChange={handleChange('phone')} />
          {errors.phone && <span className={styles.error}>{errors.phone}</span>}
        </label>

        <label>
          Email
          <input value={form.email} onChange={handleChange('email')} />
          {errors.email && <span className={styles.error}>{errors.email}</span>}
        </label>

        <button type="submit" className={styles.submit} disabled={disabled}>
          Підтвердити бронювання
        </button>
        {message && <p className={styles.message}>{message}</p>}
      </form>
    </div>
  )
}

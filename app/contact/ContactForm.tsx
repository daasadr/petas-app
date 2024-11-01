'use client'

import { useState } from 'react'
import styles from '../../styles/Contact.module.css'

interface ContactFormProps {
  contactFormFields: Array<{
    _type: 'object'
    label: string
    id: string
    type: 'text' | 'email'
  }>
}

export default function ContactForm({ contactFormFields }: ContactFormProps) {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('Odesílání...')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, message }),
      })

      if (response.ok) {
        setStatus('Zpráva byla úspěšně odeslána!')
        setEmail('')
        setMessage('')
      } else {
        setStatus('Při odesílání zprávy došlo k chybě. Zkuste to prosím znovu.')
      }
    } catch (error) {
      setStatus('Při odesílání zprávy došlo k chybě. Zkuste to prosím znovu.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {contactFormFields.map((field) => (
        <div key={field.id} className={styles.formGroup}>
          <label htmlFor={field.id} className={styles.formLabel}>
            {field.label}
          </label>
          <input
            className={styles.formInput}
            type={field.type}
            id={field.id}
            name={field.id}
            value={field.type === 'email' ? email : message}
            onChange={(e) =>
              field.type === 'email' ? setEmail(e.target.value) : setMessage(e.target.value)
            }
            required
          />
        </div>
      ))}
      <button type="submit" className={styles.submitButton}>
        Odeslat
      </button>
      {status && <p className={styles.statusMessage}>{status}</p>}
    </form>
  )
}
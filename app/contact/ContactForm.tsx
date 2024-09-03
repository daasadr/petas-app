'use client'

import { useState } from 'react'

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
    <form onSubmit={handleSubmit} className="space-y-4">
      {contactFormFields.map((field) => (
        <div key={field.id}className="flex flex-col">
          <label htmlFor={field.id} className="text-orange-500 mb-1">{field.label}</label>
          <input
           className="bg-gray-800 text-white border border-orange-500 p-2 rounded"
            type={field.type}
            id={field.id}
            name={field.id}
            value={field.type === 'email' ? email : message}
            onChange={(e) => field.type === 'email' ? setEmail(e.target.value) : setMessage(e.target.value)}
            required
          />
        </div>
      ))}
      <button type="submit" className="bg-orange-500 text-black py-2 px-4 rounded hover:bg-orange-600 transition-colors">Odeslat</button>
      {status && <p className="text-orange-500 mt-4">{status}</p>}
    </form>
  )
}
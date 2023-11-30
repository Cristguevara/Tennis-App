'use client'

import { useContext } from 'react'
import { FormContext } from '..'
import styles from './styles.module.css'


export function Input ({ label, name, placeholder, type }) {
  const { formValues, setFormValues } = useContext(FormContext)

  const handleChange = (event) => {
    const { value } = event.target
    setFormValues(prevValues => ({
      ...prevValues,
      [name]: value
    }))
  }

  return (
    <div className={styles.inputContainer}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={formValues[name] || ''}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </div>
  )
}

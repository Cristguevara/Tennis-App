'use client'

import { Footer, Input, SubmitButton } from './components'
import { createContext, useState } from 'react'
import styles from './styles.module.css'




export const FormContext = createContext(undefined)

export function Form ({ title, children, onSubmit, description }) {
  const [formValues, setFormValues] = useState({})

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit(formValues)
  }

  return (
    <FormContext.Provider value={{ formValues, setFormValues }}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.descriptionContainer}>
          <h2>{title}</h2>
          {description && <p>{description}</p>}
        </div>
        {children}
      </form>
    </FormContext.Provider>
  )
}

Form.Input = Input
Form.Footer = Footer
Form.SubmitButton = SubmitButton
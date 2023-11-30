//import { Loader } from '@/components/Loader'
import styles from './styles.module.css'


export function SubmitButton ({ buttonText, isLoading }) {
  return (
    <button className={styles.submitButton} type='submit' disabled={isLoading}>
      {/* {isLoading ? <Loader /> : buttonText} */}
      {isLoading ? 'Cargando' : buttonText}
    </button>
  )
}
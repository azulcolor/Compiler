import './App.css'
import { prueba2 } from './lexer'

export default function Down({ errors }) {
  return (
    <div className='compiler'>
      {/* {errors &&
        errors.map((error, index) => {
          return (
            <p style={{ color: 'red' }}>
              Error de estructura en la columna {error.col} línea {error.line}{' '}
              valor {error.text}
            </p>
          )
        })} */}
    </div>
  )
}

import './App.css'

export default function Down({ errors, compile }) {

  if (!compile) return null

  return (
    <div className='compiler'>
      {errors ?
        errors.map((error, index) => {
          return (
            <p style={{ color: 'red' }}>
              {index + 1} - {error}
            </p>
          )
        }) : (<p style={{ color: 'green' }}>No errors</p>)}
    </div>
  )
}

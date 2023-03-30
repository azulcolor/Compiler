import { jump } from './expressions'
import './App.css'
import { lex, cleanError } from './lexer'

const readFile = (e, setText, setTextArray) => {
  const file = e.target.files[0]
  if (!file) return

  const reader = new FileReader()

  reader.readAsText(file)

  reader.onload = () => {
    setText(reader.result)
    setTextArray(reader.result.split(jump))
  }

  reader.onerror = () => {
    console.log(reader.error)
  }
}

const compile = (text, setErrors, setCompile) => {
  const errors = lex(text)
  setErrors(errors)
  setCompile(true)
  cleanError()
}

export default function Input({ setText, setTextArray, text, setErrors, setCompile }) {
  return (
    <div style={{ display: 'flex' }}>
      <input
        type='file'
        name='file'
        id='file'
        className='inputfile'
        onChange={(e) => readFile(e, setText, setTextArray)}
      />
      <label htmlFor='file'> Select a file</label>
      <button onClick={() => compile(text, setErrors, setCompile)}>Compile</button>
    </div>
  )
}

import { useState } from 'react'
import Editor from '@monaco-editor/react'
import Input from './Input'
import Header from './Header'
import Down from './Down'
import { jump } from './expressions'
import { cleanText, deleteComments } from './functions'
import './App.css'

function App() {
  const [text, setText] = useState('')
  const [textArray, setTextArray] = useState([])
  const [compile, setCompile] = useState(false)
  const [errors, setErrors] = useState();

  const show = (value) => {
    setText(deleteComments(value))
    setTextArray(value.split(jump))
  }

  return (
    <div className='App'>
      <Header />
      <div className='container'>
        <Input
          setText={setText}
          setTextArray={setTextArray}
          setCompile={setCompile}
          text={text}
          setErrors={setErrors}
        />
        <Editor
          height='60vh'
          theme='vs-dark'
          value={text}
          onChange={(value) => show(value)}
        />
        <Down errors={errors} compile = {compile}/>
      </div>
    </div>
  )
}

export default App

import { useState } from 'react'
import Editor from '@monaco-editor/react'
import Input from './Input'
import Header from './Header'
import Down from './Down'
import { jump } from './expressions'
import { cleanText, deleteComments } from './functions'
import './App.css'
import { prueba } from './lexer'
import { prueba2 } from './lexer'
import { prueba3 } from './lexer'

function App() {
  const [text, setText] = useState('')
  const [textArray, setTextArray] = useState([])
  const [compile, setCompile] = useState(false)

  const show = (value) => {
    setText(deleteComments(value))
    setTextArray(value.split(jump))
  }
  if (text) {
    console.log(prueba3(text))
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
        />
        <Editor
          height='60vh'
          theme='vs-dark'
          value={text}
          onChange={(value) => show(value)}
        />
        <Down text={cleanText(text)} textArray={textArray} compile={compile} />
      </div>
    </div>
  )
}

export default App

import moo from 'moo'

let errors = []
let declarations = {
  variables: [],
  types: [],
}

const structure = moo.compile({
  ws: /[ \t]+/,
  nl: { match: /\r?\n/, lineBreaks: true },
  comment: /\/\/[^\n]*/,
  Top: 'Top',
  Thing: /Thing\s*{[^{}]*}/,
  Sky: /Sky\s*{[^{}]*}/,
  Down: 'Down',
  myError: moo.error,
})

const lexer = moo.compile({
  ws: /[ \t]+/,
  nl: { match: /\r?\n/, lineBreaks: true },
  comment: /\/\/[^\n]*/,
  assignation: /\w+\s*=\s*/,
  top: 'Top',
  thing: 'Thing',
  sky: 'Sky {',
  inf: 'inf();',
  down: 'Down',
  show: /show\((?:['"])?(?:[\w\sáéíóú]+)(?:['"])?\);?/,
  get: /get\([a-zA-Z]+\);/,
  boolean: /true|false/,
  if: /if\s*\(\s*.+\s*\)\s*\{/,
  else: 'else',
  while: /while\s*\(\s*.+\s*\)\s*\{/,
  for: /for\s*\(\s*.+\s*\)\s*\{/,
  number: /0|[1-9][0-9]*/,
  str: /['"][\w\s\\]*['"]/,

  com: "'",
  lpar: '(',
  rpar: ')',
  lbrace: '{',
  rbrace: '}',
  lbracket: '[',
  rbracket: ']',
  comma: ',',
  colon: ':',
  semicolon: ';',
  dot: '.',
  arrow: '=>',
  eq: '=',
  plus: '+',
  minus: '-',
  mul: '*',
  div: '/',
  lt: '<',
  gt: '>',
  le: '<=',
  ge: '>=',
  eqeq: '==',
  ne: '!=',
  and: '&&',
  or: '||',
  not: '!',

  int: /\bint\s+\w+\s*(?:=\s*\d+)?\s*/,
  float: /\bfloat\s+\w+\s*(?:=\s*\d+)?\s*/,
  string: /\bstring\s+\w+\s*(?:=\s*['"][^'"]*['"])?\s*/,
  bool: /\bbool\s+\w+\s*(?:=\s*(?:true|false))?/,
  myError: moo.error,
})

const variables = moo.compile({
  ws: /[ \t]+/,
  nl: { match: /\r?\n/, lineBreaks: true },
  Top: 'Top',
  com: ';',
  comment: /\/\/[^\n]*/,
  Thing: 'Thing {',
  rbrace: '}',
  int: /\bint\s+\w+\s*(?:=\s*\d+)?\s*/,
  float: /\bfloat\s+\w+\s*(?:=\s*\d+)?\s*/,
  string: /\bstring\s+\w+\s*(?:=\s*['"][^'"]*['"])?\s*/,
  bool: /\bbool\s+\w+\s*(?:=\s*(?:true|false))?/,
  myError: moo.error,
})

export const cleanError = () => {
  errors = []
  declarations = {
    variables: [],
    types: [],
  }
}

export const findVariables = (token) => {
  if (token.type == 'int') {
    declarations.variables.push(token.value.split(';')[0].split('int ')[1])
    declarations.types.push('int')
  }
  if (token.type == 'float') {
    declarations.variables.push(token.value.split(';')[0].split('float ')[1])
    declarations.types.push('float')
  }
  if (token.type == 'string') {
    declarations.variables.push(token.value.split(';')[0].split('string ')[1])
    declarations.types.push('string')
  }
  if (token.type == 'bool') {
    declarations.variables.push(token.value.split(';')[0].split('bool ')[1])
    declarations.types.push('bool')
  }
}

export const lex = (text, beforeLine = 0) => {
  let tokens = []
  try {
    lexer.reset(text)
    let token = lexer.next()
    while (token) {
      tokens.push(token)
      if (token.type == 'myError') {
        const lineError = findError(token, text, beforeLine)
        const newText = skipError(text, lineError)
        errors.push('Error en la linea ' + lineError + ' :( ')
        lex(newText, lineError)
      }
      if (
        token.type == 'int' ||
        token.type == 'float' ||
        token.type == 'string' ||
        token.type == 'bool'
      ) {
        findVariables(token)
        console.log(declarations)
      }

      if (token.type == 'get') {
        const variable = token.value.split('(')[1].split(')')[0]
        if (!declarations.variables.includes(variable)) {
          const lineError = findError(token, text, beforeLine)
          errors.push(
            'La variable ' +
              variable +
              ' no ha sido declarada en la línea ' +
              lineError
          )
        }
      }

      if (token.type == 'show') {
        const variable = token.value.split('(')[1].split(')')[0]
        console.log(variable)
        if (variable.indexOf('"') >= 0 || variable.indexOf("'") >= 0) {
        } else {
          if (!declarations.variables.includes(variable)) {
            const lineError = findError(token, text, beforeLine)
            errors.push(
              'La variable "' +
                variable +
                '" no ha sido declarada en la línea ' +
                lineError
            )
          }
        }
      }

      if (token.type == 'if') {
        const condition = token.value.split('(')[1].split(')')[0]
        const variables = condition.split(' ')
        if (!declarations.variables.includes(variables[0])) {
          const lineError = findError(token, text, beforeLine)
          errors.push(
            'La variable "' +
              variables[0] +
              '" no ha sido declarada en la línea ' +
              lineError
          )
        }
      }

      if (token.type == 'while') {
        const condition = token.value.split('(')[1].split(')')[0]
        const variables = condition.split(' ')
        if (!declarations.variables.includes(variables[0])) {
          const lineError = findError(token, text, beforeLine)
          errors.push(
            'La variable "' +
              variables[0] +
              '" no ha sido declarada en la línea ' +
              lineError
          )
        }
      }

      if (token.type == 'for') {
        const condition = token.value.split('(')[1].split(')')[0]
        const variables = condition.split(' ')
        if (!declarations.variables.includes(variables[0])) {
          const lineError = findError(token, text, beforeLine)
          errors.push(
            'La variable "' +
              variables[0] +
              '" no ha sido declarada en la línea ' +
              lineError
          )
        }
      }

      token = lexer.next()
    }
    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i].type == 'assignation') {
        const variable = tokens[i].value.split('=')[0].trim()
        if (!declarations.variables.includes(variable)) {
          const lineError = findError(tokens[i], text, beforeLine)
          errors.push(
            'La variable "' +
              variable +
              '" no ha sido declarada en la línea ' +
              lineError
          )
        } else {
          const type =
            declarations.types[declarations.variables.indexOf(variable)]
          if (type == 'int') {
            if (tokens[i + 1].type != 'number') {
              const lineError = tokens[i].line
              errors.push(
                'Error de asignación en la línea ' +
                  lineError +
                  ' la variable "' +
                  variable +
                  '" es de tipo entero'
              )
            }
          }
          if (type == 'float') {
            if (tokens[i + 1].type != 'number') {
              const lineError = tokens[i].line
              errors.push(
                'Error de asignación en la línea ' +
                  lineError +
                  ' la variable "' +
                  variable +
                  '" es de tipo decimal'
              )
            }
          }
          if (type == 'string') {
            if (tokens[i + 1].type != 'str') {
              const lineError = tokens[i].line
              errors.push(
                'Error de asignación en la línea ' +
                  lineError +
                  ' la variable "' +
                  variable +
                  '" es de tipo cadena'
              )
            }
          }
          if (type == 'bool') {
            if (tokens[i + 1].type != 'boolean') {
              const lineError = tokens[i].line
              errors.push(
                'Error de asignación en la línea ' +
                  lineError +
                  ' la variable "' +
                  variable +
                  '" es de tipo booleano'
              )
            }
          }
        }

        console.log('Entra a esta porquería')
        //   if (type == 'int'){
        //     console.log('Entro a los tipos')
        //     if (tokens[i + 1].type != 'int') {
        //       const lineError = findError(tokens[i], text, beforeLine)
        //       errors.push(
        //         'La variable "' +
        //           variable +
        //           '" no es de tipo entero en la línea ' +
        //           lineError
        //       )
        //     }
        // }
      }
    }
    errors = [...new Set(errors)]
    console.log(tokens)
    if (errors.length > 0) {
      return errors
    } else {
      return null
    }
  } catch (e) {
    console.log(e)
  }
}

const findError = (token, text, beforeLine = 0) => {
  const errorWord = token.text.split(' ')
  const positionOfError = text.indexOf(errorWord[0])
  const line = text.substr(0, positionOfError).split('\n').length
  const errorLine = line + beforeLine
  return errorLine
}

const skipError = (txt, errorLine) => {
  let linesOfCode = txt.split('\n')
  let restLinesOfCode = linesOfCode.slice(errorLine)
  let codeWithoutError = restLinesOfCode.join('\n')
  console.log(codeWithoutError)
  return codeWithoutError
}

export default lexer

import moo from 'moo'

const structure = moo.compile({
  ws: /[ \t]+/,
  nl: { match: /\r?\n/, lineBreaks: true },
  comment: /\/\/[^\n]*/,
  Top: 'Top',
  Thing: /Thing\s*{[^{}]*}/,
  Sky: /Sky\s*{[^{}]*}/,
  Down: 'Down',
})

const lexer = moo.compile({
  ws: /[ \t]+/,
  nl: { match: /\r?\n/, lineBreaks: true },
  comment: /\/\/[^\n]*/,
  top: 'Top',
  thing: 'Thing',
  sky: 'Sky',
  inf: 'inf();',
  down: 'Down',
  show: /show\((?:['"])?(?:[\w\sáéíóú]+)(?:['"])?\);?/,
  get: /get\([a-zA-Z]+\);/,
  true: 'true',
  false: 'false',
  if: 'if',
  else: 'else',
  while: 'while',
  for: 'for',
  number: /0|[1-9][0-9]*/,
  string: /'[^']*'/,
  com: "'",
  var: /[a-zA-Z_][a-zA-Z0-9_]*/,
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
})

const variables = moo.compile({
  ws: /[ \t]+/,
  nl: { match: /\r?\n/, lineBreaks: true },
  Top: 'Top',
  com: ';',
  comment: /\/\/[^\n]*/,
  Thing: 'Thing {',
  int: /\bint\s+\w+\s*(?:=\s*\d+)?\s*/,
  float: /\bfloat\s+\w+\s*(?:=\s*\d+)?\s*/,
  string: /\bstring\s+\w+\s*(?:=\s*['"][^'"]*['"])?\s*/,
  bool: /\bbool\s+\w+\s*(?:=\s*(?:true|false))?/,
  myError: moo.error,
})

export const prueba = (text) => {
  try {
    lexer.reset(text)
    let token = lexer.next()
    while (token) {
      console.log(token)
      token = lexer.next()
    }
  } catch (e) {
    console.log(e)
  }
}

export const prueba2 = (text) => {
  try {
    structure.reset(text)
    let token = structure.next()
    while (token) {
      console.log(token)
      token = structure.next()
    }
  } catch (e) {
    console.log(e)
  }
}

export const prueba3 = (text) => {
  try {
    variables.reset(text)
    let token = variables.next()
    while (token) {
      console.log(variables.formatError(token, 'Invalid sintaxis'))
      token = variables.next()
    }
  } catch (e) {}
}

export default lexer

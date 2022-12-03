import * as exp from './expressions.js';

export const cleanText = (text) => {
  return text.replace(exp.all, '');
};

export const deleteComments = (text) => {
  return text.replace(exp.comments, '');
};

const extructureText = (text) => {
  var extructureError = [];

  if (!exp.top.test(text)) {
    extructureError.push('The code must have a start with "Top"');
  }
  if (!exp.thing.test(text)) {
    extructureError.push('The code must have a variable zone with "Thing"');
  }
  if (!exp.sky.test(text)) {
    extructureError.push('The code must have body zone with "Sky"');
  }
  if (!exp.inf.test(text)) {
    extructureError.push('The code must have a body end with "inf()"');
  }
  if (!exp.down.test(text)) {
    extructureError.push('The code must have a end with "Down"');
  }

  if (!exp.order.exec(text)) {
    extructureError.push('The code must have a correct order');
  }

  return extructureError;
};

const invalidSymbols = (text) => {
  var invalidSymbols = [];
  var invalid;
  text.map((item, i) => {
    if (exp.symbols.test(item)) {
      invalid = item.match(exp.symbols)[0];
      const { index } = item.match(exp.symbols);
      invalidSymbols.push(
        'invalid symbol "' +
          invalid +
          '" on line ' +
          `${i + 1}` +
          ' on column ' +
          `${index + 1}`
      );
    }
  });
  return invalidSymbols;
};

export const errors = (text, arrayText) => {
  var object = {
    errors: [],
    color: '',
  };

  object.errors = [...extructureText(text), ...invalidSymbols(arrayText)];
  if (object.errors.length > 0) {
    object.color = '#ff6a6a'
    return (object);
  } else {
    object.color = 'rgb(238, 238, 238)'
    object.errors.push('Compiled successfully');
    return (object);
  }
};

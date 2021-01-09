import types from './value-equiv.json';

export function parseTextInput(text) {
  /*This function parses the text from the textarea ingredient input onChange
  By splitting the numbers and valid types from the rest of the words
  with O(n) time complexity */

  let word = '';
  let amount = null;
  let unit = null;
  let ingredient_name = null;
  let arr = [];

  const createObject = (amount = null, unit = null, ingredient_name) => ({ amount, unit, ingredient_name });

  const sortWord = (word) => {
    //sorts words (after space or line break)
    //into amount, unit, or ingredient_name
    word = word.toLowerCase()
    const regex = /\d/
    if (word.match(regex)) {
      if (amount) {
        amount += ` ${word}`;
      }
      else {
        amount = word;
      }
    }
    else if (types[`${word}`]) {
      unit = types[word];
    }
    else {
      if (ingredient_name) {
        ingredient_name += ` ${word}`
      }
      else {
        ingredient_name = word;
      }
    }
  }

  for (let i = 0; i < text.length; i++) {
    //loops through string once
    if (text[i] === ' ' || text[i] === '\n') {
      sortWord(word);
      word = '';

      //if there is a next char
      //and it is a number or new line
      //and there is already an ingredeint name
      //add object to array
      if (text[i + 1]) {
        if (text[i + 1].match(/\d/) || text[i] === '\n') {
          if (ingredient_name) {
            const obj = createObject(amount, unit, ingredient_name);
            arr.push(obj);
            amount = null;
            unit = null;
            ingredient_name = null;
          }
        }
      }
    }
    else {
      word += text[i];
    }
  }

  if (ingredient_name) {
    const obj = createObject(amount, unit, ingredient_name);
    arr.push(obj);
  }

  return arr;
}

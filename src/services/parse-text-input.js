import types from './value-equiv.json';

export function parseTextInput(text) {


  //loop through text
  //collect numbers
  //when you find a number, continue loop in different mode
  //after number, check for other number or valid type
  //function handleIngredient sequence
  let word;
  let currentObject = {
    amount: null,
    unit: null,
    name: null

  }

  let arr = []

  for (let i = 0; i < text.length; i++) {
    if (text[i] === ' ') {
      sortWord(currentObject, word);
      word = '';

      //if next char is number, move current obj to array

      if (text[i + 1].match(/\d/)) {
        arr.push(currentObject);
        currentObject = {
          amount: null,
          unit: null,
          name: null
        }
      }
    }
  }

  const sortWord = (obj, word) => {
    //matches digits of any length and digit/wildcard/digit
    if (word.match(/^\d+$|^\d+.\d+$/)) {
      obj.amount = word;
    }
    else if (types[word]) {
      obj.unit = types[word];
    }
    else {
      obj.name = word;
    }

    return obj;
  }








}
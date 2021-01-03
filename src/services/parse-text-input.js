import types from './value-equiv.json';

export function parseTextInput(text) {
  let word = '';
  let amount = null;
  let unit = null;
  let ingredient_name = null;
  let arr = [];

  const createObject = (amount = null, unit = null, ingredient_name) => ({ amount, unit, ingredient_name });

  const sortWord = (word) => {
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
    if (text[i] === ' ' || text[i] === '\n') {
      sortWord(word);
      word = '';

      //if next char is number, move current obj to array
      if (text[i + 1] && text[i + 1].match(/\d/)) {
        if (ingredient_name) {
          const obj = createObject(amount, unit, ingredient_name);
          arr.push(obj);
          amount = null;
          unit = null;
          ingredient_name = null;
        }

      }
    }
    else {
      word += text[i];
    }
  }

  if (amount || unit || ingredient_name) {
    const obj = createObject(amount, unit, ingredient_name);
    arr.push(obj);
  }


  console.log(arr)
  return arr;

}

parseTextInput(`
1 1/2 cups all-purpose flour
1/2 teaspoon baking soda
1/2 teaspoon salt
10 Tablespoons unsalted butter
1/2 cup granulated sugar
1/4 cup packed light or dark brown sugar
2 Tablespoons honey or light corn syrup`)
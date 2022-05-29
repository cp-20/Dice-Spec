import fs from 'fs';
import path from 'path';
import peggy from 'peggy';

const parser = peggy.generate(fs.readFileSync(path.join(__dirname, '../parser/dice.pegjs'), 'utf8'));

const getDiceResult = (dice: number, sides: number) =>
  `[${new Array(dice)
    .fill(0)
    .map(() => Math.floor(Math.random() * sides + 1))
    .join(',')}]`;

const diceRegex = /([0-9]+)d([0-9]*)/gi;
const diceRoll = (input: string) => {
  let output = input;
  let offset = 0;

  for (let match = null; (match = diceRegex.exec(input)); ) {
    const result = getDiceResult(parseInt(match[1], 10), parseInt(match[2] || '6', 10));
    output = output.slice(0, match.index + offset) + result + output.slice(match.index + offset + match[0].length);
    offset += result.length - match[0].length;
  }

  return output;
};

const testCases = ['3 + 4D', '5 * 3D', '2D * 5D', '1d100 + 1d20'];

testCases.forEach((input) => {
  console.log(input);
  const middle = diceRoll(input);
  console.log('->', middle);
  const result = parser.parse(middle);
  console.log('->', result);
});

// Calculate dice result
// ===========================================
// input:
//   like this: [1,2,3] + [4,5,6] + 3 * 6 - 5
// output:
//   34 (integer)


Expression
  = head:Term tail:(_ ("+" / "-") _ Term)* {
      return tail.reduce((result, element) => {
        if (element[1] === "+") { return result + element[3]; }
        if (element[1] === "-") { return result - element[3]; }
      }, head);
    }

Term
  = head:Factor tail:(_ ("*" / "/") _ Factor)* {
      return tail.reduce((result, element) => {
        if (element[1] === "*") { return result * element[3]; }
        if (element[1] === "/") { return result / element[3]; }
      }, head);
    }

Factor
  = "(" _ expr:Expression _ ")" { return expr; }
  / dice:Dice { return dice;  }
  / Integer

Dice "dice"
 	= _ "[" num:Integer ("," num2:Integer)* "]" {
    const input = text();
    const result = input.match(/\[([0-9,]+)\]/)[1].split(',').map(val => parseInt(val));
    return result.reduce((result, val) => result + val, 0);
}

Integer "integer"
  = _ [0-9]+ { return parseInt(text(), 10); }

_ "whitespace"
  = [ \t\n\r]*
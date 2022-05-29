// Dice expect analyzer
// ==========================================
// input:
//   2 + 2D + 4
// output:
//   {
//     type: "operator",
//     operator: "+",
//     left: {
//       type: "number",
//       value: 2
//     },
//     right: {
//       type: "operator",
//       operator: "+",
//       left: {
//         type: "dice",
//         dice: 2,
//         sides: 6
//       },
//       right: {
//         type: "number",
//         value: 4
//       }
//     }
//   }

Expression
  = head:Term tail:(_ ("+" / "-") _ Term)* {
      return tail.reduce((result, element) => {
        return {
          type: 'operator',
          operator: element[1],
          left: result,
          right: element[3]
        }
      }, head);
    }

Term
  = head:Factor tail:(_ ("*" / "/") _ Factor)* {
      if (tail.length === 0) return head;
      return tail.reduce((result, element) => {
        return {
          type: 'operator',
          operator: element[1],
          left: result,
          right: element[3]
        }
      }, head);
    }

Factor
  = "(" _ expr:Expression _ ")" { return expr; }
  / Dice
  / Integer

Dice "dice"
 	= _ [0-9]+ [Dd] [0-9]* {
      const input = text();
      const parts = input.split(/d/i);
      return {
        type: 'dice',
        dice: parseInt(parts[0], 10),
        sides: parseInt(parts[1] || '6', 10),
      }
    }

Integer "integer"
  = _ [0-9]+ {
      return {
        type: 'number',
        value: parseInt(text(), 10)
      }
    }

_ "whitespace"
  = [ \t\n\r]*

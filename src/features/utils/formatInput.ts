const convertChar = (char: string) => {
  const charCode = char.charCodeAt(0);
  if (charCode > 65281 && charCode < 65370) {
    return String.fromCharCode(charCode - 65248);
  } else {
    return char;
  }
};

export const formatInput = (input: string): string => {
  return input.split('').map(convertChar).join('');
};

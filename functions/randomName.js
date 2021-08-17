const randomName = () => {
  let letters = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  let nameLength = 20;
  letterIndex = Math.floor(Math.random() * (letters.length - 1));
  let nameArr = [];
  for (let i = 0; i < nameLength; i++) {
    letterIndex = Math.floor(Math.random() * (letters.length - 1));
    nameArr.push(letters[letterIndex]);
  }
  let name = nameArr.join("");
  return name;
};

module.exports = randomName;

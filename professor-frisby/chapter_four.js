const R = require("ramda");

const match = R.curry((what, s) => s.match(what));

const replace = R.curry((what, replacement, s) => s.replace(what, replacement));

const filter = R.curry((f, xs) => xs.filter(f));

const map = R.curry((f, xs) => xs.map(f));

const hasLetterR = match(/r/g);

console.log(hasLetterR("hello world!"));
console.log(hasLetterR("nothing to see"));

console.log(filter(hasLetterR, ["some things", "set of words"]));

const removeStringsWithoutRs = filter(hasLetterR);
console.log(
  removeStringsWithoutRs(["rock and roll", "smooth jazz", "drum circle"])
);

const noVowels = replace(/[aeiou]/gi);
const censored = noVowels("*");
console.log(censored("Chocolate Rain"));

// Exercises

// 1
const words = R.curry(R.split(" "));
console.log(words("These are some words to split"));

// 2
const matchQs = match(/q/i);
const filterQs = filter(matchQs);
console.log(filterQs(["A Quiet Place", "Silent Place"]));

// 3
const keepHighest = (x, y) => (x >= y ? x : y);
const keepLowest = (x, y) => (x >= y ? y : x);
const max = R.reduce(keepHighest, -Infinity);
const min = R.reduce(keepLowest, Infinity);
console.log(max([-100, 50, 42, 9, -1000]));
console.log(min([-100, 50, 42, 9, -1000]));

const R = require("ramda");

const replace = R.curry((what, replacement, s) => s.replace(what, replacement));
const toLowerCase = (x) => x.toLowerCase();

const toUpperCase = (x) => x.toUpperCase();
const exclaim = (x) => `${x}!`;
const shout = R.compose(exclaim, toUpperCase);

console.log(shout("hello"));

const head = (x) => x[0];
const reverse = R.reduce((acc, x) => [x].concat(acc), []);
const last = R.compose(head, reverse);

console.log(last(["jumpkick", "roundhouse", "uppercut"]));

const composeOne = R.compose(toUpperCase, R.compose(head, reverse));
const composeTwo = R.compose(R.compose(toUpperCase, head), reverse);
console.log(composeOne(["jumpkick", "roundhouse", "uppercut"]));
console.log(composeTwo(["jumpkick", "roundhouse", "uppercut"]));

const arg = ["jumpkick", "roundhouse", "uppercut"];
const lastUpper = R.compose(toUpperCase, head, reverse);
const loudLastUpper = R.compose(exclaim, toUpperCase, head, reverse);
console.log(lastUpper(arg));
console.log(loudLastUpper(arg));

// Pointfree
const snakeCase = (word) => word.toLowerCase().replace(/\s+/gi, "_");
console.log(snakeCase("some word"));

const snakeCasePointfree = R.compose(replace(/\s+/gi, "_"), toLowerCase);
console.log(snakeCasePointfree("some word"));

const initials = (name) =>
  name.split(" ").map(R.compose(toUpperCase, head)).join(". ");
console.log(initials("Sam Daniel"));

const initialsPointfree = R.compose(
  R.join(". "),
  R.map(R.compose(toUpperCase, head)),
  R.split(" ")
);
console.log(initialsPointfree("Sam Daniel Ann"));

// Identity
const g = (x) => x.length;
const f = (x) => x === 4;
const id = (x) => x;
const isFour = R.compose(f, id);
const isFourAlso = R.compose(id, f);
console.log(isFour(5));
console.log(isFourAlso(5));

// Exercises
const cars = [
  {
    name: "Aston Martin One-77",
    horsepower: 750,
    dollar_value: 1850000,
    in_stock: true,
  },
  {
    name: "Some other car",
    horsepower: 700,
    dollar_value: 1200000,
    in_stock: false,
  },
  {
    name: "Last car",
    horsepower: 800,
    dollar_value: 1500000,
    in_stock: true,
  },
];

const isLastInStock = (cars) => {
  const lastCar = R.last(cars);
  return R.prop("in_stock", lastCar);
};
console.log(isLastInStock(cars));

const composeLastInStock = R.compose(R.prop("in_stock"), R.last);
console.log(composeLastInStock(cars));

const average = (xs) => R.reduce(R.add, 0, xs) / xs.length;
const averageDollarValue = (cars) => {
  const dollarValues = R.map((c) => c.dollar_value, cars);
  return average(dollarValues);
};
console.log(averageDollarValue(cars));

const composeAverageDollarValue = R.compose(
  average,
  R.map(R.prop("dollar_value"))
);
console.log(composeAverageDollarValue(cars));

const fastestCar = (cars) => {
  const sorted = R.sortBy((car) => car.horsepower, cars);
  const fastest = R.last(sorted);
  return R.concat(fastest.name, " is the fastest");
};
console.log(fastestCar(cars));

const composeFastestCar = R.compose(R.concat(R.__, " is the fastest"), R.prop("name"), R.last, R.sortBy(R.prop('horsepower')));
console.log(composeFastestCar(cars));
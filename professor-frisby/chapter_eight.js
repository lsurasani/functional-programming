const R = require("ramda");
const S = require("sanctuary");
const $ = require("sanctuary-def");

class Container {
  constructor(x) {
    this.$value = x;
  }

  static of(x) {
    return new Container(x);
  }
}

const cont3 = Container.of(3);
console.log(cont3);

const hotdogs = Container.of("hotdogs");
console.log(hotdogs);

const yodaContainer = Container.of(Container.of({ name: "yoda" }));
console.log(yodaContainer);

// First Functor
Container.prototype.map = function (f) {
  return Container.of(f(this.$value));
};

console.log(Container.of(2).map((two) => two + 2));
console.log(Container.of("flamethrowers").map((s) => s.toUpperCase()));
console.log(Container.of("bombs").map(R.concat(" away")).map(R.prop("length")));

// Maybe

// Maybe.of('Malkovich Malkovich').map(match(/a/ig));
const matchA = S.isJust(
  S.map(S.match(/a/))(S.Just("Malkovich Malkovich"))
);
console.log(matchA);

// Maybe.of(null).map(match(/a/ig));
const nullMatch = S.map(S.match(/a/))(S.Nothing)
console.log(nullMatch)

// Maybe.of({ name: 'Boris' }).map(prop('age')).map(add(10));
const boris = S.map(S.add(10))(S.get(S.is($.Number))("age")({ name: "Boris" }));
console.log(boris);

// Maybe.of({ name: 'Dinah', age: 14 }).map(prop('age')).map(add(10));
const dinah = S.map(S.add(10))(
  S.get(S.is($.Number))("age")({ name: "Dinah", age: 14 })
);
console.log(dinah);

const safeHead = xs => S.array (S.Nothing) (head => tail => S.Just (head)) (xs)
console.log(safeHead([]))
console.log(safeHead([0,1,2,3]))

// Either.of('rain').map(str => `b${str}`)
const addBToRain = S.map ((a) => `b${a}`) (S.of (S.Either) ('rain'))
console.log(addBToRain);

// left('rain').map(str => `It's gonna ${str}, better bring your umbrella!`)
const leftRain = S.map ((a) => `b${a}`) (S.Left("rain"))
console.log(leftRain)


/*********************************************************
LAB 2: LOOPY SCI-FI

Welcome to Lab 2 =)

Be sure to read all the comments!

All of the instructions are inline with the assignment below.
Look for the word TODO in comments.  Each TODO will have a
description of what is required.

To run this file (in the terminal) use: node lab2.js

*********************************************************/
// SETUP
//*********************************************************

// We're going to use this special assert method again to
// test our code
function assert(expression, failureMessage) {
  if (!expression) {
    console.log("assertion failure: ", failureMessage);
  }
}

//*********************************************************
// PROBLEM 1: The Blob. 20 points
//*********************************************************

/* Dowington, PA had 1000 citizens on the night the blob escaped
 its meteorite. At first, the blob could only find and consume
 Pennsylvanians at a rate of 1/hour. However, each time it digested
 someone, it became faster and stronger: adding to its consumption
 rate by 1 person/hour.

 persons consumed  |  rate of consumption
 ------------------|---------------------
        0          |       1/hour
        1          |       2/hour
        2          |       3/hour
        3          |       4/hour

TODO: First, make a constructor function, called Blob, that makes blobs.*/

function Blob(name) {
   this.name = name;
}

//Originally had this inside constructor but it makes more sense to leave this
//outside because of instructions further in this problem.
var personsRemaining = 1000;  //After conversing with the TA, this makes more sense than personsConsumed
var rateOfConsumption = 1;
var hoursSpentInDowington = 0;

/*TODO: Next, create an instance of Blob named blob.*/
var blob = new Blob('blob');

/*TODO: Then, use a loop to calculate how long it took the blob to finish
  with Dowington.  */

while (personsRemaining > 0) {
  console.log('Hours: ' + hoursSpentInDowington + '\tPersons Remaining: ' +
  personsRemaining + '\tConsumption Rate: ' + rateOfConsumption);
  personsRemaining -= rateOfConsumption;
  hoursSpentInDowington++;
  rateOfConsumption++;
}

// TODO: assign hoursSpentInDowington the value of the above calculation
console.log('Answer: ' + hoursSpentInDowington);

// Now, write a method that takes a population for an arbitrary
// town, and the starting consumption rate, and returns the number
// of hours the blob needs to ooze its way through that town.

Blob.prototype.hoursToOoze = function(population, peoplePerHour) {
  // TODO: implement me based on the instructions above. Be sure to then assign me to the Blob's prototype.
  if ((typeof(population) === 'number') && (typeof(peoplePerHour) === 'number')) {
    this.population = population;
    this.peoplePerHour = peoplePerHour;
    var hours;
    for (hours = 0; population > 0; hours++, peoplePerHour++) {
      population -= peoplePerHour;
    }
    return hours;
  } else {
    return('Both arguments must be numbers.');
  }
};//end of hoursToOoze function

assert(blob.hoursToOoze(0, 1) === 0, "no people means no time needed.");
assert(blob.hoursToOoze(1000, 1) === hoursSpentInDowington,
  "hoursSpentInDowington should match hoursToOoze\"s result for 1000");
// TODO: write three more assertions like the two above, testing out
// the hoursToOoze method.
assert(blob.hoursToOoze(true, true) === 'Both arguments must be numbers.',
  'Exception handler not working with booleans');
assert(blob.hoursToOoze('string', 'string') === 'Both arguments must be numbers.',
  'Exception handler not working with strings');
assert(blob.hoursToOoze('string', 10) === 'Both arguments must be numbers.',
  'Exception handler is not checking if both arguments are numbers.');


//*********************************************************
// PROBLEM 2: Universal Translator. 20 points
//*********************************************************

var hello = {
  klingon: "nuqneH",  // home planet is Qo"noS
  romulan: "Jolan\"tru", // home planet is Romulus
  "federation standard": "hello" // home planet is Earth
};

// TODO: define a constructor that creates objects to represent
// sentient beings. They have a home planet, a language that they
// speak, and method called sayHello.

function SentientBeing (homePlanet, language) {
  // TODO: specify a home planet and a language
  // you'll need to add parameters to this constructor
  this.homePlanet = homePlanet;
  this.language = language;
  this.hello = hello[language];
}

// sb is a SentientBeing object
SentientBeing.prototype.sayHello = function(sb) {
  // TODO: say hello prints out (console.log's) hello in the
  // language of the speaker, but returns it in the language
  // of the listener (the sb parameter above).
  // use the 'hello' object at the beginning of this exercise
  // to do the translating
  console.log(this.hello);
  return sb.hello;
  //TODO: put this on the SentientBeing prototype
};


// TODO: create three SentientBeings, one for each language in the
// 'hello' object above.
var klingon = new SentientBeing('Qo"Nos', 'klingon'); // TODO: fix me
var romulan = new SentientBeing("Romulus", "romulan"); // TODO: fix me
var human = new SentientBeing('Earth', 'federation standard'); // TODO: fix me


assert(human.sayHello(klingon) === "nuqneH",
  "the klingon should hear nuqneH");
// TODO: write five more assertions, to complete all the possible
// greetings between the three types of sentient beings you created above.
assert(romulan.sayHello(klingon) === "nuqneH");
assert(romulan.sayHello(human) === "hello");
assert(human.sayHello(romulan) === "Jolan\"tru");
assert(romulan.sayHello(romulan) === "Jolan\"tru");
assert(klingon.sayHello(human) === "hello");

//*********************************************************
// PROBLEM 3: Moar Loops. 20 points.
//
// Implement the following functions. Write at least 3
// assertions for each one
//*********************************************************
function max(array) {
  // TODO: return the largest number in the given array
  var largestNumber = 0;
  for (i = 0; i < array.length; i++) {
    if (array[i] > largestNumber) {
      largestNumber = array[i];
    }
  }
  return largestNumber;
}

// TODO: write three more assertions
assert(max([ 1, 3, 2 ]) === 3, "[1,3,2]");
assert(max([ 2, 'hi', 4, 'hello', 10 ]) === 10, "[2, 'hi', 4, 'hello', 10]");
assert(max([ -1 ]) === 0, "[-1]");
assert(max([ 10.05, 10.02, 10.98 ]) === 10.98, "[10.05, 10.02, 10.98]");


function variablify(string) {
  // TODO: you are given a string with several words in it
  // return a corresponding variable name that follows
  // javascript conventions
  // HINT:
  // you might want to use these string methods:
  //  split(), charAt(), toUpperCase()
  // and this array method: join()
  var arrayedString = string.split(' ');
  var camelCasify = arrayedString[0].toLowerCase();
  for (var i = 1; i < arrayedString.length; i++) {
    var nextWord = arrayedString[i];
    camelCasify += nextWord.charAt(0).toUpperCase();
    for (var j = 1; j < nextWord.length; j++) {
      camelCasify += nextWord.charAt(j).toLowerCase();
    }
  }
  return camelCasify;
}

// TODO: write three more assertions
assert(variablify("one two three") === "oneTwoThree",
  "variablify(\"one two three\")");

assert(variablify("Four score and secen years ago when our forefathers") === "fourScoreAndSecenYearsAgoWhenOurForefathers",
  "variablify(\"Four score and secen years ago when our forefathers\")");

assert(variablify("One Two And Three") === "oneTwoAndThree", "variablify(\"One Two And Three\")");

assert(variablify("BECAUSE IM BATMAN") === "becauseImBatman", "variablify(\"BECAUSE IM BATMAN\")");


//*********************************************************
// PROBLEM 4: Cleanup: 10 points
// Makes sure this file passes jshint and jscs
//
// ./node_modules/.bin/grunt jshint
// ./node_modules/.bin/grunt jscs
//*********************************************************

# value-position-index

[![Build Status](https://travis-ci.org/codewithmichael/value-position-index.svg?branch=master)](https://travis-ci.org/codewithmichael/value-position-index)

JavaScript library to store and retrieve array data positions indexed by content value

## Example
```js
var list, listIndex;

// List to be indexed
list = [1, "1", "two", "two", undefined, null, "null", NaN, Infinity];

// Index for list information
listIndex = new ValuePositionIndex();

//-------------------
// Populate the index
//-------------------

list.forEach(function(value, position){ listIndex.add(value, position); });

//-------------------------------
// Locate or count indexed values
//-------------------------------

// Value comparison is string based
var findOne = listIndex.find(1);
var nullCount = listIndex.find("null").length;
//: findOne = [0, 1]
//: nullCount = 2

//------------------------
// Locate undefined values
//------------------------

var findUndefined = listIndex.find(undefined);
//: findUndefined = [4]

//------------------------------
// Locate abstract number values
//------------------------------

var findNaN = listIndex.find(NaN);
var findInfinity = listIndex.find(Infinity);
//: findNaN = [7]
//: findInfinity = [8]

//------------------------------------
// Locate strict matches with filter()
//------------------------------------

var findStringNull = listIndex
                     .find("null")
                     .filter(function(v) { return list[v] === "null"; });
//: findStringNull = [6];

//-----------------------------------
// Retrieve indexed values with map()
//-----------------------------------

var ones = listIndex
           .find(1)
           .map(function(v) { return list[v]; });
//: ones = [1, "1"]

//----------------------------------
// Cross-reference coordinated lists
//----------------------------------

var players, scores, scoresIndex;

players = ['Jim', 'Scott', 'Tom'];
scores = [3, 5, 4];

scoresIndex = new ValuePositionIndex();
scores.forEach(function(v, i) { scoresIndex.add(v, i); });

var highestScore = Math.max.apply(Math, scores);

// Note: This could return multiple names in case of a tie.
var winner = scoresIndex
             .find(highestScore)
             .map(function(v) { return players[v]; })
//: winner = ['Scott']
```

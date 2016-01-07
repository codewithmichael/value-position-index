/**
 * @license Value Position Index
 * (c) 2016 Michael Spencer
 * License: MIT
 */
;(function(){
  "use strict";

  var assert = require('assert'),
      T = require('..');

  // Test Constants
  var INVALID_POSITION = -1;
  var FIRST_POSITION = 0;
  var LAST_POSITION = 99;
  var UNSTORED_POSITION = 999;

  //-[ Exports ]----------------------------------------------------------------

  assert(typeof T === 'function',
    "It exports a function");

  //-[ Constructor ]------------------------------------------------------------

  assert(new T().constructor.name === 'ValuePositionIndex',
    "Instances have a constructor named ValuePositionIndex");

  assert((new T()).hasOwnProperty('_index'),
    "Instances have an _index property");

  //-[ Methods ]----------------------------------------------------------------

  //-[ add ]-*

  assert(new T().add('value', 1) === true,
    "Calling add() with a valid value and position will return true");

  assert(new T().add('value', 'abc') === false,
    "Calling add() with a non-numeric position will return false");

  assert(new T().add('value', -1) === false,
    "Calling add() with a negative position will return false");

  //-[ find ]-*

  assert(Array.isArray(new T().find()),
    "Calling find() will return an array");

  assert(populated_t().find('one').length === 1,
    "Calling find() with a value will return an array containing a single element when the value has been stored once");

  assert(populated_t().find('three').length === 3,
    "Calling find() with a value will return an array containing a three elements when the value has been stored three times");

  //-[ remove ]-*

  assert(new T().remove(0) === false,
    "Calling remove() with a position when nothing has been stored will return false");

  assert(populated_t().remove(FIRST_POSITION) === true,
    "Calling remove() with a valid, stored position will return true");

  assert(populated_t().remove(INVALID_POSITION) === false,
    "Calling remove() with an invalid position will return false");

  assert(populated_t().remove(UNSTORED_POSITION) === false,
    "Calling remove() with a position that has not been stored will return false");

  (function(t) {
    assert(t.remove(FIRST_POSITION) && t.find('last')[0] === LAST_POSITION - 1,
      "Calling remove() with a valid position will reduce stored positions with a higher value by 1");
  }(populated_t()));

  //-[ Sample Usage ]-----------------------------------------------------------

  (function(){
    var list, listIndex;

    // List to be indexed
    list = [1, "1", "two", "two", undefined, null, "null", NaN, Infinity];

    // Index for list information
    listIndex = new T();

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
    assert.deepStrictEqual(findOne, [0, 1]);
    //: nullCount = 2
    assert.equal(nullCount, 2);

    //------------------------
    // Locate undefined values
    //------------------------

    var findUndefined = listIndex.find(undefined);
    //: findUndefined = [4]
    assert.deepStrictEqual(findUndefined, [4]);

    //------------------------------
    // Locate abstract number values
    //------------------------------

    var findNaN = listIndex.find(NaN);
    var findInfinity = listIndex.find(Infinity);
    //: findNaN = [7]
    assert.deepStrictEqual(findNaN, [7]);
    //: findInfinity = [8]
    assert.deepStrictEqual(findInfinity, [8]);

    //------------------------------------
    // Locate strict matches with filter()
    //------------------------------------

    var findStringNull = listIndex
                         .find("null")
                         .filter(function(v) { return list[v] === "null"; });
    //: findStringNull = [6];
    assert.deepStrictEqual(findStringNull, [6]);

    //-----------------------------------
    // Retrieve indexed values with map()
    //-----------------------------------

    var ones = listIndex
               .find(1)
               .map(function(v) { return list[v]; });
    //: ones = [1, "1"]
    assert.deepStrictEqual(ones, [1, "1"]);

    //----------------------------------
    // Cross-reference coordinated lists
    //----------------------------------

    var players, scores, scoresIndex;

    players = ['Jim', 'Scott', 'Tom'];
    scores = [3, 5, 4];

    scoresIndex = new T();
    scores.forEach(function(v, i) { scoresIndex.add(v, i); });

    var highestScore = Math.max.apply(Math, scores);

    // Note: This could return multiple names in case of a tie.
    var winner = scoresIndex
                 .find(highestScore)
                 .map(function(v) { return players[v]; })
    //: winner = ['Scott']
    assert.deepStrictEqual(winner, ['Scott']);
  }());

  //=[ Utility ]================================================================

  function populated_t() {
    var t = new T();
    t.add('first', FIRST_POSITION);
    t.add('one',   2);
    t.add('two',   6);
    t.add('two',   4);
    t.add('three', 8);
    t.add('three', 9);
    t.add('three', 10);
    t.add('last',  LAST_POSITION);
    return t;
  }
}());

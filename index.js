/**
 * @license Value Position Index
 * (c) 2016 Michael Spencer
 * License: MIT
 * Version: 0.1.1
 */
;(function() {
  "use strict";

  function ValuePositionIndex() {
    this._index = {};

    this.add = function(value, position) {
      if (!isValidPosition(position)) {
        return false;
      }
      var _index = this._index,
          valueString = valueToString(value),
          list = _index[valueString];
      if (!list) {
        list = _index[valueString] = [];
      }
      list.push(position);
      return true;
    };

    this.find = function(value) {
      if (arguments.length === 0) {
        return [];
      }
      var list = this._index[valueToString(value)];
      return list ? list : [];
    };

    this.remove = function(position) {
      var _index = this._index,
          found = false,
          list,
          k, i, j, v;
      for (k in _index) {
        if (_index.hasOwnProperty(k)) {
          list = _index[k];
          for (i = list.length - 1; i >= 0; i--) {
            v = list[i];
            if (v === position) {
              list.splice(i, 1);
              found = true;
            } else if (v > position) {
              list[i] = v - 1;
            }
          }
          if (!list.length) {
            delete _index[k];
          }
        }
      }
      return found;
    };

    //-[ Utility ]--------------------------------------------------------------

    function valueToString(value) {
      if (typeof value === 'undefined') {
        return 'undefined';
      }
      switch (value) {
        case null:     return 'null';
        default:       return value.toString();
      }
    }

    function isValidPosition(position) {
      return typeof position === 'number'
          && position >= 0
          && position === Math.floor(position);
    }
  }

  //=[ Exports ]================================================================

  if (exports && module && module.exports) {
    // CommonJS
    module.exports = ValuePositionIndex;
  } else {
    // Browser
    this.ValuePositionIndex = ValuePositionIndex;
  }
}());

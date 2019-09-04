"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var numero = 5;
var numbers = [1, 2, 3, 4, 5, 6];
var sum = numbers.reduce(function (a, b) {
  return a + b;
});

var Person =
/*#__PURE__*/
function () {
  function Person(nombre, edad) {
    _classCallCheck(this, Person);

    this.nombre = name;
    this.edad = age;
  }

  _createClass(Person, [{
    key: "nombre",
    get: function get() {
      return this.name;
    }
  }, {
    key: "edad",
    get: function get() {
      return this.age;
    }
  }]);

  return Person;
}();
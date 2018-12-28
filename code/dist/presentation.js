"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TypeWriter =
/*#__PURE__*/
function () {
  function TypeWriter(txtElement, words) {
    var wait = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 3000;

    _classCallCheck(this, TypeWriter);

    this.txtElement = txtElement;
    this.words = words;
    this.wait = parseInt(wait, 10);
    this.txt = '';
    this.wordIndex = 0;
    this.isDeleting = false;
    this.type();
  }

  _createClass(TypeWriter, [{
    key: "type",
    value: function type() {
      var _this = this;

      // current index of word
      var current = this.wordIndex % this.words.length; // get the full text of the array of words [this.words]

      var fullTxt = this.words[current]; //check if deleting

      if (this.isDeleting) {
        // remove char
        this.txt = fullTxt.substring(0, this.txt.length - 1);
      } else {
        // add char
        this.txt = fullTxt.substring(0, this.txt.length + 1);
      } // insert the text in htmlElement


      this.txtElement.innerHTML = "<span class=\"txt\">".concat(this.txt, "</span>"); // Type speed

      var typeSpeed = 300;
      if (this.isDeleting) typeSpeed /= 2; //check if the word is complete.

      if (!this.isDeleting && this.txt === fullTxt) {
        //make pause at end typing
        typeSpeed = this.wait;
        this.isDeleting = true;
      } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.wordIndex++; // move to the next word
        //pause before typing a new word

        typeSpeed = 500;
      }

      setTimeout(function () {
        return _this.type();
      }, typeSpeed);
    }
  }]);

  return TypeWriter;
}(); // event listener for the DOM when is loaded


document.addEventListener('DOMContentLoaded', init); // run the app 

function init() {
  var txtElement = document.querySelector('.txt-type');
  var words = JSON.parse(txtElement.getAttribute('data-words'));
  var wait = txtElement.getAttribute('data-wait'); // init a TypeWriter instance

  new TypeWriter(txtElement, words, wait);
}
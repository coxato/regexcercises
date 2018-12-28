"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/*  hello, in the comments the english grammar it might not be perfect, because
*   I'm not a english native speaker, and I'm learning english, whatever,
*   here are some small rules that I have made.
*
*   in the comments, all the important variables are enclosed
*   within square brackets [].
*
*   and in comments external files are mentioned with single quotes ''.
*   
*   I have others 2 important javascript files:
*   
*   1) 'words.js' have a class 'Level' that make a new level with
*   positives and negatives words
*
*   2) 'presentation.js' that make a TypeWriter effect to the 
*   principal 'index.html' page
*/
// contains the htmlElements that will be filled with the words to be evaluated 
var htmlWordsContainers = {
  positives: gID('positives'),
  negatives: gID('negatives')
};
var actualLevel = 0; // very IMPORTANT!! variable for the app; 
// variable [LEVELS] by 'words.js'
//fill the container words with the corresponding words

var fillIn = function fillIn(arrayWord, htmlContainer) {
  gID('numberLevel').textContent = "level ".concat(actualLevel + 1); // show the [actualLevel] plus one
  // change the description about the actual level.

  if (actualLevel == 1) {
    gID('description1').classList.remove('active');
    gID('description2').classList.add('active');
  } else {
    gID('description1').classList.add('active');
    gID('description2').classList.remove('active');
  }

  var container = htmlWordsContainers[htmlContainer];
  container.innerHTML = '';
  var spans = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = LEVELS[actualLevel][arrayWord][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var i = _step.value;
      var aux = ''; // save the separate letters in the span's

      for (var j = 0; j < i.length; j++) {
        aux += "<span>".concat(i[j], "</span>");
      }

      spans.push(aux);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  for (var _i = 0; _i < spans.length; _i++) {
    var word = spans[_i];
    container.innerHTML += "\n        <p class=\"pWord\">".concat(word, "</p>\n        ");
  }
};

fillIn('positiveWords', 'positives');
fillIn('negativeWords', 'negatives'); //  event Listener for input element

gID('re').addEventListener('keyup', run);

function run(ev) {
  if (ev.key === 'Enter') {
    look(this.value);
  }
} // look the user entry and compare his regular expression to match patterns
// in the words of [LEVELS]


function look() {
  var regExp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : gID('re').value;
  regExp = new RegExp(regExp);
  clean();
  var positiveWords = LEVELS[actualLevel].positiveWords;
  var negativeWords = LEVELS[actualLevel].negativeWords;
  var count1 = 0,
      count2 = 0; // look positives words match

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = positiveWords[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var word = _step2.value;
      var matched = word.match(regExp);

      if (matched) {
        paint(matched.index, matched[0].length, count1, 'positives');
      }

      count1++;
    } //look negatives words match

  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = negativeWords[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var _word = _step3.value;

      var _matched = _word.match(regExp);

      if (_matched) {
        paint(_matched.index, _matched[0].length, count2, 'negatives');
      }

      count2++;
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
        _iterator3.return();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }
} //to paint a letter when is matched


function paint(indexMatch, matchLenght, htmlIndex, htmlContainer) {
  var pContainer = _toConsumableArray(htmlWordsContainers[htmlContainer].querySelectorAll('p')); // paragraph container


  var spanLetters = _toConsumableArray(pContainer[htmlIndex].querySelectorAll('span'));

  for (var i = 0; i < matchLenght; i++) {
    spanLetters[indexMatch].style.color = 'red';
    indexMatch++;
  }
} //to clean all the words matched color


function clean() {
  _toConsumableArray(gID('positives').querySelectorAll('span')).forEach(function (el) {
    return el.style.color = '#000000';
  });

  _toConsumableArray(gID('negatives').querySelectorAll('span')).forEach(function (el) {
    return el.style.color = '#000000';
  });
} //functions to change the level


function next() {
  var length = LEVELS.length - 1;
  actualLevel >= length ? actualLevel = 0 : actualLevel++;
  fillIn('positiveWords', 'positives');
  fillIn('negativeWords', 'negatives');
}

function previous() {
  var length = LEVELS.length - 1;
  actualLevel <= 0 ? actualLevel = length : actualLevel--;
  fillIn('positiveWords', 'positives');
  fillIn('negativeWords', 'negatives');
} // functions to show modals windows by onclick in 'index2.html'


var modals = [gID('modalContainer1'), gID('modalContainer2')];

function addCssClass(index) {
  if (index == 1) solutions(); // show the solution window modal

  modals[0].classList.remove('activeModal');
  modals[1].classList.remove('activeModal');
  modals[index].classList.add('activeModal');
} // quit the cssClass and hide the modal


function quit() {
  modals.forEach(function (el) {
    return el.classList.remove('activeModal');
  });
} // ==================    show the solution depend the level    ================


function solutions() {
  // levels solutions in order
  var solves = [['ferr(et|y|ari)', 'ferr.*(t|y|i)$'], // level 1
  ['\\b[^eE]+\\b'], // level 2
  ['\\w*p(\\wte?|\\s)(two)?'], // level 3
  ['\\w*ap[^p].*(h|y|m)$'], // level 4
  ['(r|b)?aff?g.?k\\w*']];
  var solutionContainer = gID('solutions');
  solutionContainer.innerHTML = ''; // clean
  // solution with the global [actualLevel] variable

  solves[actualLevel].forEach(function (solution) {
    solutionContainer.innerHTML += "\n        <p class=\"solutionExample\" >".concat(solution, "</p>\n        ");
  });
}
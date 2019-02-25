"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// A Sticky Notes app.
var StickyNotesApp =
/*#__PURE__*/
function () {
  // Initializes the Sticky Notes app.
  function StickyNotesApp() {
    var _this = this;

    _classCallCheck(this, StickyNotesApp);

    // Shortcuts to DOM Elements.
    this.notesContainer = document.getElementById("notes-container");
    this.noteMessageInput = document.getElementById("message");
    this.addNoteButton = document.getElementById("save");
    this.notesSectionTitle = document.getElementById("notes-section-title"); // Saves notes on button click.

    this.addNoteButton.addEventListener("click", function () {
      return _this.saveNote();
    }); // Toggle for the button.

    this.noteMessageInput.addEventListener("keyup", function () {
      return _this.toggleButton();
    }); // Loads all the notes. use speard syntax to avoid looping through the functions too

    for (var key in _objectSpread({}, localStorage)) {
      this.displayNote(key, localStorage[key]);
    } // Listen for updates to notes from other windows.


    window.addEventListener("storage", function (e) {
      return _this.displayNote(e.key, e.newValue);
    });
  } // Saves a new sticky note on localStorage.


  _createClass(StickyNotesApp, [{
    key: "saveNote",
    value: function saveNote() {
      if (this.noteMessageInput.value) {
        var key = Date.now().toString();
        localStorage.setItem(key, this.noteMessageInput.value);
        this.displayNote(key, this.noteMessageInput.value);
        StickyNotesApp.resetTextfield(this.noteMessageInput);
        this.toggleButton();
      }
    } // Resets the given MaterialTextField.

  }, {
    key: "displayNote",
    // Creates/updates/deletes a note in the UI.
    value: function displayNote(key, message) {
      var note = document.getElementById(key); // If no element with the given key exists we create a new note.

      if (!note) {
        note = document.createElement("sticky-note");
        note.id = key;
        this.notesContainer.insertBefore(note, this.notesSectionTitle.nextSibling);
      } // If the message is null we delete the note.


      if (!message) {
        return note.deleteNote();
      }

      note.setMessage(message);
    } // Enables or disables the submit button depending on the values of the input field.

  }, {
    key: "toggleButton",
    value: function toggleButton() {
      if (this.noteMessageInput.value) {
        this.addNoteButton.removeAttribute("disabled");
      } else {
        this.addNoteButton.setAttribute("disabled", "true");
      }
    }
  }], [{
    key: "resetTextfield",
    value: function resetTextfield(element) {
      element.value = "";
    }
  }]);

  return StickyNotesApp;
}(); // On load start the app.


window.addEventListener("load", function () {
  return new StickyNotesApp();
}); // This is a Sticky Note custom element.

var StickyNote =
/*#__PURE__*/
function (_HTMLElement) {
  _inherits(StickyNote, _HTMLElement);

  function StickyNote() {
    _classCallCheck(this, StickyNote);

    return _possibleConstructorReturn(this, _getPrototypeOf(StickyNote).call(this));
  } // Fires when an instance of the element is created.


  _createClass(StickyNote, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      var _this$classList,
          _this2 = this;

      (_this$classList = this.classList).add.apply(_this$classList, _toConsumableArray(StickyNote.CLASSES));

      this.innerHTML = StickyNote.TEMPLATE;
      this.messageElement = this.querySelector(".message");
      this.dateElement = this.querySelector(".date");
      var date;

      if (this.id) {
        date = new Date(parseInt(this.id));
      } else {
        date = new Date();
      } // Format the date


      var dateFormatterOptions = {
        day: "numeric",
        month: "short"
      };
      var shortDate = new Intl.DateTimeFormat("en-US", dateFormatterOptions).format(date);
      this.dateElement.textContent = "Created on ".concat(shortDate); // originally, the logic for this part is handled in attributeChangeCallback();
      // however, it creates an error, likely due to new spec define attributeChange to be Synchronous

      this.deleteButton = this.querySelector(".btn-small");
      this.deleteButton.addEventListener("click", function () {
        return _this2.deleteNote();
      });
    } // Fires when an attribute of the element is added/deleted/modified.
    // Sets the message of the note.

  }, {
    key: "setMessage",
    value: function setMessage(message) {
      this.messageElement.textContent = message; // Replace all line breaks by <br>.

      this.messageElement.innerHTML = this.messageElement.innerHTML.replace(/\n/g, "<br>");
    } // Deletes the note by removing the element from the DOM and the data from localStorage.

  }, {
    key: "deleteNote",
    value: function deleteNote() {
      localStorage.removeItem(this.id);
      this.parentNode.removeChild(this);
    }
  }]);

  return StickyNote;
}(_wrapNativeSuper(HTMLElement)); // Initial content of the element.


StickyNote.TEMPLATE = "\n    <div class=\"card-body\">\n    <div class=\"message card-title\"></div>\n    <div class=\"date card-subtitle\"></div>\n    <button class=\"btn-small\">\n      Delete\n    </button>\n    </div>\n    "; // StickyNote elements top level style classes.

StickyNote.CLASSES = ["card", "margin", "col"];
customElements.define("sticky-note", StickyNote);

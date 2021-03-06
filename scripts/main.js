// A Sticky Notes app.
class StickyNotesApp {
  // Initializes the Sticky Notes app.
  constructor() {
    // Shortcuts to DOM Elements.
    this.notesContainer = document.getElementById("notes-container");
    this.noteMessageInput = document.getElementById("message");
    this.addNoteButton = document.getElementById("save");
    this.notesSectionTitle = document.getElementById("notes-section-title");

    // Saves notes on button click.
    this.addNoteButton.addEventListener("click", () => this.saveNote());

    // Toggle for the button.
    this.noteMessageInput.addEventListener("keyup", () => this.toggleButton());

    // Loads all the notes. use speard syntax to avoid looping through the functions too
    for (let key in { ...localStorage }) {
      this.displayNote(key, localStorage[key]);
    }
    // Listen for updates to notes from other windows.
    window.addEventListener("storage", e =>
      this.displayNote(e.key, e.newValue)
    );
  }

  // Saves a new sticky note on localStorage.
  saveNote() {
    if (this.noteMessageInput.value) {
      let key = Date.now().toString();
      localStorage.setItem(key, this.noteMessageInput.value);
      this.displayNote(key, this.noteMessageInput.value);
      StickyNotesApp.resetTextfield(this.noteMessageInput);
      this.toggleButton();
    }
  }

  // Resets the given MaterialTextField.
  static resetTextfield(element) {
    element.value = "";
  }

  // Creates/updates/deletes a note in the UI.
  displayNote(key, message) {
    let note = document.getElementById(key);
    // If no element with the given key exists we create a new note.
    if (!note) {
      note = document.createElement("sticky-note");
      note.id = key;
      this.notesContainer.insertBefore(
        note,
        this.notesSectionTitle.nextSibling
      );
    }

    // If the message is null we delete the note.
    if (!message) {
      return note.deleteNote();
    }

    note.setMessage(message);
  }

  // Enables or disables the submit button depending on the values of the input field.
  toggleButton() {
    if (this.noteMessageInput.value) {
      this.addNoteButton.removeAttribute("disabled");
    } else {
      this.addNoteButton.setAttribute("disabled", "true");
    }
  }
}

// On load start the app.
window.addEventListener("load", () => new StickyNotesApp());

// This is a Sticky Note custom element.
class StickyNote extends HTMLElement {
  constructor() {
    super();
  }

  // Fires when an instance of the element is created.
  connectedCallback() {
    this.classList.add(...StickyNote.CLASSES);
    this.innerHTML = StickyNote.TEMPLATE;
    this.messageElement = this.querySelector(".message");
    this.dateElement = this.querySelector(".date");

    let date;
    if (this.id) {
      date = new Date(parseInt(this.id));
    } else {
      date = new Date();
    }

    // Format the date
    let dateFormatterOptions = { day: "numeric", month: "short" };
    let shortDate = new Intl.DateTimeFormat(
      "en-US",
      dateFormatterOptions
    ).format(date);
    this.dateElement.textContent = `Created on ${shortDate}`;
    // originally, the logic for this part is handled in attributeChangeCallback();
    // however, it creates an error, likely due to new spec define attributeChange to be Synchronous
    this.deleteButton = this.querySelector(".btn-small");
    this.deleteButton.addEventListener("click", () => this.deleteNote());
  }

  // Fires when an attribute of the element is added/deleted/modified.

  // Sets the message of the note.
  setMessage(message) {
    this.messageElement.textContent = message;
    // Replace all line breaks by <br>.
    this.messageElement.innerHTML = this.messageElement.innerHTML.replace(
      /\n/g,
      "<br>"
    );
  }

  // Deletes the note by removing the element from the DOM and the data from localStorage.
  deleteNote() {
    localStorage.removeItem(this.id);
    this.parentNode.removeChild(this);
  }
}

// Initial content of the element.
StickyNote.TEMPLATE = `
    <div class="card-body">
    <div class="message card-title"></div>
    <div class="date card-subtitle"></div>
    <button class="btn-small">
      Delete
    </button>
    </div>
    `;

// StickyNote elements top level style classes.
StickyNote.CLASSES = ["card", "margin", "col"];

customElements.define("sticky-note", StickyNote);

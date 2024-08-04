import { Note } from "./Note.js";

document.getElementById(`action`).addEventListener(`click`, function() {
    let newNote = new Note(document.getElementById(`app`),prompt(`Название дела?`));
})

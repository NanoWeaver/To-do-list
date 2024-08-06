import { Note } from "./Note.js";
import { NoteList } from "./NoteList.js";




let newList = new NoteList(document.getElementById(`app`), `my`);



document.getElementById(`action`).addEventListener(`click`, function() {
    newList.add(prompt(`Название дела?`));
    console.log(newList);
})

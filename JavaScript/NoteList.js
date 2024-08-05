import { Note } from "./Note.js";

export class NoteList {
    _notes = [];

    constructor(container) {
        this.container = container;
        this.list = document.createElement(`div`);
        this.list.classList.add(`list-group`);

        this.checkEmpty();
        container.innerHTML = ``;
        container.append(this.list);
    };

    checkEmpty() {
        if (this._notes.length == 0) {
            this.empty = document.createElement(`div`);
            this.empty.classList.add(
                `d-flex`,
                `list-group-item`,
                `justify-content-center`,
                `align-items-center`,
                `text-secondary`,
                `bg-light`,
                `p-5`
            );

            this.empty.textContent = `Список пуст`;
            this.list.append(this.empty);
        } else {
            if (this.empty) {
                this.empty.remove();
            };
        };
    };

    getNewId() {
        let max = 0;
        for (let note of this._notes) {
            if (note.id > max) {
                max = note.id
            };
        };
        return max + 1;
    }

    add(name, done = false) {
        let newNote = new Note(this, name, done);
        newNote.id = this.getNewId();
        this._notes.push(newNote);
        this.checkEmpty();
    };

    remove(value) {
        let id = value;

        if(value instanceof Note) {
            id = value.id;
        };

        for (let i = 0; i < this._notes.length; i++) {
            if (this._notes[i].id == id) {
                this._notes.splice(i,1);
            };
        };

        this.checkEmpty();
    };
};
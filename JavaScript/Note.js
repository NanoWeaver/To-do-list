import { NoteList } from "./NoteList.js";

// Класс заметки в блокноте
export class Note {

    _name = ``; // Приватная переменная Имени заметки
    _done = false; // Приватная переменная статуса заметки
    constructor(container, name = ``,done = false) { // Место куда добавится заметка, её имя, статус (выполнена или нет)
        this.item = document.createElement(`div`); // Тело заметки
        this.buttonGroup = document.createElement(`div`); // Коробка для кнопок
        this.nameSpan = document.createElement(`span`); // Место под имя заметки
        this.doneButton = document.createElement(`button`); // Кнопка изминения статуса 
        this.deleteButton = document.createElement(`button`); // Кнопка удаления заметки

        this.item.classList.add ( // Стили из Bootstrap
            `list-group-item`,
            `d-flex`,
            `justify-content-between`,
            `align-items-center`
        );
        this.buttonGroup.classList.add(`btn-group`, `btn-group-sm`); // Стили из Bootstrap
        this.doneButton.classList.add(`btn`, `btn-success`); // Стили из Bootstrap
        this.doneButton.textContent = `Готово`; // Имя для кнопки изминения статуса
        this.deleteButton.classList.add(`btn`, `btn-danger`); // Стили из Bootstrap
        this.deleteButton.textContent = `Удалить`; // Имя для кнопки удаления заметки

        this.doneButton.addEventListener(`click`,() => { // Метод для переключения done
            this.done = !this.done;
        });

        this.deleteButton.addEventListener(`click`,() => { // Метод для удаления заметки
            if(confirm(`Вы уверены?`)){
                this.delete();
            }
        });

        this.name = name; // Имя заметки
        this.done = done; // Статус заметки
        this.container = container; // Контейнер заметки

        // Добавляем элементы в их контейнер
        this.buttonGroup.append(this.doneButton); 
        this.buttonGroup.append(this.deleteButton);
        this.item.append(this.nameSpan);
        this.item.append(this.buttonGroup);

        if(container instanceof NoteList) { // Проверяем является ли контейнер экземпляром NoteList, если это так , 
            container.list.append(this.item); // то добовляем заметку в тело экземпляра
        } else {
        container.append(this.item);
        };
    };

    set name(value) { // Сеттер для изминения имени заметки
        this._name = value;
        this.nameSpan.textContent = value;
    };

    get name() { // Геттер для получения имени заметки
        return this._name;
    };

    set done(value) { // Сеттер для изминения статуса
        this._done = value;

        if(value) { // Меняем стили для визуализации статуса
            this.item.classList.add(`list-group-item-success`);
        } else {
            this.item.classList.remove(`list-group-item-success`);
        };

        if(this.container instanceof NoteList) {
            this.container.save(); // Сохраняем изминения с помощью метода от NoteList.
        }
    };

    get done() { // Геттер для получения статуса
        return this._done;
    };

    delete() { // Метод удаления свойства
        this.item.remove();

        if(this.container instanceof NoteList) {
            this.container.remove(this) // Вызываем метод NoteList для очистки id и сохранения нового списка заметок
        };
        

        console.log(this.container);
    }

};

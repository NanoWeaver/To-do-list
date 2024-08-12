import { Note } from "./Note.js";

// Класс самого блокнота 
export class NoteList {
    _notes = []; // Массив заметок в этом блокноте 
    _key = null; // Имя блокнота
    _def = []; // Список по умолчанию, при создании блокнота    
    constructor(container, key = null, def = []) { // Место куда добавится блокнот, его айди, заметки по умолчанию
        this.container = container; // Место размещения блокнота
        this.list = document.createElement(`div`); // Тело блокнота 
        this.list.classList.add(`list-group`); // Стили из Bootstrap

        this._key = key; // Айди
        this._def = def; // Список по умолчанию

        this.update();
        
        container.innerHTML = ``; // Очистка контейнера
        container.append(this.list); // Добавляем наш блокнот на страницу
    };

    checkEmpty() { // Метод проверки пуст ли блокнот на основе массива заметок
        if (this._notes.length == 0) { // Если блокнот пуст 
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
            // Создаем блок с текстом и добавляем его в наш лист
            this.empty.textContent = `Список пуст`;
            this.list.append(this.empty);
        } else { // Если блок не пуст - удаляем блок с надписью
            if (this.empty) {
                this.empty.remove();
            };
        };
    };

    getNewId() { // Метод генерации айди
        let max = 0; // Создаем локальную переменную
        for (let note of this._notes) { // Перебираем все заметки в данном блокноте
            if (note.id > max) {  // Сравниваем их айди для поиска наибольшего числа
                max = note.id
            };
        };
        return max + 1; // Возвращаем новый айди
    }

    add(name, done = false) { // Меотод дабавления новых заметок
        let newNote = new Note(this, name, done); // Создаем экземпляр заметки
        newNote.id = this.getNewId(); // Присваиваем заметке уникальный айди
        this._notes.push(newNote); // Добавляем эту заметку в массив 
        this.checkEmpty(); // Вызываем метод проверки пуст ли блокнот, для удаления this.empty
        this.save(); // Сохраняем список в локали
        return id; // Возвращаем айди
    };

    remove(value) {  // Метод для удаления заметки
        let id = value; // Передаем объект заметки

        if(value instanceof Note) { // Проверка является ли объект экземпляром Note
            id = value.id; // Получаем айди этой заметки
        };

        for (let i = 0; i < this._notes.length; i++) { // Перебираем все заметки из массива
            if (this._notes[i].id == id) { // Находим позицию нашего объекта
                this._notes.splice(i,1); // Удаляем заметку из массива
            };
        };

        
        this.save(); // Сохраняем новый список
        this.checkEmpty(); // Проверяем пуст ли блокнот на основе массива заметок
        
    };

    save() { // Метод сохранения заметок в рамках этого блокнота в локали
        if(this._key) { // Если у нашего блокнота есть имя
            let saveList = []; // Создаем локальную переменную для хранения массива объектов, каждый объект = каждая заметка в этом блокноте

            for (const note of this._notes) { // Перебераем все заметки в этом блокноте
                saveList.push({ // Добовляем объект в массив
                    id : note.id ,
                    name : note.name ,
                    done : note.done 
                });
    
                localStorage.setItem(this._key, JSON.stringify(saveList)) // Сохранаяем в локали наш массив на основе имени блокнота
            };
        };
    };

    update() { // Обновление заметок
        let startList = this._def; // Создаем локальную переменную и передаем туда массив с объектами-заметками по умолчанию

        this._notes = []; // Очищаем массив с заметками
        this.list.innerHTML = ``; // Очищаем поле

        if(this._key) { // Если у блокнота есть имя 
            let dataLS = localStorage.getItem(this._key); // Получаем сохранение в локали
            if(dataLS !== `` && dataLS !== null) { // Проверяем сохранение, чтоб убедиться в наличии заметок
                startList = JSON.parse(dataLS); // Добавляем заметки из сохранения
            }
        }

        if(startList.length > 0) { // Проверка на наличие заметок по умолчанию, мы их можем передать при создании объекта
            for (const obj of startList) { // Перебираем заметки по умолчанию
                let newNote = new Note(this, obj.name, obj.done); // Создаём экземпляр заметки
                if (obj.id) { // Проверяем наличие айди заметки
                    newNote.id = obj.id; // Присваиваем этот айди экземпляру
                } else {
                    newNote.id = this.getNewId(); // Генерируем новый айди и присваиваем его
                };
                this._notes.push(newNote); // Добавляем заметку в массив
            };
        };

        this.checkEmpty(); // Очистка контейнера
    };
};
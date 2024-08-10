import { ToDo } from "./ToDo.js";

let app = new ToDo(document.getElementById(`app`));
app.addUser(`Мои дела`, `my`);
app.addUser(`Дела Насти`, `lena`);
app.addUser(`Список покупок`, `shop`);



document.getElementById(`action`).addEventListener(`click`, function() {
    app.addUser(prompt(`Название вкладки`,``),1);
    console.log(app._users);
})

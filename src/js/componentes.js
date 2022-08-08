

//ingresar nuevo todo
import { Todo } from "../classes";
import { TodoList } from "../classes";

//referencias
const txtInput = document.querySelector('.new-todo');
const divTodoList = document.querySelector('.todo-list')
const btnBorrarTodo = document.querySelector('.clear-completed');
const ulFiltros = document.querySelector('.filters');
const aFiltros = document.querySelectorAll('.filtro')
export const crearTodoHtml = (todo) => {
    const htmlTodo = `
    <li class="${(todo.compoletado) ? 'completed' : ''}" data-id="${todo.id}">
    <div class="view">
        <input class="toggle" type="checkbox" ${(todo.compoletado) ? 'checked' : ''}>
        <label>${todo.tarea}</label>
        <button class="destroy"></button>
    </div>
    <input class="edit" value="Create a TodoMVC template">
</li> `
    const div = document.createElement('div');
    div.innerHTML = htmlTodo;
    divTodoList.append(div.firstElementChild);
    return div.firstElementChild
}
//creamos un listener para el campo Input
txtInput.addEventListener('keyup', (event) => {
    // validamos que se precione ENTER y que el campo input no este vacio
    if (event.key === 'Enter' && txtInput.value.length > 0) {
        //guardamos contenido de input en variable "nuevoTodo"
        const nuevoTodo = new Todo(txtInput.value)
        //creamos nueva tarea
        todoList.nuevoTodo(nuevoTodo);
        //agregamos nueva tarea en HTML
        crearTodoHtml(nuevoTodo);
        //boramos contenido despues de ejecucion
        txtInput.value = "";
    }
});

divTodoList.addEventListener('click', (event) => {

    //guardamos elemento selecionado en constante 
    const nombreElemento = event.target.localName // input, label ,button
    const todoElemento = event.target.parentElement.parentElement;
    // get element ID
    const todoId = todoElemento.getAttribute('data-id')
    //selecionamos elemento selecionado y ejecutamos la condicioin
    if (nombreElemento.includes('input')) { // click en el check
        todoList.marcarCompletado(todoId);
        // toggle class completed al elemento TODO
        todoElemento.classList.toggle('completed')
    } else if (nombreElemento.includes('button')) {
        todoList.eliminarTodo(todoId)
        divTodoList.removeChild(todoElemento);
    }
});

btnBorrarTodo.addEventListener('click', () => {

    todoList.eleminarCompletados();
    for (let i = divTodoList.children.length - 1; i >= 0; i--) {
        // sleecionamos todos elementos todo
        const elemento = divTodoList.children[i];

        if (elemento.classList.contains('completed')) {
            divTodoList.removeChild(elemento)
        }
    }
});

ulFiltros.addEventListener('click', (event) => {

    const filtro = event.target.text;

    if (!filtro) { return; }


    aFiltros.forEach(elem => {
        elem.classList.remove('selected')
    });
    event.target.classList.add('selected');


    for (const elemento of divTodoList.children) {

        elemento.classList.remove('hidden');

        const isDone = elemento.classList.contains('completed');

        switch (filtro) {
            case 'Completados': {
                if (!isDone) {
                    elemento.classList.add('hidden');
                }
                break;
            }
            case 'Pendientes': {
                if (isDone) {
                    elemento.classList.add('hidden');
                }
                break;
            }

        }
    }


})

// if (elemento.classList.contains('completed')) { elemento.classList.toggle('hidden') }
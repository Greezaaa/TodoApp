import { Todo } from "./todo.class";


export class TodoList {


    constructor() {

        this.loadFromLS();
    }

    nuevoTodo(todo) {
        this.todos.push(todo);
        this.saveOnLS();
    }

    eliminarTodo(id) {
        this.todos = this.todos.filter(todo => todo.id != id)
        this.saveOnLS();

    }

    marcarCompletado(id) {
        // convertimos string en numero
        for (const todo of this.todos) {
            if (todo.id == id) {
                todo.completado = !todo.completado;
                this.saveOnLS();
                break;
            }
        }

    }

    eleminarCompletados() {

        this.todos = this.todos.filter(todo => !todo.completado);
        this.saveOnLS();
    }

    saveOnLS() {
        localStorage.setItem('todo', JSON.stringify(this.todos))
    }

    loadFromLS() {
        this.todos = (localStorage.getItem('todo'))
            ? JSON.parse(localStorage.getItem('todo'))
            : [];

        this.todos = this.todos.map(Todo.fromJson)
    }
}
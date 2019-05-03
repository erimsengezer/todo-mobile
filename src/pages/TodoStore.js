import { types, destroy } from 'mobx-state-tree'

const Todo = types.model('Todo', {
    title: types.string,
    detail: types.string,
    read: false
})

const TodoStore = types.model('Todos', {
    todos: types.array(Todo)
})
.actions(self => ({
    addTodo(todo) {
            self.todos.push(todo)
    },
    removeTodo(todo){
        destroy(todo)
    },
    toggleRead() {
        self.read = !self.read
    }
}))
.create({
    todos: [{
        title: 'Yapılacak iş',
        detail: "Açıklama alanı olacak",
        read: true
    }]
})

export default TodoStore
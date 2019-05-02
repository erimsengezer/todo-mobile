import { types } from 'mobx-state-tree'

const Todo = types.model('Todo', {
    title: types.string,
    read: false
})

const TodoStore = types.model('Todos', {
    todos: types.array(Todo)
})
.actions(self => ({
    addTodo(todo) {
            self.todos.push(todo)
    }
}))
.create({
    todos: [{
        title: 'Yapılacak iş',
        read: true
    }]
})

export default TodoStore